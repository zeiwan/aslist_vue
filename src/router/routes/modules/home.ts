const home = [{
  path: "/home",
  name: "Home",
  component: () => import("~/pages/home/index.vue"),
  meta: {
    title: "Home",
  },
}, {
  path: "/hero",
  name: "Hero",
  component: () => import("~/pages/home/components/Hero.vue"),
}, {
  path: "/StoreTest",
  name: "StoreTest",
  component: () => import("~/pages/home/components/StoreTest.vue"),
}, {
  path: "/pan",
  name: "pan",
  children: [
    {
      path: "dashboard",
      name: "dashboard",
      component: () => import("~/pages/pan/components/Hero.vue"),
    },
    {
      path: "/store",
      name: "store",
      component: () => import("~/pages/pan/store/index.vue"),
    },
    {
      path: "/account",
      name: "account",
      component: () => import("~/pages/pan/account/index.vue"),
    },
    {
      path: "/subCenter",
      name: "subCenter",
      component: () => import("~/pages/pan/subCenter/index.vue"),
    },
  ],
}];

export default home;
