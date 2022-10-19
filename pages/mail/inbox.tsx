import { memo, useCallback, useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import styled, { StyledComponent } from "styled-components";
import { FormattedMessage } from "react-intl";
import { useToggle } from "ahooks";
import { useMitt } from "react-mitt";
import { BlockchainSource, BlockchainSourceSubjectType, GenericEntry, IMessage } from "@ylide/sdk";
import appConfig from "../../app.config";
import TPageProps from "../../models/types/TPageProps";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { intl } from "../../common/intl";
import ContentHeader from "../../components/headers/ContentHeader";
import SearchForm from "../../components/forms/SearchForm";
import Table from "../../components/Table";
import ECheckboxStatus from "../../models/enums/ECheckboxStatus";
import { useListHandler } from "../../hooks/useListHandler";
import { useStore } from "../../storeZ";
import InboxRow from "../../components/rows/InboxRow";
import { tableContainer } from "../../styles/mixins";
import MobileLayout from "../../components/layouts/MobileLayout";
import { getDateFormat, px2rem } from "../../common/lib";
import { routes } from "../../consts/routes";
import Window from "../../components/Window";
import EEventType from "../../models/enums/EEventType";
import EncryptedMessageForm from "../../components/forms/EncryptedMessageForm";
import Preloader from "../../components/Preloader";
import TableHeader from "../../components/TableHeader";
import Button from "../../components/buttons/Button";
import EButtonSize from "../../models/enums/EButtonSize";

const StyledContainer: StyledComponent<any, any> = styled.div`
  position: relative;
  flex: 1;
  ${tableContainer()};

  & > section {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > p {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: ${px2rem(32)};
      font-weight: 500;
      margin-bottom: ${px2rem(30)};
    }

    & > button {
      width: ${px2rem(268)};
    }
  }
`;
const MobileStyledContainer: StyledComponent<any, any> = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  max-height: calc(100vh - ${px2rem(96)}); // 42
  min-height: calc(100vh - ${px2rem(96)}); // 42
  overflow-x: hidden;
  overflow-y: auto;

  & > section {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > p {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: ${px2rem(24)};
      font-weight: 400;
      margin-bottom: ${px2rem(30)};
    }

    & > button {
      width: ${px2rem(155)};
    }
  }
`;
const StyledBottomPreloaderContainer: StyledComponent<any, any> = styled.div`
  position: relative;
  min-height: ${px2rem(26)};
  width: 100%;
  overflow: hidden;
  margin-bottom: ${px2rem(20)};
`;
// TODO: Убрать когда починим пейджинг
const StyledMobileTableHeader: StyledComponent<any, any> = styled(TableHeader)`
  padding: ${px2rem(10)} ${px2rem(20)};
  background: white;
`;
//
const Inbox: NextPage<TPageProps> = ({ isLg, title }) => {
  const [showWindow, { toggle }] = useToggle(false);
  const [pending, setPending] = useState(true);
  const [bottomPending, setBottomPending] = useState(false);
  const { accountsState, accountList, inboxMessages, readers } = useStore((store) => store);
  const messageDecrypt = useStore((store) => store["message/decrypt"]);
  const postMessage = useStore((store) => store["messages/post/message"]);
  const inbox = useListHandler("inboxMessages", true); //isLg
  const [checkedCheckboxes, setCheckedCheckboxes] = useState<string[]>([]);
  const { push } = useRouter();
  const { emitter } = useMitt();
  const containerRef = useRef<HTMLElement>(null);
  const handleAllCheckboxClick = () => {
  };
  const handleCheckAllClick = () => {
  };
  const handleCheckNoneClick = () => {
    setCheckedCheckboxes([]);
  };
  const handleNextPageClick = useCallback(() => {
    setPending(true);
    setTimeout(async () => {
      await inbox?.goNextPage();
    }, 1000);
  }, [inbox]);
  const handlePreviousPageClick = useCallback(() => {
    setPending(true);
    setTimeout(async () => {
      await inbox?.goPreviousPage();
    }, 1000);
  }, [inbox]);
  const handleCheckboxClick = (id: string) => {
    if (checkedCheckboxes.includes(id)) {
      setCheckedCheckboxes(checkedCheckboxes.filter(currentId => currentId !== id));
    } else {
      setCheckedCheckboxes(ids => [...ids, id]);
    }
  };
  const handleBookmarkClick = (id: string) => {
    alert(`${id} - Bookmark click`);
  };
  const handleRowClick = (item: GenericEntry<IMessage, BlockchainSource>) => {
    postMessage(item);
    void push(`${routes.mail}${item?.link?.msgId}`);
  };
  const handleToggleWindow = useCallback(() => {
    toggle();
  }, [toggle]);
  const handleComposeClick = useCallback(async () => {
    await push(routes.compose);
  }, [push]);
  const handleScroll = useCallback(() => {
    const element = containerRef.current;

    if (element) {
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        if (inbox?.isNextPageAvailable()) {
          /*setBottomPending(true);
           setTimeout(async () => {
           await inbox?.goNextPage();
           }, 1000);
           */
        }
      }
    }
  }, [containerRef]);
  const tableRows = (
    <>
      {inboxMessages?.map(item => (
        <InboxRow
          attachments={item?.decryptedContent?.content?.files}
          key={item.link.msgId}
          isLg={isLg}
          bookmarked={false}
          checked={checkedCheckboxes.includes("0")}
          avatarColor={"#f27685"}
          name={`${item.link.senderAddress.substring(0, 10)}...${item.link.senderAddress.slice(-5)}`}
          subject={item.decryptedContent ? item.decryptedContent.subject : "CryptedMessage"}
          text={item.decryptedContent
            ? item.decryptedContent.content.body
            : "CryptedMessage"}
          // folders={["#f27685", "#54d971", "#80a3ff"]}
          date={getDateFormat(item.link.createdAt, "LLLL dd")}
          clickable={!!item.decryptedContent}
          encrypted={!item.decryptedContent}
          onRowClick={() => handleRowClick(item)}
          onBookmarkClick={() => handleBookmarkClick("0")}
          onCheckboxClick={() => handleCheckboxClick("0")}
          onDecodeClick={() => messageDecrypt(item, "inbox")} />
      ))}
    </>
  );

  useEffect(() => {
    if (readers.length && accountList.length && !!accountsState) {
      for (const reader of readers) {
        for (const account of accountList) {
          const state = accountsState[account.address];

          if (state && state.wallet) {
            inbox.addReader(
              reader,
              {
                address: state.wallet.wallet.addressToUint256(
                  account.address,
                ),
                type: BlockchainSourceSubjectType.RECIPIENT,
              },
              10000,
            );
            inbox.addReader(
              reader,
              {
                address: state.wallet.wallet.addressToUint256(
                  account.address,
                ),
                type: BlockchainSourceSubjectType.AUTHOR,
              },
              60000,
            );
          }
        }
      }

      inbox.readFirstPage().then(() => {
        if (!inbox.getWindow().length) {
          emitter.emit(EEventType.SetEmptyMessages);
        }
      });
    }

    return () => {
      if (readers.length && accountList.length && !!accountsState) {
        for (const reader of readers) {
          for (const account of accountList) {
            const state = accountsState?.[account.address];

            if (state && state.wallet) {
              inbox.removeReader(reader, {
                address: state.wallet.wallet.addressToUint256(
                  account.address,
                ),
                type: BlockchainSourceSubjectType.RECIPIENT,
              });
            }
          }
        }
      }
    };
  }, [readers, accountList, accountsState]);
  useEffect(() => {
    if (emitter) {
      emitter.on(EEventType.ShowEncryptedMessageWindow, handleToggleWindow);

      return () => {
        emitter.off(EEventType.ShowEncryptedMessageWindow, handleToggleWindow);
      };
    }
  }, [emitter, handleToggleWindow]);
  useEffect(() => {
    if (inboxMessages !== null) {
      setPending(false);
      setBottomPending(false);
    }
  }, [inboxMessages]);

  return (
    <>
      {!isLg && (
        <MobileLayout title={title?.split("-")?.[0]?.trim()}>
          <Head>
            <title>{title}</title>
          </Head>
          <Window visible={showWindow} onClose={handleToggleWindow}>
            <EncryptedMessageForm onClose={handleToggleWindow} />
          </Window>
          {/*<MobileContentHeader
           withLock={true}
           checkboxStatus={checkedCheckboxes.length === 0
           ? ECheckboxStatus.Unchecked
           : checkedCheckboxes.length < 5
           ? ECheckboxStatus.Half
           : ECheckboxStatus.Checked}
           locked={true}
           onLockToggle={handleLockToggle}
           onCheck={handleAllCheckboxClick}
           onAllCheck={handleCheckAllClick}
           onNoneCheck={handleCheckNoneClick}>
           {
           checkedCheckboxes.length > 0 && (
           <section>
           <Button onClick={() => {
           }}>
           <Icon name={EIcon.UncheckedBookmark} />
           </Button>
           <Button onClick={() => {
           }}>
           <Icon name={EIcon.AddFolder} />
           </Button>
           <Button onClick={() => {
           }}>
           <Icon name={EIcon.Archive} />
           </Button>
           <Button onClick={() => {
           }}>
           <Icon name={EIcon.MarkAsRead} />
           </Button>
           </section>
           )
           }
           </MobileContentHeader>*/}
          <StyledMobileTableHeader
            checkboxStatus={checkedCheckboxes.length === 0
              ? ECheckboxStatus.Unchecked
              : checkedCheckboxes.length < 5
                ? ECheckboxStatus.Half
                : ECheckboxStatus.Checked}
            nextDisabled={!inbox?.isNextPageAvailable() ||
              (
                inboxMessages || []
              ).length <
              10} // TODO: костыль, убрать когда починят СДК
            previousDisabled={!inbox?.isPreviousPageAvailable()}
            onCheck={handleAllCheckboxClick}
            onAllCheck={handleCheckAllClick}
            onNoneCheck={handleCheckNoneClick}
            onNextClick={handleNextPageClick}
            onPreviousClick={handlePreviousPageClick}>
            {/*{
             checkedCheckboxes.length > 0 && (
             <Button onClick={() => {
             }}>
             <Icon name={EIcon.Archive} />
             </Button>
             )
             }*/}
          </StyledMobileTableHeader>
          <MobileStyledContainer ref={containerRef} onScroll={handleScroll}>
            {pending && <Preloader size={200} />}
            {!pending &&
              (
                inboxMessages?.length || 0
              ) > 0 && <Table rows={tableRows} isLg={isLg} />}
            {!pending && inboxMessages?.length === 0 &&
              <section>
                <FormattedMessage id="no-new-mail" defaultMessage="You have no mails yet" tagName="p" />
                <Button primary={true} onClick={handleComposeClick}>
                  <FormattedMessage id="compose-email" defaultMessage="Compose email" tagName="span" />
                </Button>
              </section>
            }
            {bottomPending && (
              <StyledBottomPreloaderContainer>
                <Preloader size={100} />
              </StyledBottomPreloaderContainer>
            )}
          </MobileStyledContainer>
        </MobileLayout>
      )}
      {isLg && (
        <DashboardLayout>
          <Head>
            <title>{title}</title>
          </Head>
          <Window visible={showWindow} onClose={handleToggleWindow}>
            <EncryptedMessageForm onClose={handleToggleWindow} />
          </Window>
          <ContentHeader
            title={title?.split("-")?.[0]?.trim()}
            // count={1}
            // withLock={true}
            // locked={true}
            // onLockToggle={handleLockToggle}
          >
            <SearchForm value={""} />
          </ContentHeader>
          <TableHeader
            checkboxStatus={checkedCheckboxes.length === 0
              ? ECheckboxStatus.Unchecked
              : checkedCheckboxes.length < 5
                ? ECheckboxStatus.Half
                : ECheckboxStatus.Checked}
            nextDisabled={!inbox?.isNextPageAvailable() ||
              (
                inboxMessages || []
              ).length <
              10} // TODO: костыль, убрать когда починят СДК
            previousDisabled={!inbox?.isPreviousPageAvailable()}
            onCheck={handleAllCheckboxClick}
            onAllCheck={handleCheckAllClick}
            onNoneCheck={handleCheckNoneClick}
            onNextClick={handleNextPageClick}
            onPreviousClick={handlePreviousPageClick}>
            {/*{
             checkedCheckboxes.length > 0 && (
             <Button onClick={() => {
             }}>
             <Icon name={EIcon.Archive} />
             </Button>
             )
             }*/}
          </TableHeader>
          <StyledContainer>
            {pending && <Preloader size={200} />}
            {!pending &&
              (
                inboxMessages?.length || 0
              ) > 0 && <Table rows={tableRows} isLg={isLg} />}
            {!pending && inboxMessages?.length === 0 &&
              <section>
                <FormattedMessage id="no-new-mail" defaultMessage="You have no mails yet" tagName="p" />
                <Button primary={true} size={EButtonSize.Big} onClick={handleComposeClick}>
                  <FormattedMessage id="compose-email" defaultMessage="Compose email" tagName="span" />
                </Button>
              </section>
            }
          </StyledContainer>
        </DashboardLayout>
      )}
    </>
  );
};
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      title: `${intl(locale).formatMessage({
        id: "inbox",
        defaultMessage: "Inbox",
      })} - ${appConfig.data.title}`,
    },
  };
};

export default memo(Inbox);
