<script lang="ts" setup>
import { useRequest } from "alova/client";
import ScrapeIndex from "../../../components/scrape/index.vue";
import { useTask } from "~/pages/pan/subHub/userTask";
import { createDir } from "~/api/subHub";

const {
  visible,
  isShow,
  popupTitle,
  cloudList,
  open,
  ruleForm,
  ruleFormRef,
  rules,
  close,
  parseurl,
  shareDirProps,
  myDirProps,
  renovate,
} = useTask();
const isNewDir = ref(false);
const formData = reactive({
  newDir: "",
  path: "",
});

// 新建文件夹
function newDir() {
  if (ruleForm.saveDirId[ruleForm.saveDirId.length - 1]) {
    formData.path = ruleForm.saveDirId[ruleForm.saveDirId.length - 1];
    isNewDir.value = true;
  } else {
    ElMessage.error("请先选择保存节点");
  }
}

function cNewDir() {
  isNewDir.value = false;
}
const { send } = useRequest(() => createDir(formData), { immediate: false });
function submit() {
  send().then(() => {
    ElMessage.success("创建完成请重新刷新");
    isNewDir.value = false;
  }).catch((err) => {
    ElMessage.error(err);
  });
}
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
      <!--      <ElFormItem label="选择账号" prop="cloudId"> -->
      <!--        <ElSelect v-model="ruleForm.cloudId" clearable placeholder="云盘类型"> -->
      <!--          <ElOption v-for="item in cloudList" :key="item.value" :disabled="item.value > 1" :label="item.label" :value="item.value" /> -->
      <!--        </ElSelect> -->
      <!--      </ElFormItem> -->
      <ElFormItem label="订阅地址" prop="url">
        <ElInput v-model="ruleForm.url" />
      </ElFormItem>
      <ElFormItem label="访问密码" prop="password">
        <div class="w-full flex">
          <ElInput v-model="ruleForm.password" class="w-full" type="password" />
          <button class="ml-2 btn btn-accent btn-sm" @click="parseurl">
            解析链接
          </button>
        </div>
      </ElFormItem>
      <ElFormItem label="订阅目录" prop="shareDirId">
        <ElCascader v-model="ruleForm.shareDirId" :props="shareDirProps" class="w-full" />
      </ElFormItem>
      <ElFormItem label="保存目录" prop="saveDirId">
        <div class="w-full flex">
          <ElCascader v-model="ruleForm.saveDirId" :check-strictly="true" :props="myDirProps" class="w-full" />
          <ElButton class="ml-2" link type="success" @click="newDir">
            新建
          </ElButton>
          <ElButton class="ml-2" link type="primary" @click="renovate">
            刷新
          </ElButton>
        </div>
      </ElFormItem>
      <ElFormItem v-if="isNewDir" class="border border-red-50 py-1 shadow" label="新建文件">
        <div class="w-full flex">
          <ElInput v-model="formData.newDir" />

          <button className="btn btn-sm ml-2" @click="cNewDir">
            取消
          </button>
          <button className="btn btn-sm btn-success ml-2" @click="submit">
            提交
          </button>
        </div>
      </ElFormItem>
      <ElFormItem label="定时任务" prop="cron">
        <div class="w-full flex">
          <ElInput v-model="formData.cron" />
          <a className="btn btn-sm btn-link ml-2" href="https://cron.ciding.cc" target="_blank">
            Cron表达式
          </a>
        </div>
      </ElFormItem>
    </ElForm>
  </PopUp>
  <ScrapeIndex :is-show="visible" :on-close="close" />
</template>

<style scoped>
</style>
