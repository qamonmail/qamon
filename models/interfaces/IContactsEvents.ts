import { IContact } from "./IContact";

export interface IContactsEvents {
  "contacts/post/contact": (contact: IContact) => void;
  "contacts/post/contacts": (contacts: Array<IContact>) => void;
}
