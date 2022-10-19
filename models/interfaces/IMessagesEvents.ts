import { BlockchainSource, GenericEntry, IMessage, IMessageContent, IMessageCorruptedContent } from "@ylide/sdk";

export interface IMessagesEvents {
  "messages/post/inboxMessages": (inboxMessages: Array<GenericEntry<IMessage, BlockchainSource>>) => void;
  "messages/reset/inboxMessages": () => void;
  "messages/post/sentMessages": (sentMessages: Array<GenericEntry<IMessage, BlockchainSource>>) => void;
  "messages/reset/sentMessages": () => void;
  "messages/post/message": (message: GenericEntry<IMessage, BlockchainSource>) => void;
  "message/decrypt": (message: GenericEntry<IMessage, BlockchainSource>, type: "inbox" | "sent") => void;
  "message/decryptById": (message: IMessageContent | IMessageCorruptedContent) => void;
}
