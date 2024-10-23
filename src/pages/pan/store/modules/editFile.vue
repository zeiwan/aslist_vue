<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useRequest } from "alova/client";
import { addFile, renameFile } from "~/api";

const props = defineProps<{
  name?: string;
}>();

const emits = defineEmits(["close", "comp"]);
const ruleFormRef = ref<FormInstance>();
const mode = ref("add");
const popupTitle = computed(() => {
  return mode.value === "add" ? "新建文件" : "重命名";
});
const isShow = ref(false);

function close() {
  isShow.value = false;
  emits("close");
}

const ruleForm = reactive<RuleForm>({
  name: null,
  path: null, // 初始化 path
  type: 1, // 初始化 type
  orName: null,
});

interface RuleForm {
  name: string | null;
  path: string;
  type: number;
  orName: null;
}

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: "请输入目标名称", trigger: "blur" },
  ],
});

// 重置表单
function resetForm() {
  ruleFormRef.value?.resetFields(); // 重置表单验证状态
}

function open(title: string) {
  isShow.value = true;
  mode.value = title;
  resetForm();
  ruleForm.path = MyPathGet().path;
  ruleForm.type = 1;
  if (props.name) {
    ruleForm.name = props.name[0];
    ruleForm.orName = props.name[0];
  }
}

defineExpose({
  open,
});

const { loading, send: addSend } = useRequest(() => addFile(ruleForm), { immediate: false });
const { renameloading, send: renameSend } = useRequest(() => renameFile(ruleForm), {
  // 当immediate为false时，默认不发出
  immediate: false,
});
// 提交表单函数
async function submitForm() {
  ruleFormRef.value?.validate((valid) => {
    if (valid) {
      const operation = mode.value === "add" ? addSend : renameSend;
      operation()
        .then(() => {
          emits("comp", true);
          close(); // 关闭弹窗
        })
        .catch((error) => {
          console.error("Submit error:", error);
          // 可以在这里显示错误信息给用户
        });
    } else {
      console.warn("Validation failed");
      return false;
    }
  });
}
</script>

<template>
  <PopUp v-model="isShow" :loading="loading" :title="popupTitle" @close="close" @confirm="submitForm">
    <ElForm
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      class="demo-ruleForm"
      label-width="auto"
      status-icon
      style="max-width: 500px"
    >
      <ElFormItem label="文件名称" prop="name">
        <ElInput v-model="ruleForm.name" />
      </ElFormItem>
      <ElFormItem label="当前目录">
        <ElInput v-model="ruleForm.path" disabled />
      </ElFormItem>
    </ElForm>
  </PopUp>
</template>
