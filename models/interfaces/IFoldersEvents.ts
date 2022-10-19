import { IFolder } from "./IFolder";

export interface IFoldersEvents {
  "folders/post/folder": (folder: IFolder) => void;
  "folders/post/folders": (folders: Array<IFolder>) => void;
}
