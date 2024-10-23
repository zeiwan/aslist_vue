<script lang="ts" setup>
const props = defineProps<{
  menuList: {
    type: Array<{
      type: string;
      label: string;
      items?: Array<{ label: string; path: string }>;
    }>;
    required: true;
  };
}>();

// const isShow = ref(false);

// function toggleMenu() {
//   console.log("？？？");
//   isShow.value = !isShow.value; // 切换显示状态
// }

// function goRouter(subItem: { path: string }, event: Event) {
//   event.preventDefault();
//   console.log(`Navigating to: ${subItem.path}`);
//   // 这里可以添加实际的路由跳转逻辑
// }
// const { availableLocales, locale } = useI18n();
// function ChangeLocales(lang: string) {
//   locale.value = lang;
//   const localedLang = useLocalStorage("locale", "zh");
//   localedLang.value = lang;
// }
</script>

<template>
  <div className="dropdown z-8">
    <div :tabIndex="1" className="btn m-1 btn-ghost" role="button">
      <UnoCSSIconButton icon="i-tabler:adjustments-horizontal" />
    </div>

    <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-30 p-2 shadow">
      <template v-for="(item, index) in props.menuList" :key="index">
        <li><a v-show="item.type !== 'dropdown'">{{ item.label }}</a></li>
        <template v-for="(sub, index) in item.items" v-if="sub.type === 'dropdown'" :key="index">
          <li><a>{{ sub.label }}</a></li>
        </template>
      </template>
    </ul>
  </div>
</template>

<style scoped>
/* 你可以在这里添加样式 */
._card {
  position: relative;
  top: 50px;
  left: -10px;
  border-radius: 5px;
  background-color: white;
  z-index: 9;
}
</style>
