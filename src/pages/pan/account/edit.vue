<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus";
import { ref } from "vue";
import WebDav from "~/pages/pan/account/modules/WebDav.vue";
import Account from "~/pages/pan/account/modules/Account.vue";

const hidden = ref(false);
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
    label: "WebDav",
  },
  {
    value: 3,
    label: "夸克云盘",
  },
  {
    value: 4,
    label: "移动云盘",
  },
]);

function open(title: string) {
  isShow.value = true;
  mode.value = title;
}
interface RuleForm {
  cloudId: number;
}
const ruleForm = reactive<RuleForm>({
  cloudId: null,
});
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules<RuleForm>>({
  cloudId: [
    { required: true, message: "请选择云盘类型", trigger: "blur" },
  ],
});
function close() {
  isShow.value = false;
}
defineExpose({
  open,
});
</script>

<template>
  <PopUp v-model="isShow" :hidden="hidden" :title="popupTitle" @close="close">
    <ElForm
      ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto"
    >
      <ElFormItem label="云盘类型" prop="cloudId">
        <ElSelect v-model="ruleForm.cloudId" clearable placeholder="云盘类型">
          <ElOption
            v-for="item in cloudList"
            :key="item.value"
            :disabled="item.value > 2"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
      </ElFormItem>
    </ElForm>
    <Account v-if="ruleForm.cloudId === 1" :type="ruleForm.cloudId" />
    <WebDav v-if="ruleForm.cloudId === 2" :type="ruleForm.cloudId" />
  </PopUp>
</template>

<style scoped>

</style>
