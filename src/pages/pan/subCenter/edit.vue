<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus";
import { ref } from "vue";
import ScrapeIndex from "../../../components/scrape/index.vue";

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
  password: string;
  account: string;
}
const ruleForm = reactive<RuleForm>({
  cloudId: null,
  password: null,
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
defineExpose({
  open,
});
</script>

<template>
  <PopUp :is-show="isShow" :title="popupTitle" @close="close">
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
      <ElFormItem label="平台账号" prop="account">
        <ElInput v-model="ruleForm.account" />
      </ElFormItem>
      <ElFormItem label="平台密码" prop="password">
        <ElInput v-model="ruleForm.password" type="password" />
      </ElFormItem>
      <button className="btn btn-sm" @click="scrape">
        抽屉
      </button>
    </ElForm>
    <template #footer>
      <div class="space-x-4">
        <button className="btn btn-sm" @click="close">
          取消
        </button>
        <button className="btn btn-success btn-sm">
          确定
        </button>
      </div>
    </template>
  </PopUp>
  <ScrapeIndex :is-show="visible" :on-close="close" />
</template>

<style scoped>

</style>
