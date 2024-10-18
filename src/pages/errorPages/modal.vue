<script lang="ts" setup>
import { VueFinalModal } from "vue-final-modal";

defineProps<{
  name: "VueFinalModal";
  title?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", modelValue: boolean): void;
}>();
</script>

<template>
  <VueFinalModal
    class="top-0 z-99999 flex items-center justify-center"
    content-class="flex flex-col p-4 bg-white dark:bg-black rounded border border-gray-100 dark:border-gray-800"
    @update:model-value="val => emit('update:modelValue', val)"
  >
    <div class="h-10 flex items-center">
      <h1 v-if="title" class="text-2xl">
        {{ title }}
      </h1>
      <button class="ml-auto" @click="emit('update:modelValue', false)">
        <!--        <Icon class="h-10 w-10" icon="clarity:window-close-line" /> -->
      </button>
    </div>
    <slot />
  </VueFinalModal>
</template>
