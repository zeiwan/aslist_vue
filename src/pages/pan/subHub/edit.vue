<script lang="ts" setup>
import { useRequest } from "alova/client";
import { isValidCron } from "cron-validator";
import { defineExpose, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import ScrapeIndex from "../../../components/scrape/index.vue";
import { useTask } from "~/pages/pan/subHub/userTask";
import { addTask, createDir, editTask, getDetail } from "~/api/hub";

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
  shareNodesProps,
  myNodesProps,
  renovate,
  mode,
} = useTask();

const isFolder = ref(false);
const formData = reactive({
  folderName: "",
  pid: "",
  cloudId: ruleForm.cloudId,
});

// 新建文件夹
function handleNewFolder() {
  if (ruleForm.myFolderIds && ruleForm.myFolderIds.length > 0) {
    formData.pid = ruleForm.myFolderIds[ruleForm.myFolderIds.length - 1];
    isFolder.value = true;
  } else {
    ElMessage.error("请先选择保存节点");
  }
}

function cancelNewFolder() {
  isFolder.value = false;
}

const { send: createDirSend } = useRequest(createDir, { immediate: false });
function handleSubmit() {
  createDirSend(formData).then(() => {
    ElMessage.success("创建完成，请重新刷新");
    cancelNewFolder();
  }).catch((err) => {
    ElMessage.error(err);
  });
}

const { send: addTaskSend } = useRequest(addTask, { immediate: false });
const { send: editTaskSend } = useRequest(editTask, { immediate: false });
const { send: detailTaskSend } = useRequest(getDetail, { immediate: false });
async function handleConfirm() {
  if (!isValidCron(ruleForm.cron)) {
    ElMessage.error("cron 表达式有误");
    return;
  }
  ruleForm.myFolderId = ruleForm.myFolderIds[ruleForm.myFolderIds.length - 1];
  ruleForm.shareFolderId = ruleForm.shareFolderIds[ruleForm.shareFolderIds.length - 1];
  await ruleFormRef.value?.validate();
  mode.value = "edit" ? await editTaskSend(ruleForm) : await addTaskSend(ruleForm);
  close();
}

// 获取详情
async function getDetails(id: number) {
  const data = await detailTaskSend({ id });
  setFormData(data);
  renovate();
  await parseurl();
}

function setFormData(data: Record<any, any>) {
  for (const key in ruleForm) {
    if (data[key] != null && data[key] !== undefined) {
      ruleForm[key] = data[key];
    }
  }
}
defineExpose({
  open,
  getDetails,
});
</script>

<template>
  <PopUp v-model="isShow" :title="popupTitle" @close="close" @confirm="handleConfirm">
    <ElForm ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto">
      <ElFormItem label="云盘类型" prop="cloudId">
        <ElSelect v-model="ruleForm.cloudId" clearable placeholder="云盘类型">
          <ElOption v-for="item in cloudList" :key="item.value" :disabled="item.value > 1" :label="item.label" :value="item.value" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="订阅地址" prop="url">
        <ElInput v-model="ruleForm.url" />
      </ElFormItem>
      <ElFormItem label="访问密码" prop="pwd">
        <div class="w-full flex">
          <ElInput v-model="ruleForm.pwd" class="w-full" placeholder="xxxx" />
          <button class="ml-2 btn btn-accent btn-sm" @click="parseurl">
            解析链接
          </button>
        </div>
      </ElFormItem>
      <ElFormItem label="任务名称" prop="taskName">
        <ElInput v-model="ruleForm.taskName" placeholder="学习资料" />
      </ElFormItem>
      <ElFormItem label="订阅目录" prop="shareFolderIds">
        <ElCascader v-model="ruleForm.shareFolderIds" :props="shareNodesProps" class="w-full" placeholder="选择订阅目录" />
      </ElFormItem>
      <ElFormItem label="保存目录" prop="myFolderIds">
        <div class="w-full flex">
          <ElCascader v-model="ruleForm.myFolderIds" :check-strictly="true" :props="myNodesProps" class="w-full" placeholder="选择保存目录" />
          <ElButton class="ml-2" link type="success" @click="handleNewFolder">
            新建
          </ElButton>
          <ElButton class="ml-2" link type="primary" @click="renovate">
            刷新
          </ElButton>
        </div>
      </ElFormItem>

      <ElFormItem v-if="isFolder" class="border border-red-50 py-1 shadow" label="新建文件">
        <div class="w-full flex">
          <ElInput v-model="formData.folderName" />

          <button className="btn btn-sm ml-2" @click="cancelNewFolder">
            取消
          </button>
          <button className="btn btn-sm btn-success ml-2" @click="handleSubmit">
            提交
          </button>
        </div>
      </ElFormItem>
      <ElFormItem label="定时任务" prop="cron">
        <div class="w-full flex">
          <ElInput v-model="ruleForm.cron" placeholder="* * * * *" />
          <a className="btn btn-sm btn-link ml-2" href="https://cron.ciding.cc" target="_blank">
            Cron表达式
          </a>
        </div>
      </ElFormItem>
      <!--      <ElFormItem label="影视类型" prop="filmType" /> -->
    </ElForm>
  </PopUp>
  <ScrapeIndex :is-show="visible" :on-close="close" />
</template>

<style scoped>
/* 你可以在这里添加样式 */
</style>

<style scoped>
</style>
