<script lang="ts" setup>
import { getSvgIcon } from "~/pages/pan/store/icons";

const props = defineProps<{
  tableData: any;
  isLoading: boolean;
  isMobile: boolean;
}>();
const suspendId = ref(null);
const selectedItems = ref([]);
// 单击打开
function open(e) {
  console.log(e);
}
// 鼠标悬停
function handleMouseOver(index: number) {
  suspendId.value = index;
}
//  鼠标离开
function handleMouseOut() {
  suspendId.value = null;
}
// 选择
function choose(item: any) {
  selectedItems.value.push(item.name);

  console.log(selectedItems.value);
}
</script>

<template>
  <div v-loading="props.isLoading" class="h-[750px] w-[790px]">
    <div class="grid grid-cols-8 gap-4">
      <div
        v-for="(item, index) in tableData" :key="item.id"
        :class="suspendId === index ? 'bg-gray-1' : ''"
        class="rounded"
        @mouseout="handleMouseOut" @mouseover="handleMouseOver(index)"
      >
        <input
          class="checkbox-info checkbox checkbox-xs"
          type="checkbox"
          @click="choose(item)"
        >

        <div class="flex flex-col items-center" @click="open">
          <div v-html="getSvgIcon(item.isDir ? 'dir' : item.type, 48)" />
          <ElText class="w-150px text-center" truncated>
            <div class="mb-1">
              {{ item.name }}
            </div>
          </ElText>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
