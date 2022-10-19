import { NextPage } from "next";
import Head from "next/head";
import styled, { StyledComponent } from "styled-components";
import appConfig from "../../app.config";
import TPageProps from "../../models/types/TPageProps";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { intl } from "../../common/intl";
import ContentHeader from "../../components/headers/ContentHeader";
import { useCallback, useEffect, useRef, useState } from "react";
import ECheckboxStatus from "../../models/enums/ECheckboxStatus";
import Table from "../../components/Table";
import { getDateFormat, px2rem } from "../../common/lib";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { tableContainer } from "../../styles/mixins";
import { useToggle } from "ahooks";
import MobileLayout from "../../components/layouts/MobileLayout";
import SentRow from "../../components/rows/SentRow";
import { routes } from "../../consts/routes";
import { useListHandler } from "../../hooks/useListHandler";
import { useStore } from "../../storeZ";
import { BlockchainSource, BlockchainSourceSubjectType, GenericEntry, IMessage, Ylide } from "@ylide/sdk";
import EncryptedMessageForm from "../../components/forms/EncryptedMessageForm";
import Window from "../../components/Window";
import EEventType from "../../models/enums/EEventType";
import { useMitt } from "react-mitt";
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
const Sent: NextPage<TPageProps> = ({ isLg, title }) => {
  const [showWindow, { toggle }] = useToggle(false);
  const [pending, setPending] = useState(true);
  const [bottomPending, setBottomPending] = useState(false);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState<string[]>([]);
  const { push } = useRouter();
  const { emitter } = useMitt();
  const containerRef = useRef<HTMLElement>(null);
  const messageDecrypt = useStore((store) => store["message/decrypt"]);
  const postMessage = useStore((store) => store["messages/post/message"]);
  const sent = useListHandler("sentMessages", true); // isLg
  const { accountsState, accountList, sentMessages, readers } = useStore((store) => store);
  const handleAllCheckboxClick = () => {
  };
  const handleCheckAllClick = () => {
  };
  const handleCheckNoneClick = () => {
    setCheckedCheckboxes([]);
  };
  const handleNextPageClick = () => {
    setPending(true);
    setTimeout(async () => {
      await sent?.goNextPage();
    }, 1000);
  };
  const handlePreviousPageClick = async () => {
    setPending(true);
    setTimeout(async () => {
      await sent?.goPreviousPage();
    }, 1000);
  };
  const handleCheckboxClick = (id: string) => {
    if (checkedCheckboxes.includes(id)) {
      setCheckedCheckboxes(checkedCheckboxes.filter(currentId => currentId !== id));
    } else {
      setCheckedCheckboxes(ids => [...ids, id]);
    }
  };
  const handleRowClick = (item: GenericEntry<IMessage, BlockchainSource>) => {
    postMessage(item);
    void push(`${routes.mail}${item?.link?.msgId}`);
  };
  const handleShowEncryptedMessage = useCallback(() => {
    toggle();
  }, [toggle]);
  const handleToggleWindow = useCallback(() => {
    toggle();
  }, [toggle]);
  const handleComposeClick = useCallback(async () => {
    await push(routes.compose);
  }, [push]);
  const handleScroll = useCallback(async () => {
    const element = containerRef.current;

    if (element) {
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        if (sent.isNextPageAvailable()) {
          /*
          setBottomPending(true);
          setTimeout(async () => {
            await sent?.goNextPage();
          }, 1000);
           */
        }
      }
    }
  }, [containerRef]);
  const tableRows = (
    <>
      {sentMessages?.map(item => {
        return (
          <SentRow
            attachments={item?.decryptedContent?.content?.files}
            key={item.link.msgId}
            checked={checkedCheckboxes.includes("0")}
            avatarColor={"#f27685"}
            name={`${accountList?.[0]?.address.substring(0, 10)}...${accountList?.[0]?.address.slice(-5)}`}
            subject={item.decryptedContent ? item.decryptedContent.subject : "CryptedMessage"}
            text={item.decryptedContent ? item.decryptedContent.content.body : "CryptedMessage"}
            // folders={["#f27685", "#54d971", "#80a3ff"]}
            date={getDateFormat(item.link.createdAt, "LLLL dd")}
            clickable={!!item.decryptedContent}
            encrypted={!item.decryptedContent}
            isLg={isLg}
            onRowClick={() => handleRowClick(item)}
            onCheckboxClick={() => handleCheckboxClick("0")}
            onDecodeClick={() => messageDecrypt(item, "sent")} />
        );
      })}
    </>
  );

  useEffect(() => {
    if (readers.length && accountList.length && !!accountsState) {
      for (const reader of readers) {
        for (const account of accountList) {
          const state = accountsState?.[account.address];
          if (state && state.wallet) {
            sent.addReader(
              reader,
              {
                type: BlockchainSourceSubjectType.RECIPIENT,
                address: Ylide.getSentAddress(
                  state.wallet.wallet.addressToUint256(
                    account.address,
                  ),
                ),
              },
              300000,
            );
          }
        }
      }

      sent.readFirstPage().then(() => {
        if (!sent.getWindow().length) {
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
              sent.removeReader(reader, {
                type: BlockchainSourceSubjectType.RECIPIENT,
                address: Ylide.getSentAddress(
                  state.wallet.wallet.addressToUint256(
                    account.address,
                  ),
                ),
              });
            }
          }
        }
      }
    };
  }, [accountsState, readers, accountList]);
  useEffect(() => {
    if (emitter) {
      emitter.on(EEventType.ShowEncryptedMessageWindow, handleShowEncryptedMessage);

      return () => {
        emitter.off(EEventType.ShowEncryptedMessageWindow, handleShowEncryptedMessage);
      };
    }
  }, [emitter, handleShowEncryptedMessage]);
  useEffect(() => {
    if (sentMessages !== null) {
      setPending(false);
      setBottomPending(false);
    }
  }, [sentMessages]);

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
           <Icon name={EIcon.Archive} />
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
            nextDisabled={!sent?.isNextPageAvailable() ||
              (
                sentMessages || []
              ).length <
              10} // TODO: костыль, убрать когда починят СДК
            previousDisabled={!sent?.isPreviousPageAvailable()}
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
            {!pending && (
              sentMessages?.length || 0
            ) > 0 && <Table rows={tableRows} isLg={isLg} />}
            {sentMessages?.length === 0 && (
              <section>
                <FormattedMessage id="no-new-mail" defaultMessage="You have no mails yet" tagName="p" />
                <Button primary={true} onClick={handleComposeClick}>
                  <FormattedMessage id="compose-email" defaultMessage="Compose email" tagName="span" />
                </Button>
              </section>
            )}
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
          <ContentHeader title={title?.split("-")?.[0]?.trim()}
            // withLock={!!tableRows} onLockToggle={handleLockToggle}
          >
            {/* {!!tableRows && (
             <SearchForm value={""} />
             )} */}
          </ContentHeader>
          <TableHeader
            checkboxStatus={checkedCheckboxes.length === 0
              ? ECheckboxStatus.Unchecked
              : checkedCheckboxes.length < 5
                ? ECheckboxStatus.Half
                : ECheckboxStatus.Checked}
            nextDisabled={!sent?.isNextPageAvailable()}
            previousDisabled={!sent?.isPreviousPageAvailable()}
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
          <>
            {/* <TableHeader
             checkboxStatus={checkedCheckboxes.length === 0
             ? ECheckboxStatus.Unchecked
             : checkedCheckboxes.length < 5
             ? ECheckboxStatus.Half
             : ECheckboxStatus.Checked}
             fullCount={5}
             offset={0}
             pageSize={5}
             onCheck={handleAllCheckboxClick}
             onAllCheck={handleCheckAllClick}
             onNoneCheck={handleCheckNoneClick}
             onNextClick={handleNextPageClick}
             onPreviousClick={handlePreviousPageClick}>
             {
             checkedCheckboxes.length > 0 && (
             <Button onClick={() => {
             }}>
             <Icon name={EIcon.Archive} />
             </Button>
             )
             }
             </TableHeader> */}
            <StyledContainer>
              {pending && <Preloader size={200} />}
              {!pending && (
                sentMessages?.length || 0
              ) > 0 && <Table rows={tableRows} isLg={isLg} />}
              {!pending && sentMessages?.length === 0 && (
                <section>
                  <FormattedMessage id="no-new-mail" defaultMessage="You have no mails yet" tagName="p" />
                  <Button primary={true} size={EButtonSize.Big} onClick={handleComposeClick}>
                    <FormattedMessage id="compose-email" defaultMessage="Compose email" tagName="span" />
                  </Button>
                </section>
              )}
            </StyledContainer>
          </>
        </DashboardLayout>
      )}
    </>
  );
};
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      title: `${intl(locale).formatMessage({
        id: "sent",
        defaultMessage: "Sent",
      })} - ${appConfig.data.title}`,
    },
  };
};

export default Sent;
