import { IFolder } from "./IFolder";

export interface IFoldersState {
  folder: IFolder | null;
  folders: Array<IFolder> | null;
}
