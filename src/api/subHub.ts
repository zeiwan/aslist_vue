import { Alova } from "~/hooks/api";

export function getSubFolderLists(data: any) {
  return Alova.createPost("/subHub/getShareFolderLists", data);
}
export function getShareNodes(data: any) {
  return Alova.createPost("/subHub/getShareNodes", data);
}
export function getMyDirNodes(data: any) {
  return Alova.createPost("/subHub/getMyNodes", data);
}
