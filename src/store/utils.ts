import { breakpointsTailwind } from "@vueuse/core";
import { defineStore } from "pinia";

export const useDeviceStore = defineStore("device", {
  state: () => ({
    isMobile: false,
  }),
  getters: {
    isMobileDevice: state => state.isMobile,
  },
  actions: {
    updateDeviceType() {
      const breakpoints = useBreakpoints(breakpointsTailwind);
      this.isMobile = breakpoints.smaller("sm");
    },
  },
});
