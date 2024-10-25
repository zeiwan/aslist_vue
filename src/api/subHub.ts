import { Alova } from "~/hooks/api";

export function getSubFolderLists(data: any) {
  return Alova.createPost("/subHub/getShareFolderLists", data);
}
