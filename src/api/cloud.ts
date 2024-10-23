import { Alova } from "~/hooks/api";

export function cloudLogin(data: any) {
  return Alova.createPost("/cloud/login", data);
}
