import { Alova } from "~/hooks/api";

export function panLogin(data: any) {
  return Alova.createPost("/pan/login", data);
}
