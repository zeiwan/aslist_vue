import { Alova } from "~/hooks/api";

export function getDetail(params: any) {
  return Alova.createGet("/hub/getDetail", params);
}
export function deleteTask(params: any) {
  return Alova.createGet("/hub/deleteTask", params);
}

export function editTask(datta: any) {
  return Alova.createPost("/hub/editTask", datta);
}

export function addTask(datta: any) {
  return Alova.createPost("/hub/addTask", datta);
}
export function getTaskLists(datta: any) {
  return Alova.createGet("/hub/getTaskLists", datta);
}

export function getSubFolderLists(data: any) {
  return Alova.createPost("/subHub/getShareFolderLists", data);
}
export function getShareNodes(data: any) {
  return Alova.createPost("/subHub/getShareNodes", data);
}
export function getMyDirNodes(data: any) {
  return Alova.createPost("/subHub/getMyNodes", data);
}
export function createDir(data: any) {
  return Alova.createPost("/subHub/createDir", data);
}
