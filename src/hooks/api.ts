// api.js

// 请求头

import { AlovaInstance } from "~/hooks/request";

const headers = { "Content-Type": "application/json;charset=UTF-8" };
// 请求超时时间
const timeout = 5000;

export const Alova = {
  // 这是get请求
  createGet(url: string, params?: Record<string, any>) {
    return AlovaInstance.Get(url, {
      headers,
      params,
      localCache: {
        mode: "placeholder", // 设置缓存模式为持久化占位模式
        // expire: 60 * 10 * 1000, // 缓存时间
      },
      timeout,
    });
  },
  // 这是post请求
  createPost(url: string, data: Record<string, any>, params?: Record<string, any>) {
    return AlovaInstance.Post(url, data, {
      headers,
      params,
    });
  },
  // 这是put请求
  createPut(url: string, data: Record<string, any>, params?: Record<string, any>) {
    return AlovaInstance.Put(url, data, {
      headers,
      params,
    });
  },
  // 这是delete请求
  createDelete(url: string, params?: Record<string, any>) {
    return AlovaInstance.Delete(url, {
      headers,
      params,
    });
  },
};
