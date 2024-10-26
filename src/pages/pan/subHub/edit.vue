<script lang="ts" setup>
import ScrapeIndex from "../../../components/scrape/index.vue";
import { useTask } from "~/pages/pan/subHub/userTask";

const {
  visible,
  isShow,
  mode,
  popupTitle,
  cloudList,
  open,
  ruleForm,
  ruleFormRef,
  rules,
  scrape,
  close,
  cascaderProps,
  selectedOptions,
  parseurl,
} = useTask();

defineExpose({
  open,
});
</script>

<template>
  <PopUp v-model="isShow" :title="popupTitle" @close="close">
    <ElForm ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto">
      <ElFormItem label="云盘类型" prop="cloudId">
        <ElSelect v-model="ruleForm.cloudId" clearable placeholder="云盘类型">
          <ElOption v-for="item in cloudList" :key="item.value" :disabled="item.value > 1" :label="item.label" :value="item.value" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="订阅地址" prop="url">
        <ElInput v-model="ruleForm.url" />
      </ElFormItem>
      <ElFormItem label="访问密码" prop="password">
        <div class="flex">
          <ElInput v-model="ruleForm.password" class="w-10" type="password" />
          <div class="ml-2 w-full">
            <button class="btn btn-accent btn-sm" @click="parseurl">
              解析链接
            </button>
          </div>
        </div>
      </ElFormItem>
      <ElFormItem label="订阅目录" prop="shareDirId">
        <ElCascader v-model="ruleForm.shareDirId" :props="cascaderProps" class="w-full" />
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
