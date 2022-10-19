import { BlockchainSource, GenericEntry, IMessage } from "@ylide/sdk";

export interface IMessagesState {
  inboxMessages: Array<GenericEntry<IMessage, BlockchainSource> & {
    decryptedContent: {
      serviceCode?: number;
      decryptedContent?: Uint8Array;
      type?: string;
      subject?: string;
      content?: any;
    }
  }> | null;
  sentMessages: Array<GenericEntry<IMessage, BlockchainSource> & {
    decryptedContent: {
      serviceCode?: number;
      decryptedContent?: Uint8Array;
      type?: string;
      subject?: string;
      content?: any;
    }
  }> | null;
  message: GenericEntry<IMessage, BlockchainSource> & {
    decryptedContent: {
      serviceCode?: number;
      decryptedContent?: Uint8Array;
      type?: string;
      subject?: string;
      content?: any;
    }
  } | null;
}
