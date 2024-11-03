<script lang="ts" setup>
// 新建

import { useRequest } from "alova/client";
import { reactive } from "vue";
import Edit from "~/pages/pan/subHub/edit.vue";
import { deleteTask, getTaskLists } from "~/api/hub";
import { usePaging } from "~/hooks/usePaging";
// 引用组件函数
const editRef = shallowRef<InstanceType<typeof Edit>>();
const isLoading = ref(false);
const isMobile = ref(false);
// 新建任务
function add() {
  editRef.value?.open("add");
}
const { send: getSend, data: lists } = useRequest(() => getTaskLists());
const { send: deleteSend } = useRequest(deleteTask, { immediate: false });
const cloudList = reactive([
  { value: 1, label: "天翼云盘" },
  { value: 2, label: "夸克云盘" },
  { value: 3, label: "阿里云盘" },
  { value: 4, label: "移动云盘" },
]);
// 批量删除
function batchDel() {

}
// 编辑
function handleEdit(id: number) {
  editRef.value?.open("edit");
  editRef.value?.getDetails(id);
}
// 单删
function handleDelete(id: number) {
  deleteSend({ id });
  getSend();
}
function success() {
  getSend();
}
const selectData = ref<any[]>([]);
function handleSelectionChange(val: any[]) {
  selectData.value = val.map(({ id }) => id);
}
const queryParams = reactive({
  cloudId: 0,
  taskName: "",
});

const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: getSend,
  params: queryParams,
});
onActivated(() => {
  getLists();
});
const formRef = ref<FormInstance>();
getLists();
</script>

<template>
  <ElCard class="!border-none" shadow="never">
    <ElForm ref="formRef" :inline="true" :model="queryParams" class="mb-[-16px]">
      <ElFormItem label="用户信息">
        <ElInput
          v-model="queryParams.taskName"
          class="w-[280px]"
          clearable
          placeholder="账号/昵称/手机号码"
          @keyup.enter="resetPage"
        />
      </ElFormItem>
      <!--     -->
      <ElFormItem label="注册来源">
        <ElSelect v-model="queryParams.cloudId" clearable placeholder="云盘类型">
          <ElOption v-for="item in cloudList" :key="item.value" :disabled="item.value > 1" :label="item.label" :value="item.value" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="resetPage">
          查询
        </ElButton>
        <ElButton @click="resetParams">
          重置
        </ElButton>
        <ExportData
          :fetch-fun="getList"
          :page-size="pager.size"
          :params="queryParams"
          class="ml-2.5"
        />
      </ElFormItem>
    </ElForm>
  </ElCard>
  <div v-loading="pager.loading" class="mt-4">
    <div class="mx-3 flex space-x-4">
      <div class="text-white btn btn-info btn-sm" @click="add">
        新建任务
      </div>
      <div class="text-white btn btn-error btn-sm" @click="batchDel">
        批量删除
      </div>
    </div>
    <div>
      <ElTable
        :data="pager?.lists"
        size="large"
        @selection-change="handleSelectionChange"
      >
        <ElTableColumn type="selection" width="55" />
        <ElTableColumn label="订阅主题" prop="taskName" width="200" />
        <ElTableColumn label="云盘类型" width="100">
          <template #default="scope">
            <ElTag>{{ cloudList[scope.row?.cloudId - 1].label }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="更新记录" prop="size" width="100" />
        <ElTableColumn label="订阅状态" prop="size" width="100" />
        <!--        <ElTableColumn label="刮削状态" prop="size" width="100" /> -->
        <ElTableColumn label="集数" prop="size" width="100" />
        <ElTableColumn label="Cron表达式" prop="cron" width="100" />
        <ElTableColumn label="订阅时间" prop="updateTime" width="180" />
        <ElTableColumn fixed="right" label="操作" min-width="100">
          <template #default="scope">
            <ElButton link size="small" type="primary" @click="handleEdit(scope.row?.id)">
              编辑
            </ElButton>
            <ElButton link size="small" type="danger" @click="handleDelete(scope.row?.id)">
              删除
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
    <div class="mt-4 flex justify-end">
      <Pagination v-model="pager" @change="getLists" />
    </div>
  </div>
  <Edit ref="editRef" @success="success" />
</template>

<style scoped>
.el-card__header {
  --el-card-padding: 7px;
}
</style>
