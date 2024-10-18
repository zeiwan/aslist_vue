<script lang="ts" setup>
import { breakpointsTailwind } from "@vueuse/core";
import Mobile from "~/layouts/Navbar/Mobile.vue";
import Pc from "~/layouts/Navbar/Pc.vue";
import ThemeChange from "~/layouts/Navbar/ThemeChange/index.vue";

const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smaller("sm");

const menuItems = ref([
  { type: "link", label: "影视中心", href: "" },
  {
    type: "dropdown",
    label: "管理中心",
    items: [
      { label: "云盘管理", href: "store" },
      { label: "订阅中心", href: "subCenter" },
      { label: "账号管理", href: "account" },
    ],
  },
]);
function handleGoRouter(subItem, event) {
  console.log(subItem, event);
  // console.log("Navigating to:", subItem.label);
  // console.log(subItem.href);
  // // 关闭当前的 details 元素
  // const detailsElement = event.target.closest("details");
  // if (detailsElement) {
  //   detailsElement.open = false;
  // }
}
function handleNavigate(subItem, event) {
  // router.push(subItem.href);
  console.log(event, subItem.href);
  // const detailsElement = event.target.closest("details");
  // if (detailsElement) {
  //   detailsElement.open = false;
  // }
}
</script>

<template>
  <div className="navbar bg-base-100 shadow">
    <Mobile v-if="isMobile" :menu-list="menuItems" />
    <Pc v-else :menu-list="menuItems" @navigate="handleNavigate" />
    <div class="navbar-end-">
      <ThemeChange />
    </div>
  </div>
</template>

<style>
.divider {
  margin: 0;
  height: 1px;
}
.navbar-start-n {
  width: 10%;
  justify-content: flex-start;
}
.navbar-start-y {
  width: 50%;
  justify-content: flex-start;
}
.navbar-end- {
  width: 100%;
  justify-content: flex-end;
}
</style>
