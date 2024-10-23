<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { useRequest } from "alova/client";
import { useClipboard } from "@vueuse/core";
import { ElMessage } from "element-plus";
import { shareLink } from "~/api";

const props = defineProps<{ name: string }>();
const emits = defineEmits(["close", "comp"]);

const popupTitle = computed(() => "分享链接");
const isShow = ref(false);
const hidden = ref(false);
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: null as string | null,
  path: MyPathGet().path,
  day: 7,
  shareType: 2,
});
const { copy, isSupported } = useClipboard();
const { data, loading, send } = useRequest(() => shareLink(ruleForm), { immediate: false });

function resetForm() {
  ruleFormRef.value?.resetFields();
}

function open() {
  isShow.value = true;
  resetForm();
  ruleForm.name = props.name[0];
  data.value = null;
  hidden.value = false;
}

function close() {
  isShow.value = false;
  emits("close");
}

function submitForm() {
  send();
  hidden.value = true;
}

function copyLink() {
  if (isSupported) {
    copy(data.value.url);
    ElMessage.success("复制完成");
    isShow.value = false;
  } else {
    console.warn("Clipboard is not supported in this browser");
  }
}

defineExpose({ open });
</script>

<template>
  <PopUp v-model="isShow" :hidden="hidden" :loading="loading" :title="popupTitle" @close="close" @confirm="submitForm">
    <ElForm
      ref="ruleFormRef" :model="ruleForm" class="demo-ruleForm" label-width="auto" status-icon
      style="max-width: 500px"
    >
      <div v-if="!data">
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
      </div>
      <div v-else>
        <ElFormItem label="分享链接">
          <div class="w-60% border border-gray-300 rounded">
            <div class="px-2 text-blue-700">
              {{ data.url }}
            </div>
          </div>
          <button class="ml-2 btn btn-primary btn-active btn-sm" @click="copyLink">
            复制链接
          </button>
        </ElFormItem>
      </div>
    </ElForm>
  </PopUp>
</template>

<style scoped>
</style>
