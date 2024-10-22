import { useIDBKeyval } from "@vueuse/integrations/useIDBKeyval";

const { data: pathObject } = useIDBKeyval("path", { path: "/" });

// 操作 PathStore
export function MyPathSet(path: any) {
  pathObject.value.path = path;
}

export function MyPathGet() {
  return pathObject.value;
}
