<script lang="ts" setup>
import { useRequest } from "alova/client";
import { shallowRef } from "vue";
import { getSvgIcon } from "~/pages/pan/store/icons";
import { deleteFile } from "~/api";
import Share from "~/pages/pan/store/modules/share.vue";
import EditFile from "~/pages/pan/store/modules/editFile.vue";

const props = defineProps<{
  tableData: any;
  isLoading: boolean;
  isMobile: boolean;
}>();

const emit = defineEmits(["sendPath", "comp"]);

const editRef = shallowRef<InstanceType<typeof EditFile>>();

const shareRef = shallowRef<InstanceType<typeof Share>>();
// 菜单列表
const menus = [{ k: 1, v: "重命名", icon: "i-lets-icons-rename-light" }, {
  k: 2,
  v: "删除",
  icon: "i-mdi-light-delete",
}, { k: 3, v: "下载", icon: "i-solar-download-linear" }, { k: 4, v: "分享", icon: "i-material-symbols-share" }];

const model = ref({
  clientX: 0,
  clientY: 0,
  menuId: 0,
  isShow: false,
  path: "",
  name: [],
});

// 右击菜单
function cellContextmenu(row: any, column: any, cell: HTMLTableCellElement, event: Event) {
  model.value.clientX = event.clientX;
  model.value.clientY = event.clientY;
  model.value.isShow = true;
  event.preventDefault();
  model.value.name.push(row.name);
}

const { send: deleteSend } = useRequest(() => deleteFile({ type: 1, path: MyPathGet().path, name: model.value.name }), {
  // 当immediate为false时，默认不发出
  immediate: false,
});

// 菜单点击事件
function onMenu(item) {
  model.value.isShow = false;
  switch (item.k) {
    case 1:
      // 重命名逻辑
      editRef.value?.open("edit");
      emit("comp", true);
      model.value.name = [];
      break;
    case 2:
      try {
        deleteSend().then(() => {
          emit("comp", true);
        });

        model.value.name = [];
      } catch (error) {
        console.error("Error deleting file:", error);
        // 处理错误，例如显示错误消息
      }
      break;
    case 3:
      // 下载逻辑
      break;
    case 4:
      // 分享逻辑
      shareRef.value?.open();
      model.value.name = []
      ;
      break;
    default:
      console.warn("Unknown menu item:", item);
  }
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

function select(selection: any[]) {
  model.value.name = selection.map(item => item.name);
}

function comp() {
  emit("comp", true);
}
</script>

<template>
  <ElTable
    v-loading="props.isLoading" :data="props.tableData" @selection-change="select"
    @cell-contextmenu="cellContextmenu" @row-click="open"
  >
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
    class="dropdown-content z-[9] w-52 bg-base-100 p-2 text-center shadow menu rounded-box"
    tabindex="1"
  >
    <li v-for="(item, index) in menus" :key="index">
      <a @click="onMenu(item)">
        <UnoCSSIconButton :icon="item.icon" />
        <a>{{ item.v }}</a>
      </a>
    </li>
  </ul>
  <Share ref="shareRef" :name="model?.name" />
  <EditFile ref="editRef" :name="model?.name" title-type @comp="comp" />
</template>

<style scoped>

</style>
