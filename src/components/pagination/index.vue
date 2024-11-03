<script lang="ts" setup>
interface Props {
  modelValue?: Record<string, any>;
  pageSizes?: number[];
  layout?: string;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({}),
  pageSizes: () => [15, 20, 30, 40],
  layout: "total, sizes, prev, pager, next, jumper",
});

const emit = defineEmits<{
  (event: "change"): void;
  (event: "update:modelValue", value: any): void;
}>();

const pager = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
function sizeChange() {
  pager.value.page = 1;
  emit("change");
}
function pageChange() {
  emit("change");
}
</script>

<template>
  <div class="pagination">
    <ElPagination
      v-model:current-page="pager.page"
      v-model:page-size="pager.size"
      :hide-on-single-page="false"
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="5"
      :total="pager.count"
      v-bind="props"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
  </div>
</template>
