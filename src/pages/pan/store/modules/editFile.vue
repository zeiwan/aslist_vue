<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useRequest } from "alova/client";
import { addFile } from "~/api";

const emits = defineEmits(["close"]);
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

function open(title: string) {
  isShow.value = true;
  mode.value = title;
}

interface RuleForm {
  name: string;
}

const ruleForm = reactive<RuleForm>({
  name: "",
});

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: "请输入目标名称", trigger: "blur" },
  ],
});

// 导出组件函数
defineExpose({
  open,
});

const { data, loading, send, error } = useRequest(() => addFile(ruleForm), { immediate: false });

function submitForm() {
  ruleFormRef.value?.validate((valid) => {
    if (valid) {
      send().then(() => {
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
  <PopUp v-model="isShow" :title="popupTitle" @close="close" @confirm="submitForm">
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
    </ElForm>
  </PopUp>
</template>

<style scoped>
/* 你的样式 */
</style>
