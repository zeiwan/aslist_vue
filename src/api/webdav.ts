import type { WebDavGetFilesResp } from "~/api/resp/wedDav";
import type { WebDavAddFilesReq, WebDavGetFilesReq } from "~/api/req/wedDav";
import { Alova } from "~/hooks/api";

export function getFileList(data: WebDavGetFilesReq): Promise<WebDavGetFilesResp> {
  return Alova.createPost<WebDavGetFilesResp>("/webdav/getFileList", data);
}

export function addFile(data: WebDavAddFilesReq): Promise<Response> {
  return Alova.createPost<WebDavAddFilesReq>("/webdav/addFile", data);
}

// export function uploadFile(data: WebDavGetFilesReq): Promise<WebDavGetFilesResp> {
//   return put<WebDavGetFilesResp>("/webdav/upload", data);
// }
// export function CreateNewFile(data: any) {
//   return put<WebDavGetFilesResp>("/webdav/createNewFile", data);
// }
