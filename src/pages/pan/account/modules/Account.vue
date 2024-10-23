<script lang="ts" setup>
import { ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

const props = defineProps<{
  type: number;
}>();

interface RuleForm {
  account: string;
  password: string;
  remarks: string;
}

const ruleForm = reactive<RuleForm>({
  account: null,
  password: null,
  remarks: null,
});
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules<RuleForm>>({
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
  ],
});

async function confirm() {
  await ruleFormRef.value?.validate();
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
      <ElFormItem label="账号" prop="account">
        <ElInput v-model="ruleForm.account" placeholder="请输入账号" />
      </ElFormItem>
      <ElFormItem label="密码" prop="password">
        <ElInput v-model="ruleForm.password" placeholder="请输入密码" />
      </ElFormItem>
      <ElFormItem label="备注" prop="remarks">
        <ElInput v-model="ruleForm.remarks" placeholder="请输入备注" />
      </ElFormItem>
    </ElForm>
    <div class="text-end">
      <div class="space-x-4">
        <!--        <button class="btn btn-sm" @click="close"> -->
        <!--          重置 -->
        <!--        </button> -->
        <button class="btn btn-success btn-sm" @click="confirm">
          保存
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
