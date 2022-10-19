import { TStoreSlice } from "../models/types/TStoreSlice";
import { IFoldersState } from "../models/interfaces/IFoldersState";
import { IFoldersEvents } from "../models/interfaces/IFoldersEvents";
import { IFolder } from "../models/interfaces/IFolder";

export const foldersModule: TStoreSlice<IFoldersState & IFoldersEvents> = set => (
  {
    folder: null,
    folders: null,
    "folders/post/folder": (folder: IFolder) => set({
      folder,
    }),
    "folders/post/folders": (folders: Array<IFolder>) => set({
      folders,
    }),
  }
);
