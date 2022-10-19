import { BlockchainSource, GenericEntry, IMessage, Ylide } from "@ylide/sdk";
import { TStoreSlice } from "../models/types/TStoreSlice";
import { IMessagesState } from "../models/interfaces/IMessagesState";
import { IMessagesEvents } from "../models/interfaces/IMessagesEvents";
import { INetworkState } from "../models/interfaces/INetworkState";

export const messagesModule: TStoreSlice<IMessagesState & IMessagesEvents & Partial<INetworkState>> = (set, get) => (
  {
    inboxMessages: null,
    sentMessages: null,
    message: null,
    "messages/post/inboxMessages": inboxMessages => set({
      inboxMessages,
    }),
    "messages/reset/inboxMessages": () => set({
      inboxMessages: null,
    }),
    "messages/post/sentMessages": sentMessages => set({
      sentMessages,
    }),
    "messages/reset/sentMessages": () => set({
      sentMessages: null,
    }),
    "messages/post/message": message => {
      set({
        message,
      });
    },
    "message/decrypt": async (message, type) => {
      if (!get().ylide) {
        return;
      }

      const reader = message.source.reader;
      const acc = get().accountList!
        .map((account: any) => {
          const accountUint256Address = get().accountsState?.[
            account.address
            ].wallet?.wallet.addressToUint256(account.address);
          const sentAddress = Ylide.getSentAddress(
            accountUint256Address,
          );

          if (
            accountUint256Address === message.link.recipientAddress ||
            sentAddress === message.link.recipientAddress
          ) {
            return {
              account,
            };
          }
          return null;
        })
        .find((t: any) => !!t);

      if (!acc) {
        return;
      }

      const content = await reader.retrieveAndVerifyMessageContent(
        message.link,
      );

      if (!content) {
        return alert("Content not found");
      }

      if (content.corrupted) {
        return alert("Content is corrupted");
      }

      const decryptedContent = await get().ylide.decryptMessageContent(
        {
          address: acc?.account.address || "",
          blockchain: "",
          publicKey: null,
        },
        message.link,
        content,
      );
      const parseObj = decryptedContent.content[0] === "{" ? JSON.parse(decryptedContent.content) :
        {
          body: decryptedContent.content,
          signature: "",
          version: 0,
          files: null,
        };

      if (type === "inbox") {
        set({
          inboxMessages: get().inboxMessages.map((item: GenericEntry<IMessage, BlockchainSource>) => {
            if (message.link.msgId === item.link.msgId) {
              return {
                ...item,
                decryptedContent: {
                  ...decryptedContent,
                  content: parseObj,
                },
              };
            }
            return item;
          }),
        });
      }

      if (type === "sent") {
        set({
          sentMessages: get().sentMessages.map((item: GenericEntry<IMessage, BlockchainSource>) => {
            if (message.link.msgId === item.link.msgId) {
              return {
                ...item,
                decryptedContent: {
                  ...decryptedContent,
                  content: parseObj,
                },
              };
            }

            return item;
          }),
        });
      }
    },
    "message/decryptById": async (message) => {

    },
  }
);
