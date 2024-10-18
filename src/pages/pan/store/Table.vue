<script lang="ts" setup>
import { getSvgIcon } from "~/pages/pan/store/icons";

const props = defineProps<{
  tableData: any;
  isLoading: boolean;
  isMobile: boolean;
}>();
const emit = defineEmits(["sendPath"]);
// 菜单列表
const menus = [{ k: 1, v: "打开" }, { k: 2, v: "重命名" }, { k: 3, v: "删除" }, { k: 4, v: "下载" }, { k: 5, v: "分享" }];

const model = ref({
  clientX: 0,
  clientY: 0,
  menuId: 0,
  isShow: false,
  path: "",
});
// 右击菜单
function cellContextmenu(row: any, column: any, cell: HTMLTableCellElement, event: Event) {
  model.value.clientX = event.clientX;
  model.value.clientY = event.clientY;
  model.value.isShow = true;
  event.preventDefault();
}
// 菜单点击事件
function onMenu() {
  model.value.isShow = false;
}
// 单击
function open(row: any, column: any) {
  // 获取不到列名称直接返回
  if (!column.label) {
    return;
  }
  if (row.isDir) {
    emit("sendPath", row.name);
  }
}
function handleDocumentClick() {
  model.value.isShow = false;
}
onMounted(() => {
  document.addEventListener("click", handleDocumentClick);
  // 清理函数
  onUnmounted(() => {
    document.removeEventListener("click", handleDocumentClick);
  });
});
</script>

<template>
  <ElTable v-loading="props.isLoading" :data="props.tableData" @cell-contextmenu="cellContextmenu" @row-click="open">
    <ElTableColumn type="selection" width="30" />
    <ElTableColumn :width="!props.isMobile ? '' : 220" label="名称">
      <template #default="scope">
        <div class="flex">
          <div class="mr-2" v-html="getSvgIcon(scope.row.isDir ? 'dir' : scope.row.type)" />
          <ElText line-clamp="1">
            {{ scope.row.name }}
          </ElText>
        </div>
      </template>
    </ElTableColumn>
    <ElTableColumn label="大小" property="size" width="100" />
    <ElTableColumn v-if="!props.isMobile" label="日期" property="date" width="200" />
  </ElTable>
  <ul
    :style="{
      display: model.isShow ? 'block' : 'none',
      position: 'absolute',
      top: `${model.clientY}px`,
      left: `${model.clientX}px`,
    }"
    class="dropdown-content z-[1] w-52 bg-base-100 p-2 text-center shadow menu rounded-box"
    tabindex="1"
  >
    <li><a v-for="(item, index) in menus" :key="index" @click="onMenu(item.k)">{{ item.v }}</a></li>
  </ul>
</template>

<style scoped>

</style>
