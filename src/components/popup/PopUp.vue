<script lang="ts" setup>
import { ref, watch } from "vue";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const props = defineProps<{
  title?: string;
  modelValue: boolean;
  onClose: () => void;
  loading: boolean;
  hidden?: boolean;
}>();
const emits = defineEmits(["close", "confirm"]);
const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smaller("sm");
const localIsShow = ref(props.modelValue);

// 监听 modelValue 的变化
watch(() => props.modelValue, (newVal) => {
  localIsShow.value = newVal;
});

// 关闭对话框
function close() {
  localIsShow.value = false;
  emits("close");
  props.onClose(); // 触发父组件的关闭方法
}

function confirm() {
  emits("confirm");
}
</script>

<template>
  <ElDialog v-model="localIsShow" :title="props.title" :width="isMobile ? '400px' : '500px'" @close="close">
    <slot />
    <template v-if="!props.hidden" #footer>
      <div class="space-x-4">
        <button class="btn btn-sm" @click="close">
          取消1111
        </button>
        <button :disabled="props.loading" class="btn btn-success btn-sm" @click="confirm">
          确定
        </button>
      </div>
    </template>
  </ElDialog>
</template>

<style scoped>
/* 你的样式 */
</style>
