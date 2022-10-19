import { IContact } from "./IContact";

export interface IContactsState {
  contact: IContact | null;
  contacts: Array<IContact> | null;
}
