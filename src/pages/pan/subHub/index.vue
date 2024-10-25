<script lang="ts" setup>
// 新建

import Edit from "~/pages/pan/subHub/edit.vue";
// 引用组件函数
const editRef = shallowRef<InstanceType<typeof Edit>>();
const isLoading = ref(false);
const isMobile = ref(false);
const tableData = ref([]);
// 新建任务
function add() {
  editRef.value?.open("add");
}
// 批量删除
function batchDel() {

}
</script>

<template>
  <ElCard>
    <div class="flex pb space-x-4">
      <div class="text-white btn btn-info btn-sm" @click="add">
        新建任务
      </div>
      <div class="text-white btn btn-error btn-sm" @click="batchDel">
        批量删除
      </div>
    </div>
    <ElCard class="el-card__header" shadow="never">
      <ElTable v-loading="isLoading" :data="tableData" height="750">
        <ElTableColumn type="selection" width="30" />
        <ElTableColumn label="订阅主题" width="200" />
        <ElTableColumn label="云盘类型" width="100" />
        <ElTableColumn label="更新记录" property="size" width="200" />
        <ElTableColumn label="订阅状态" property="size" width="100" />
        <ElTableColumn label="刮削状态" property="size" width="100" />
        <ElTableColumn label="集数" property="size" width="100" />
        <ElTableColumn label="Cron时间" property="size" width="200" />
        <ElTableColumn label="订阅时间" property="size" />
      </ElTable>
    </ElCard>
  </ElCard>
  <Edit ref="editRef" />
</template>

<style scoped>
.el-card__header {
  --el-card-padding: 7px;
}
</style>
