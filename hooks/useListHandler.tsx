import { BlockchainSource, GenericEntry, IMessage, MessagesList } from "@ylide/sdk";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useStore } from "../storeZ";
import { useMitt } from "react-mitt";
import EEventType from "../models/enums/EEventType";
import _ from "lodash";

export const useListHandler = (dispatchEvent: "inboxMessages" | "sentMessages", isLg: boolean) => {
  const { emitter } = useMitt();
  const { inboxMessages, sentMessages } = useStore((store) => store);
  const postInboxMessages = useStore((store) => store["messages/post/inboxMessages"]);
  const resetInboxMessages = useStore((store) => store["messages/reset/inboxMessages"]);
  const postSentMessages = useStore((store) => store["messages/post/sentMessages"]);
  const resetSentMessages = useStore((store) => store["messages/reset/sentMessages"]);
  const list = useMemo(() => new MessagesList(), []);
  const [messages, setMessages] = useState<GenericEntry<IMessage, BlockchainSource>[] | null>(null);
  const handleSetEmptyMessages = useCallback(() => {
    switch (dispatchEvent) {
      case "inboxMessages":
        postInboxMessages([]);
        break;

      case "sentMessages":
        postSentMessages([]);
        break;
    }
  }, [dispatchEvent]);

  useEffect(() => {
    emitter.on(EEventType.SetEmptyMessages, handleSetEmptyMessages);

    return () => {
      emitter.off(EEventType.SetEmptyMessages, handleSetEmptyMessages);
    };
  }, [emitter]);
  useEffect(() => {
    const handleWindowUpdate = () => {
      setMessages([...list.getWindow()]);
    };

    list.on("windowUpdate", handleWindowUpdate);

    return () => {
      list.off("windowUpdate", handleWindowUpdate);
    };
  }, [list]);
  useEffect(() => {
    if (messages?.length) {
      switch (dispatchEvent) {
        case "inboxMessages":
          postInboxMessages(isLg ? messages : _.orderBy(_.uniqBy([
            ...(
              inboxMessages || []
            ),
            ...messages,
          ], "link.msgId"), ["time"], ["desc"]));
          resetSentMessages();
          break;

        case "sentMessages":
          postSentMessages(isLg ? messages : _.orderBy(_.uniqBy([
            ...(
              sentMessages || []
            ), ...messages,
          ], "link.msgId"), ["time"], ["desc"]));
          resetInboxMessages();
          break;
      }
    }
  }, [messages]);

  return list;
};
