import { TStoreSlice } from "../models/types/TStoreSlice";
import { IContactsState } from "../models/interfaces/IContactsState";
import { IContactsEvents } from "../models/interfaces/IContactsEvents";
import { IContact } from "../models/interfaces/IContact";

export const contactsModule: TStoreSlice<IContactsState & IContactsEvents> = set => (
  {
    contact: null,
    contacts: null,
    "contacts/post/contact": (contact: IContact) => set({
      contact,
    }),
    "contacts/post/contacts": (contacts: Array<IContact>) => set({
      contacts,
    }),
  }
);
