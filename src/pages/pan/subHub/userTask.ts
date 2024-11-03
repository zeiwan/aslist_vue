import { computed, reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useRequest } from "alova/client";
import { getMyDirNodes, getShareNodes, getSubFolderLists } from "~/api/hub";

export function useTask() {
  const visible = ref(false);
  const isShow = ref(false);
  const mode = ref("add");
  const popupTitle = computed(() => {
    return mode.value === "add" ? "新增任务" : "编辑任务";
  });
  const cloudList = reactive([
    { value: 1, label: "天翼云盘" },
    { value: 2, label: "夸克云盘" },
    { value: 3, label: "阿里云盘" },
    { value: 4, label: "移动云盘" },
  ]);

  function open(title: string) {
    mode.value = title;
    isShow.value = true;
  }

  interface RuleForm {
    cloudId: number;
    url: string;
    account: string;
    shareDirId: string[]; // 修改为数组
    saveDirId: string[]; // 修改为数组
    cron: string;
  }

  const ruleForm = reactive<RuleForm>({
    cloudId: 1,
    url: "https://cloud.189.cn/t/NBraYny2emme",
    account: "",
    shareDirId: [], // 初始化为数组
    saveDirId: [], // 初始化为数组
    cron: "",
  });

  const urlData = reactive({
    cloudId: "",
    url: "",
    account: "",
    shareDirId: "",
  });
  const myData = reactive({
    cloudId: ruleForm.cloudId,
    myDirId: "",
  });

  const ruleFormRef = ref<FormInstance>();
  const rules = reactive<FormRules<RuleForm>>({
    cloudId: [{ required: true, message: "请选择云盘类型", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    account: [{ required: true, message: "请输入账号", trigger: "blur" }],
    shareDirId: [{ required: true, message: "请选择订阅目录", trigger: "blur" }],
    saveDirId: [{ required: true, message: "请选择保存目录", trigger: "blur" }],
    cron: [{ required: true, message: "请输入表达式", trigger: "blur" }],
    url: [{ required: true, message: "请输入链接", trigger: "blur" }],
  });

  function close() {
    isShow.value = false;
  }

  const { send: subHubSend } = useRequest(() => getSubFolderLists(urlData), { immediate: false });
  const { send: nodesSend } = useRequest(() => getShareNodes(urlData), { immediate: false });
  const { send: myDirSend } = useRequest(() => getMyDirNodes(myData), { immediate: false });

  const shareDirProps = ref({});
  const myDirProps = ref({});

  // 动态加载目录
  async function loadOptions(node, resolve) {
    const { level } = node;
    try {
      if (level === 0) {
        const response = await subHubSend();
        const children = mapResponseToChildren(response);
        resolve(children);
      } else {
        urlData.shareDirId = node.pathValues[node.pathValues.length - 1];
        const response = await nodesSend();
        const children = mapResponseToChildren(response);
        resolve(children);
      }
    } catch (error) {
      console.error("Error fetching sub folder lists:", error);
      resolve([]);
    }
  }

  // 将 API 响应映射到 Cascader 选项
  function mapResponseToChildren(response) {
    if (Array.isArray(response)) {
      return response.map(item => ({
        value: item.id,
        label: item.name,
        leaf: item.isLeaf,
      }));
    } else {
      console.warn("Invalid response format for mapResponseToChildren:", response);
      return [];
    }
  }

  // 解析 URL 并加载目录
  async function parseurl() {
    // 更新 urlData
    urlData.cloudId = ruleForm.cloudId;
    urlData.url = ruleForm.url;
    urlData.account = ruleForm.account;
    urlData.shareDirId = ruleForm.shareDirId;

    shareDirProps.value = {
      lazy: true,
      lazyLoad: loadOptions,
      checkStrictly: true,
    };

    // 触发加载
    await loadOptions({ level: 0 }, (nodes) => {
      // 这里不需要额外处理，因为 Cascader 会自动处理
    });
  }

  // 加载我的目录
  async function loadMyDir(node, resolve) {
    const { level } = node;

    if (level === 0) {
      myData.myDirId = "";
    } else {
      myData.myDirId = node.pathValues[node.pathValues.length - 1];
    }
    try {
      const response = await myDirSend();
      const children = mapResponseToChildren(response);
      resolve(children);
    } catch (error) {
      console.error("Error fetching my directory lists:", error);
      resolve([]);
    }
  }

  async function getMyDirList() {
    myDirProps.value = {
      lazy: true,
      lazyLoad: loadMyDir,
      checkStrictly: true,
    };

    await loadMyDir({ level: 0 }, (nodes) => {
      // 这里不需要额外处理，因为 Cascader 会自动处理
    });
  }

  // 刷新
  function renovate() {
    getMyDirList();
  }
  return {
    visible,
    isShow,
    mode,
    popupTitle,
    cloudList,
    open,
    ruleForm,
    urlData,
    ruleFormRef,
    rules,
    close,
    shareDirProps,
    parseurl,

    renovate,
    myDirProps,
  };
}
