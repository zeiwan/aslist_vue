<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useRequest } from "alova/client";
import { addFile } from "~/api";

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
});

interface RuleForm {
  name: string | null;
  path: string;
  type: number;
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
}

defineExpose({
  open,
});

const { loading, send } = useRequest(() => addFile(ruleForm), { immediate: false });

// 提交
function submitForm() {
  ruleFormRef.value?.validate((valid) => {
    if (valid) {
      send().then(() => {
        emits("comp", true);
        close(); // 提交成功后关闭弹窗
      }).catch(() => {
        // 处理错误情况
      });
    } else {
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
