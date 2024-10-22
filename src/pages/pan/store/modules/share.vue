<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { useRequest } from "alova/client";
import { shareLink } from "~/api";

const props = defineProps<{
  name: string;
}>();
const emits = defineEmits(["close", "comp"]);
const popupTitle = computed(() => {
  return "分享链接";
});
const isShow = ref(false);

const ruleFormRef = ref<FormInstance>();

// 重置表单
function resetForm() {
  ruleFormRef.value?.resetFields(); // 重置表单验证状态
}

interface RuleForm {
  name: string | null;
  path: string;
  day: number;
  shareType: number;
}

const ruleForm = reactive<RuleForm>({
  name: null,
  path: MyPathGet().path, // 初始化 path
  day: 7,
  shareType: 2,
});

const { loading, send } = useRequest(() => shareLink(ruleForm), { immediate: false });

function open() {
  isShow.value = true;
  resetForm();
  ruleForm.name = props.name[0];
}

function close() {
  isShow.value = false;
  emits("close");
}

function submitForm() {
  send();
}

defineExpose({
  open,
});
</script>

<template>
  <PopUp v-model="isShow" :loading="loading" :title="popupTitle" @close="close" @confirm="submitForm">
    <ElForm
      ref="ruleFormRef"
      :model="ruleForm"

      class="demo-ruleForm"
      label-width="auto"
      status-icon
      style="max-width: 500px"
    >
      <ElFormItem label="分享名称" prop="name">
        <ElInput v-model="ruleForm.name" disabled />
      </ElFormItem>
      <ElFormItem label="有效期">
        <ElRadioGroup v-model="ruleForm.day">
          <ElRadio :value="1">
            1天
          </ElRadio>
          <ElRadio :value="7">
            7天
          </ElRadio>
          <ElRadio :value="0">
            永久
          </ElRadio>
        </ElRadioGroup>
      </ElFormItem>

      <ElFormItem label="分享形式">
        <ElRadioGroup v-model="ruleForm.shareType">
          <ElRadio :value="1">
            公开
          </ElRadio>
          <ElRadio :value="2">
            私密(只有输入访问码才能查看，否则无法访问)
          </ElRadio>
        </ElRadioGroup>
      </ElFormItem>
    </ElForm>
  </PopUp>
</template>

<style scoped>

</style>
