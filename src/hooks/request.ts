import { createAlova } from "alova";
import adapterFetch from "alova/fetch";
import VueHook from "alova/vue";
import { logger } from "@kirklin/logger";

// 获取 token 的计算属性
// const token = computed(() => store.getters["auth/token"]);

export const AlovaInstance = createAlova({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  statesHook: VueHook,
  requestAdapter: adapterFetch(),

  // 设置全局的请求拦截器，与axios相似
  beforeRequest(method) {
    // 设置请求头中的 token
    // console.log("token.value");
    // if (token.value) {
    //   method.setConfig({
    //     headers: {
    //       ...method.config.headers,
    //       Authorization: `Bearer ${token.value}`,
    //     },
    //   });
    // }

    // 设置表单类型 Content-Type
    if (method.config.body && method.config.body instanceof FormData) {
      method.setConfig({
        headers: {
          ...method.config.headers,
          "Content-Type": "multipart/form-data",
        },
      });
    } else if (method.config.body) {
      method.setConfig({
        headers: {
          ...method.config.headers,
          "Content-Type": "application/json",
        },
      });
    }
  },

  responded: {
    // 请求成功的拦截器
    onSuccess: async (response, method) => {
      if (response.status >= 400) {
        let errorMessage = response.statusText;
        switch (response.status) {
          case 404:
            errorMessage = "请求的资源未找到。";
            break;
          default:
            errorMessage = `服务器返回了一个错误：${response.statusText}`;
        }
        ElMessage.error(errorMessage);
        throw new Error(errorMessage);
      }

      const json = await response.json();
      if (json.code !== 0) {
        ElMessage.error(json.msg || json.message || "未知错误");
        throw new Error(json.message || "未知错误");
      }
      return json.data;
    },

    // 请求失败的拦截器
    onError: (error, method) => {
      logger.error(error, method);
      ElMessage.error(`请求失败：${error.message}`);
    },

    // 请求完成的拦截器
    onComplete: async (method) => {
      // 处理请求完成逻辑，例如关闭请求 loading 状态
      // 这里可以根据实际情况添加逻辑
      // 例如：method.cancelLoading()
    },
  },
});
