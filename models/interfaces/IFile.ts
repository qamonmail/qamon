import EFileType from "../enums/EFileType";

export interface IFile {
  name: string;
  type: EFileType;
  url: string;
}
