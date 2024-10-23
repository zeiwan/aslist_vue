<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useRequest } from "alova/client";
import { cloudLogin } from "~/api/cloud";

const props = defineProps<{
  type: number;
}>();

interface RuleForm {
  url: string;
  port: number;
  https: boolean;
  account: string;
  password: string;
  remarks: string;
  path: string;
}

const ruleForm = reactive<RuleForm>({
  url: null,
  port: null,
  https: false,
  account: null,
  password: null,
  remarks: null,
  type: props.type,
  path: null,
});
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules<RuleForm>>({
  url: [
    { required: true, message: "请输入URL", trigger: "blur" },
  ],
  port: [
    { required: true, message: "请输入端口号", trigger: "blur", type: "number" },
  ],
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
  ],
});

const { send, loading } = useRequest(() => cloudLogin(ruleForm), { immediate: false });

async function confirm() {
  await ruleFormRef.value?.validate();
  await send();
}
</script>

<template>
  <div class="ml-5">
    <ElForm
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
    >
      <ElFormItem label="HTTPS" prop="https">
        <ElSwitch v-model="ruleForm.https" />
      </ElFormItem>
      <ElFormItem label="URL" prop="url">
        <ElInput v-model="ruleForm.url" placeholder="10.0.0.1" />
      </ElFormItem>
      <ElFormItem label="路径" prop="path">
        <ElInput v-model.number="ruleForm.path" placeholder="dav" />
      </ElFormItem>
      <ElFormItem label="端口" prop="port">
        <ElInput v-model.number="ruleForm.port" placeholder="5244" />
      </ElFormItem>
      <ElFormItem label="账号" prop="account">
        <ElInput v-model="ruleForm.account" placeholder="" />
      </ElFormItem>
      <ElFormItem label="密码" prop="password">
        <ElInput v-model="ruleForm.password" placeholder="" />
      </ElFormItem>
      <ElFormItem label="备注" prop="remarks">
        <ElInput v-model="ruleForm.remarks" placeholder="" />
      </ElFormItem>
    </ElForm>
    <div class="text-end">
      <div class="space-x-4">
        <button class="btn btn-sm" @click="close">
          取消
        </button>
        <button :loading="loading" class="btn btn-success btn-sm" @click="confirm">
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 样式可以根据实际需要进行调整 */
</style>
