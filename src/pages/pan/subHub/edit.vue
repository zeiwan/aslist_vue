<script lang="ts" setup>
import type { CascaderProps, FormInstance, FormRules } from "element-plus";
import { ref } from "vue";
import { useRequest } from "alova/client";

import ScrapeIndex from "../../../components/scrape/index.vue";
import { getSubFolderLists } from "~/api/subHub";

const visible = ref(false);
const isShow = ref(false);
const mode = ref("add");
const popupTitle = computed(() => {
  return mode.value === "add" ? "新增云盘账号" : "编辑云盘账号";
});
const cloudList = reactive([
  {
    value: 1,
    label: "天翼云盘",
  },
  {
    value: 2,
    label: "夸克云盘",
  },
  {
    value: 3,
    label: "阿里云盘",
  },
  {
    value: 4,
    label: "移动云盘",
  },
]);

function open(title: string) {
  mode.value = title;
  isShow.value = true;
}
interface RuleForm {
  cloudId: number;
  url: string;
  account: string;
}
const ruleForm = reactive<RuleForm>({
  cloudId: 1,
  url: "https://cloud.189.cn/web/share?code=NBraYny2emme",
  account: null,
});

const urlData = reactive({
  cloudId: 1,
  url: "https://cloud.189.cn/web/share?code=NBraYny2emme",
  account: null,
});

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules<RuleForm>>({
  cloudId: [
    { required: true, message: "请选择云盘类型", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
  ],
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
  ],
});
// 设置刮削
function scrape() {
  visible.value = true;
}

function close() {
  isShow.value = false;
}

const { send: subHubSend, loading: subHubLoading } = useRequest(() => getSubFolderLists(urlData), { immediate: false });

let id = 0;
const folderLists: CascaderProps = {
  lazy: true,
  lazyLoad(node, resolve) {
    const { level } = node;
    setTimeout(() => {
      const nodes = Array.from({ length: level + 1 }).map(item => ({
        value: ++id,
        label: `Option - ${id}`,
        leaf: level >= 2,
      }));
      // Invoke `resolve` callback to return the child nodes data and indicate the loading is finished.
      resolve(nodes);
    }, 1000);
  },
};
function parseurl() {
  subHubSend();
}

defineExpose({
  open,
});
</script>

<template>
  <PopUp v-model="isShow" :title="popupTitle" @close="close">
    <ElForm
      ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto"
    >
      <ElFormItem label="云盘类型" prop="cloudId">
        <ElSelect v-model="ruleForm.cloudId" clearable placeholder="云盘类型">
          <ElOption
            v-for="item in cloudList"
            :key="item.value"
            :disabled="item.value > 1"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="订阅地址" prop="url">
        <ElInput v-model="ruleForm.url" />
      </ElFormItem>
      <ElFormItem label="访问密码" prop="password">
        <div class="flex">
          <ElInput v-model="ruleForm.password" class="w-10" type="password" />
          <div class="ml-2 w-full">
            <button className="btn btn-sm btn-accent" @click="parseurl">
              解析链接
            </button>
          </div>
        </div>
      </ElFormItem>
      <ElFormItem label="订阅目录" prop="password">
        <ElCascader :props="folderLists" />
      </ElFormItem>
      <ElFormItem label="保存目录" prop="password">
        a
      </ElFormItem>
    </ElForm>
  </PopUp>
  <ScrapeIndex :is-show="visible" :on-close="close" />
</template>

<style scoped>

</style>
