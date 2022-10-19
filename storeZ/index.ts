import create from "zustand";
import { INetworkState } from "../models/interfaces/INetworkState";
import { IMessagesState } from "../models/interfaces/IMessagesState";
import { INetworkEvent } from "../models/interfaces/INetworkEvent";
import { IMessagesEvents } from "../models/interfaces/IMessagesEvents";
import { IContractsState } from "../models/interfaces/IContractsState";
import { IContractsEvents } from "../models/interfaces/IContractsEvents";
import { IContactsState } from "../models/interfaces/IContactsState";
import { IContactsEvents } from "../models/interfaces/IContactsEvents";
import { IFoldersState } from "../models/interfaces/IFoldersState";
import { IFoldersEvents } from "../models/interfaces/IFoldersEvents";
import { messagesModule } from "./messages";
import { networkModule } from "./network";
import { contractsModule } from "./contracts";
import { contactsModule } from "./contacts";
import { foldersModule } from "./folders";

export type StoreState = INetworkState & IMessagesState & IContractsState & IContactsState & IFoldersState;
export type StoreEvents = INetworkEvent & IMessagesEvents & IContractsEvents & IContactsEvents & IFoldersEvents;
export type RootState = StoreState & StoreEvents;

const createRootSlice = (
  set: any,
  get: any
) => (
  {
    ...networkModule(set, get),
    ...messagesModule(set, get),
    ...contractsModule(set, get),
    ...contactsModule(set, get),
    ...foldersModule(set, get),
  }
);

export const useStore = create<RootState>()(createRootSlice);
