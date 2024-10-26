import { computed, reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useRequest } from "alova/client";
import { getShareNodes, getSubFolderLists } from "~/api/subHub";

export function useTask() {
  const visible = ref(false);
  const isShow = ref(false);
  const mode = ref("add");
  const popupTitle = computed(() => {
    return mode.value === "add" ? "新增云盘账号" : "编辑云盘账号";
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
    shareDirId: string; // 添加密码字段
  }

  const ruleForm = reactive<RuleForm>({
    cloudId: 1,
    url: "https://cloud.189.cn/web/share?code=NBraYny2emme",
    account: "",
    shareDirId: "",
  });

  const urlData = reactive({
    cloudId: ruleForm.cloudId,
    url: ruleForm.url,
    account: ruleForm.account,
    shareDirId: ruleForm.shareDirId,
  });

  const ruleFormRef = ref<FormInstance>();
  const rules = reactive<FormRules<RuleForm>>({
    cloudId: [{ required: true, message: "请选择云盘类型", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    account: [{ required: true, message: "请输入账号", trigger: "blur" }],
  });

  // 设置刮削
  function scrape() {
    visible.value = true;
  }

  function close() {
    isShow.value = false;
  }

  const { send: subHubSend } = useRequest(() => getSubFolderLists(urlData), { immediate: false });
  const { send: nodesSend } = useRequest(() => getShareNodes(urlData), { immediate: false });

  const cascaderProps = ref({});
  const selectedOptions = ref([]);

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
      return [{ leaf: 1, label: "当前目录" }];
    }
  }

  // 解析 URL 并加载目录
  async function parseurl() {
    // 更新 urlData
    urlData.cloudId = ruleForm.cloudId;
    urlData.url = ruleForm.url;
    urlData.account = ruleForm.account;
    urlData.shareDirId = ruleForm.shareDirId;

    // 清空 selectedOptions
    selectedOptions.value = [];
    cascaderProps.value = {
      lazy: true,
      lazyLoad: loadOptions,
    };

    // 触发加载
    await loadOptions({ level: 0 }, (nodes) => {
      selectedOptions.value = nodes;
    });
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
    scrape,
    close,
    cascaderProps,
    selectedOptions,
    parseurl,
  };
}
