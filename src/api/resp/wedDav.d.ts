// types.ts
export interface WebDavGetFilesResp {
  code: number;
  msg: string;
  data: {
    total: number;
    current: number;
    size: number;
    records: FileRecord[];
  };
  show: number;
}

export interface FileRecord {
  date: string;
  isDir: boolean;
  name: string;
  size: string;
  type: string;
}
