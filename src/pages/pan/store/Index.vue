<script lang="ts" setup>
import { computed, onMounted, ref, shallowRef } from "vue";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { useRequest } from "alova/client";
import Table from "./Table.vue";
import Grid from "~/pages/pan/store/Grid.vue";
import EditFile from "~/pages/pan/store/modules/editFile.vue";
import { getFileList } from "~/api";

// 引用组件函数
const editRef = shallowRef<InstanceType<typeof EditFile>>();
const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smaller("sm");
const rootPath = ref([""]);
const commonPath = ref("/");
const type = ref(1);

// 切换视图
const currentComponent = computed(() => type.value === 1 ? Table : Grid);
const { data, loading, send } = useRequest(() => getFileList({ path: commonPath.value, type: 1 }));

async function getFiles(common = "/") {
  if (common === "") {
    commonPath.value = "/";
  } else {
    commonPath.value = common;
  }
  MyPathSet(commonPath.value);
  await send();
}

onMounted(() => {
  getFiles();
});

// 设置路径 来自子组件点击事件
function setPath(path: string) {
  rootPath.value.push(path);
  commonPath.value = rootPath.value.join("/");
  getFiles(rootPath.value.join("/"));
}

// 点击面包屑
function goMenu(item: string) {
  const index = rootPath.value.indexOf(item);
  rootPath.value = rootPath.value.slice(0, index + 1);
  getFiles(rootPath.value.join("/"));
}

// 返回上层
function goBack() {
  rootPath.value.pop();
  getFiles(rootPath.value.join("/"));
}

// 视图切换
function cut() {
  type.value = 2;
}

function upload() {
  ElMessage.info("暂未开发完成！~");
}

// 新建文件
async function createFile() {
  if (editRef.value) {
    await new Promise<void>((resolve) => {
      editRef.value!.open("add", () => {
        resolve();
      });
    });
  }
}

async function comp() {
  await send();
}
</script>

<template>
  <div>
    <ElCard>
      <div class="flex pb space-x-4">
        <div class="text-white btn btn-info btn-sm" @click="upload">
          上传文件
        </div>
        <div class="text-white btn btn-success btn-sm" @click="createFile">
          新建文件
        </div>
        <!--        <div class="text-white btn btn-error btn-sm"> -->
        <!--          批量删除 -->
        <!--        </div> -->
      </div>
      <ElCard class="el-card__header" shadow="never">
        <template #header>
          <div class="text-sm breadcrumbs">
            <ul>
              <li v-show="rootPath.length > 1">
                <a @click="goBack">返回</a>
              </li>
              <li v-for="item in rootPath" :key="item">
                <a @click="goMenu(item)">{{ item || '全部' }}</a>
              </li>
            </ul>
          </div>
        </template>
        <component
          :is="currentComponent" :is-loading="loading" :is-mobile="isMobile" :table-data="data?.records"
          @comp="comp" @send-path="setPath"
        />
      </ElCard>
    </ElCard>
  </div>
  <EditFile ref="editRef" @comp="comp" />
</template>

<style scoped>
.el-card__header {
  --el-card-padding: 5px;
}
</style>
