<script lang="ts" setup>
import { useRouter } from "vue-router";
import { breakpointsTailwind } from "@vueuse/core";
import Mobile from "~/layouts/Navbar/Mobile.vue";
import Pc from "~/layouts/Navbar/Pc.vue";

const router = useRouter();

const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smaller("sm");

const menuItems = ref([
  { type: "link", label: "影视中心", href: "/" }, // 添加默认路径
  {
    type: "dropdown",
    label: "管理中心",
    items: [
      { label: "云盘管理", href: "/store" },
      { label: "订阅中心", href: "/subCenter" },
      { label: "账号管理", href: "/account" },
    ],
  },
]);

function handleNavigate(subItem) {
  router.push(subItem.href);
  // console.log(event, subItem.href);
  // const detailsElement = event.target.closest("details");
  // if (detailsElement) {
  //   detailsElement.open = false;
  // }
}
</script>

<template>
  <div className="navbar bg-base-100 shadow pb-5">
    <Mobile v-if="isMobile" :menu-list="menuItems" />
    <Pc v-else :menu-list="menuItems" @navigate="handleNavigate" />
    <!--    <div class="navbar-end-"> -->
    <!--      <ThemeChange /> -->
    <!--    </div> -->
  </div>
</template>
