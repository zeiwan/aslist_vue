<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import Edit from "~/pages/pan/account/edit.vue";
// 引用组件函数
const editRef = shallowRef<InstanceType<typeof Edit>>();
const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smaller("sm");
const suspendId = ref(0);
function add() {
  editRef.value?.open("add");
}
// 鼠标事件
function handleMouseOver(index: number) {
  suspendId.value = index;
}
//  鼠标离开
function handleMouseOut() {
  suspendId.value = null;
}
</script>

<template>
  <div class="flex justify-center">
    <ElCard class="w-full">
      <div class="flex pb space-x-4">
        <div class="text-white btn btn-info btn-sm" @click="add">
          添加
        </div>
        <div class="text-white btn btn-success btn-sm" @click="refresh">
          重载
        </div>
      </div>
      <ElCard class="el-card__header" shadow="never">
        <template #header>
          <div class="font-bold">
            云盘账号管理
          </div>
        </template>
        <div class="overflow-auto">
          <div :class=" isMobile ? 'grid grid-cols-1 mt-3 gap-4' : 'grid grid-cols-3 mt-3 gap-4' ">
            <div
              v-for="(item, index) in 1" :key="index"
              :class="suspendId === index ? 'border border-blue-500' : ''"
              class="border-radius bg-gray-1 py-2 card"

              @mouseout="handleMouseOut" @mouseover="handleMouseOver(index)"
            >
              <div
                class="text-center space-y-3"
              >
                <div class="badge badge-accent">
                  天翼云盘
                </div>
                <div class="text-sm">
                  账号内容
                </div>
                <div class="space-x-4">
                  <button class="btn btn-success btn-sm">
                    编辑
                  </button>
                  <button class="btn btn-sm">
                    禁用
                  </button>
                  <button class="btn btn-error btn-sm">
                    删除
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ElCard>
    </ElCard>
  </div>
  <Edit ref="editRef" />
</template>

<style scoped>
.el-card__header {
  --el-card-padding: 7px;
}
</style>
