import type { FSGetFilesResp } from "~/api/resp/wedDav";
import type { FSAddFilesReq, FSGetFilesReq } from "~/api/req/wedDav";
import { Alova } from "~/hooks/api";

export function getFileList(data: FSGetFilesReq): Promise<FSGetFilesResp> {
  return Alova.createPost<FSGetFilesResp>("/fs/getFileList", data);
}

export function addFile(data: FSAddFilesReq): Promise<Response> {
  return Alova.createPost<FSAddFilesReq>("/fs/addFile", data);
}

export function deleteFile(data: FSAddFilesReq): Promise<Response> {
  return Alova.createPost<FSAddFilesReq>("/fs/deleteFile", data);
}

export function shareLink(data: any) {
  return Alova.createPost("/fs/shareLink", data);
}
