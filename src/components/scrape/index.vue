<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const props = defineProps<{
  title?: string;
  isShow: boolean;
  onClose: () => void;
}>();
const emits = defineEmits(["close"]);
const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smaller("sm");
const isShow = ref(props.isShow);
watch(() => props.isShow, (newVal) => {
  isShow.value = newVal;
});
const options = ref([]);
const formData = reactive({
  language: null,
  filmType: null,
  filmId: null,
});

function close() {
  isShow.value = false;
  emits("close");
}
function handleCard(id: number) {
  formData.filmId = id;
  setTimeout(() => {
    isShow.value = false;
  }, 2000);
}
</script>

<template>
  <ElDrawer
    v-model="isShow"
    :before-close="handleClose"
    :direction="direction"
    :modal="false"
    :size="isMobile ? '100%' : '40%'"
    :with-header="false"
  >
    <div class="mb-3 flex justify-between">
      <div>刮削</div>
      <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" @click="close"><path d="m7 7l10 10M7 17L17 7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </div>

    <ElForm>
      <ElFormItem label="影视名称">
        <ElInput />
      </ElFormItem>
      <ElFormItem label="元数据语言">
        <ElSelect v-model="formData.language">
          <ElOption
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="影视类型" prop="filmType">
        <ElRadioGroup v-model="formData.filmType">
          <ElRadio :value="1">
            电影
          </ElRadio>
          <ElRadio :value="2">
            剧集
          </ElRadio>
          <ElRadio :value="3">
            特别篇
          </ElRadio>
          <ElRadio :value="4">
            其他
          </ElRadio>
        </ElRadioGroup>
      </ElFormItem>
      <ElSpace wrap>
        <ElFormItem label="AI重命名">
          <ElSwitch v-model="formData.rename" />
        </ElFormItem>
        <ElFormItem label="字幕下载">
          <ElSwitch v-model="formData.subtitle" />
        </ElFormItem>
        <ElFormItem label="演员头像">
          <ElSwitch v-model="formData.avatar" />
        </ElFormItem>
      </ElSpace>
    </ElForm>
    <ElFormItem label="播放器">
      <ElSelect v-model="formData.player">
        <ElOption
          v-for="item in players"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <span>{{ item.label }}</span>
        </ElOption>
      </ElSelect>
    </ElFormItem>
    <div class="h-[610px] overflow-auto px-1 space-y-2">
      <div
        v-for="(item, index) in 100" :key="index" :class="formData.filmId === index ? 'border border-red-500' : ''" class="bg-gray-1 py-2 card"
        @click="handleCard(index)"
      >
        <div class="mx-2 flex">
          <img class="h-30 rounded" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" width="100">
          <div class="mx-2 w-full">
            <div class="mb-0 flex justify-between">
              <div class="font-bold">
                刮削
              </div>
              <!--              <svg :class="formData.filmId === index ? 'text-green' : 'text-transparent'" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m8.864 16.617l-5.303-5.303l-1.061 1.06l5.657 5.657a1 1 0 0 0 1.414 0L21.238 6.364l-1.06-1.06L8.864 16.616z" fill="currentColor" fill-rule="evenodd" /></svg> -->
              <svg v-show="formData.filmId === index" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g><circle cx="12" cy="2.5" fill="currentColor" opacity="0.14" r="1.5" /><circle cx="16.75" cy="3.77" fill="currentColor" opacity="0.29" r="1.5" /><circle cx="20.23" cy="7.25" fill="currentColor" opacity="0.43" r="1.5" /><circle cx="21.5" cy="12" fill="currentColor" opacity="0.57" r="1.5" /><circle cx="20.23" cy="16.75" fill="currentColor" opacity="0.71" r="1.5" /><circle cx="16.75" cy="20.23" fill="currentColor" opacity="0.86" r="1.5" /><circle cx="12" cy="21.5" fill="currentColor" r="1.5" /><animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" /></g></svg>
            </div>
            <span class="flex text-[13px]">
              <div class="w-1/2">
                2024.8.8
              </div>
              <div class="w-1/2 text-end">
                共:30集
              </div>
            </span>
            <div class="line-clamp-4 text-[13px] text-gray-6">
              天華百剣 ～めいじ館へようこそ!～",
              "overview": "The Tenka Hyakken franchise centers around the \"Mitsurugi,\" maidens who are physical incarnations of ancient swords. They have pledged to live peaceful lives after the era of warfare, but are now returning to battle to fight a new foe that has arisen during an alternate version of the Meiji Era, three hundred years after the Battle of Sekigahara.
            </div>
          </div>
        </div>
      </div>
    </div>
  </ElDrawer>
</template>

<style scoped>
.el-drawer__header {
  margin-bottom: 32px;
}
</style>
