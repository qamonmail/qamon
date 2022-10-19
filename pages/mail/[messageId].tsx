import { NextPage } from "next";
import Linkify from "linkify-react";
import TPageProps from "../../models/types/TPageProps";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Head from "next/head";
import styled, { StyledComponent } from "styled-components";
import { getDateFormat, px2rem } from "../../common/lib";
import ContentHeader from "../../components/headers/ContentHeader";
import Icon from "../../components/Icon";
import EIcon from "../../models/enums/EIcon";
import { size, transparentize } from "polished";
import { memo, useCallback, useEffect, useState } from "react";
import { intl } from "../../common/intl";
import appConfig from "../../app.config";
import Avatar from "../../components/Avatar";
import { messageBlocks, mobileMessageBlocks } from "../../styles/mixins";
import MobileLayout from "../../components/layouts/MobileLayout";
import { useStore } from "../../storeZ";
import ago from "../../common/ago";
import FilesForm from "../../components/forms/FilesForm";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import Button from "../../components/buttons/Button";
import { routes } from "../../consts/routes";
import Preloader from "../../components/Preloader";
import { IMessageContent, IMessageCorruptedContent, symmetricDecrypt, Uint256 } from "@ylide/sdk";
import EButtonSize from "../../models/enums/EButtonSize";
import { IFile } from "../../models/interfaces/IFile";
import EFileType from "../../models/enums/EFileType";

const StyledContainer: StyledComponent<any, any> = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${px2rem(30)};
  padding: 0 ${px2rem(30)};
  margin-top: ${px2rem(20)};

  & > section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${px2rem(32)};

    & > svg {
      ${size(px2rem(48))};
    }

    & > p {
      font-size: ${px2rem(32)};
      font-weight: 500;
    }

    & > button {
      width: ${px2rem(260)};
    }
  }

  & > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: ${px2rem(10)};
    overflow-y: auto;
    overflow-x: hidden;
    max-height: calc(100vh - ${px2rem(290)});
    padding-right: ${px2rem(20)};

    & > header {
      max-width: ${px2rem(800)};

      & > h1 {
        font-size: ${px2rem(24)};
        font-weight: 700;
        line-height: ${px2rem(33.6)};
        word-break: break-all;
      }
    }

    & > section {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin: ${px2rem(20)} 0;

      & > div {
        display: flex;
        flex-direction: row;
        align-items: center;

        &:nth-of-type(1) {
          & > strong {
            font-size: ${px2rem(16)};
            font-weight: 400;
            margin-left: ${px2rem(16)};
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        &:nth-of-type(2) {
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: ${px2rem(20)};

          & > ul {
            display: flex;
            flex-direction: row;
            gap: ${px2rem(20)};

            & > li {
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: ${px2rem(10)};
              background-color: var(--inactive-color);
              border: none;
              border-radius: ${px2rem(10)};
              padding: ${px2rem(5)} ${px2rem(10)};

              & > span {
                font-size: ${px2rem(14)};
                font-weight: 400;
                line-height: ${px2rem(20)};
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }

              & > svg {
                ${size(16)};
              }
            }
          }

          & > span {
            display: flex;
            font-size: ${px2rem(16)};
            font-weight: 400;
            color: ${transparentize(.7, "#202020")};
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }

    & > article {
      position: relative;
      display: flex;
      flex-direction: column;
      max-width: ${px2rem(800)};

      & > pre {
        font-size: ${px2rem(18)};
        font-weight: 400;
        line-height: ${px2rem(25.2)};
        max-width: ${px2rem(800)};
        white-space: pre-wrap;
        word-wrap: break-word;

        & > a {
          color: cornflowerblue;
          text-decoration: underline;

          &:hover {
            text-decoration: none;
          }
        }
      }

      &:nth-of-type(2) {
        margin-top: ${px2rem(20)};
      }

      &:nth-of-type(n + 2) {
        background: repeating-linear-gradient(to right,
        ${transparentize(.7, "#202020")} 0,
        ${transparentize(.7, "#202020")} ${px2rem(2)},
        #fff ${px2rem(2)},
        #fff ${px2rem(12)});

        &::before {
          position: absolute;
          content: "";
          display: block;
          height: 100%;
          width: 100%;
          background-color: white;
          z-index: 0;
        }

        & > div {
          background-color: var(--inactive-color);
          padding: ${px2rem(20)};
          border: none;
          border-radius: ${px2rem(10)};
          z-index: 1;

          & > header {
            justify-content: space-between;

            & > span {
              font-size: ${px2rem(14)};
            }
          }
        }
      }

      ${messageBlocks()};
    }
  }
`;
const MobileStyledContainer: StyledComponent<any, any> = styled.section`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: ${px2rem(16)};
  gap: ${px2rem(16)};

  & > header {
    display: flex;
    flex-direction: column;
    gap: ${px2rem(24)};

    & > section {
      &:nth-of-type(1) {
        display: flex;
        flex-direction: row;
        gap: ${px2rem(8)};
      }

      &:nth-of-type(2) {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        & > h1 {
          font-size: ${px2rem(20)};
          font-weight: 700;
          word-break: break-all;
        }

        & > button {
          background: none;
          border: none;
          cursor: pointer;

          & > svg {
            ${size(16)};
          }
        }
      }
    }

    & > p {
      font-size: ${px2rem(12)};
      font-weight: 400;
      color: ${transparentize(.7, "#202020")};
    }
  }

  & > section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${px2rem(32)};

    & > svg {
      ${size(px2rem(48))};
    }

    & > p {
      font-size: ${px2rem(24)};
      font-weight: 400;
      text-align: center;
    }

    & > button {
      width: ${px2rem(180)};
    }
  }

  & > div {
    &:nth-of-type(1) {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      & > div {
        display: flex;
        flex-direction: row;
        align-items: center;

        &:nth-of-type(1) {
          & > strong {
            font-size: ${px2rem(14)};
            font-weight: 500;
            margin-left: ${px2rem(8)};
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
          }
        }

        &:nth-of-type(2) {
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: ${px2rem(12)};

          & > ul {
            display: flex;
            flex-direction: row;
            gap: ${px2rem(20)};

            & > li {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              gap: ${px2rem(10)};
              background-color: var(--inactive-color);
              border: none;
              border-radius: ${px2rem(6)};
              ${size(px2rem(28))};

              & > svg {
                ${size(16)};
              }
            }
          }

          & > span {
            display: flex;
            font-size: ${px2rem(16)};
            font-weight: 400;
            color: ${transparentize(.7, "#202020")};
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }

    &:nth-of-type(2) {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: ${px2rem(10)};
      overflow-y: auto;
      overflow-x: hidden;
      max-height: calc(100vh - ${px2rem(220)});
      padding-right: ${px2rem(6)};

      & > article {
        position: relative;
        display: flex;
        flex-direction: column;
        max-width: ${px2rem(800)};

        & > pre {
          font-size: ${px2rem(14)};
          font-weight: 400;
          line-height: ${px2rem(25.2)};
          max-width: ${px2rem(800)};
          white-space: pre-wrap;
          word-wrap: break-word;

          & > a {
            color: cornflowerblue;
            text-decoration: underline;

            &:hover {
              text-decoration: none;
            }
          }
        }

        &:nth-of-type(2) {
          margin-top: ${px2rem(20)};
        }

        &:nth-of-type(n + 2) {
          background: repeating-linear-gradient(to right,
          ${transparentize(.7, "#202020")} 0,
          ${transparentize(.7, "#202020")} ${px2rem(2)},
          #fff ${px2rem(2)},
          #fff ${px2rem(6)});

          &::before {
            position: absolute;
            content: "";
            display: block;
            height: 100%;
            width: 100%;
            background-color: white;
            z-index: 0;
          }

          & > div {
            background-color: var(--inactive-color);
            padding: ${px2rem(12)};
            border: none;
            border-radius: ${px2rem(10)};
            z-index: 1;

            & > header {
              justify-content: space-between;

              & > span {
                font-size: ${px2rem(14)};
              }
            }
          }
        }

        ${mobileMessageBlocks()};
      }
    }
  }

  & > footer {
    display: flex;
    flex-direction: row;
    gap: ${px2rem(8)};
  }
`;
const StyledButtonPanel: StyledComponent<any, any> = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(10)};

  & > button {
    & > svg {
      ${size(px2rem(16))};
    }

    &:nth-of-type(2) {
      margin-right: ${px2rem(20)};

      & > svg {
        transform: scaleX(-1);
      }
    }
  }
`;
const linkifyOptions = {
  defaultProtocol: "https",
  target: "_blank",
};
const MessageId: NextPage<TPageProps> = ({ isLg }) => {
  const [pending, setPending] = useState(true);
  const [decryptButtonPending, setDecryptButtonPending] = useState(false);
  const { readers } = useStore((store) => store);
  const [files, setFiles] = useState<IFile[]>([]);
  const [filesData, setFilesData] = useState<string[]>([]);
  const [encryptedMessage, setEncryptedMessage] = useState<IMessageContent | IMessageCorruptedContent | null>(null);
  const { message } = useStore((store) => store);
  const { locale, push, query: { messageId } } = useRouter();
  const uint8array = (props: string) => new TextEncoder().encode(props);
  const downloadBlob = async (file: File) => {
    const data = window.URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = data;
    link.download = file.name;
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      }),
    );
    window.URL.revokeObjectURL(data);
    link.remove();
  };
  const handleFileClick = useCallback(async (file: IFile) => {
    const response = await fetch(file.url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
    });
    const blob: Blob = await response.blob();
    const buf: ArrayBuffer = await new Response(blob).arrayBuffer();
    return await downloadBlob(new File([
      new Blob([
        symmetricDecrypt(
          new Uint8Array(buf),
          uint8array(message?.decryptedContent.content.filesKey),
        ),
      ]),
    ], file.name));
  }, []);
  const handleReplyClick = useCallback(() => {
    void push({
      pathname: routes.compose,
      query: {
        to: message?.link?.senderAddress,
        subject: message?.decryptedContent?.subject,
      },
    });
  }, [push, message]);
  const handleDecryptClick = useCallback(() => {
    if (encryptedMessage) {
      setDecryptButtonPending(true);
      console.log(encryptedMessage);
      //messageDecryptById(encryptedMessage);
    }
  }, [encryptedMessage]);

  useEffect(() => {
    if (message?.decryptedContent) {
      if (message.decryptedContent.content?.files?.length) {
        message.decryptedContent.content.files.map((item: any) => {
          const fileName = item.name.replaceAll(" ", "-");
          const extension = fileName.split(".")[1].toLowerCase();
          let type: EFileType;

          switch (extension) {
            case "png":
              type = EFileType.Png;
              break;

            case "jpg":
            case "jpeg":
              type = EFileType.Jpg;
              break;

            case "gif":
              type = EFileType.Gif;
              break;

            case "pdf":
              type = EFileType.Pdf;
              break;

            case "docx":
            case "doc":
              type = EFileType.Docx;
              break;

            case "xlsx":
            case "xls":
              type = EFileType.Xlsx;
              break;
          }

          setFiles((prev: IFile[]) => [
            ...prev,
            {
              name: fileName,
              type,
              url: item.image_url,
            },
          ]);
        });
      }

      setPending(false);
    }
  }, [message]);
  useEffect(() => {
    if (readers?.[0] && messageId && !message) {
      (
        async () => {
          const encryptedMessageContent = await readers?.[0]?.retrieveMessageContentByMsgId(messageId as Uint256);
          setEncryptedMessage(encryptedMessageContent);
          setPending(false);
        }
      )();
    }
  }, [readers, messageId, message]);

  return (
    <>
      {!isLg && (
        <MobileLayout withBack={true}>
          <Head>
            <title>
              {intl(locale).formatMessage({
                id: "inbox",
                defaultMessage: "Inbox",
              })} - {appConfig.data.title}
            </title>
          </Head>
          <MobileStyledContainer>
            {pending && <Preloader size={200} />}
            {!pending && !message && (
              <section>
                <Icon name={EIcon.Lock} />
                <FormattedMessage id="encrypted-message" defaultMessage="This message is encrypted" tagName="p" />
                <Button primary={true}
                  size={EButtonSize.Small}
                  pending={decryptButtonPending}
                  onClick={handleDecryptClick}>
                  <FormattedMessage id="decrypt-message" defaultMessage="Decrypt message" tagName="span" />
                </Button>
              </section>
            )}
            {!pending && !!message && (
              <>
                <header>
                  <section>
                    {/* <Button>
                     <Icon name={EIcon.UncheckedBookmark} />
                     </Button>
                     <Button>
                     <Icon name={EIcon.Archive} />
                     </Button>
                     <Button>
                     <Icon name={EIcon.AddFolder} />
                     </Button> */}
                  </section>
                  <section>
                    <h1>{message?.decryptedContent.subject}</h1>
                    {/* <button>
                     <Icon name={EIcon.Bookmarks} />
                     </button> */}
                  </section>
                  <p>{message && getDateFormat(message?.time, "dd.LL.yyyy, HH:mm")} ({message &&
                    ago(message?.time, locale)})</p>
                </header>
                <div>
                  <div>
                    <Avatar color="#FFDB80" symbol=":)" size={32} />
                    <strong>{message?.link.senderAddress.substring(
                      0,
                      15,
                    )} ... {message?.link.senderAddress.slice(-5)}</strong>
                    {/* <DropDown>
                     <AddContactMenu onAddClick={handleAddContactClick} />
                     </DropDown> */}
                  </div>
                  <div>
                    {/* <Pin color="#00CB08" size={8} /> */}
                    <ul>
                      <li>
                        <Icon name={EIcon.Chain} />
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <article>
                    {/* <header>
                     <strong>Dude from pub</strong>
                     <span>10.07.2022, 10:24 PM </span>
                     </header> */}
                    <Linkify options={linkifyOptions} tagName="pre">{message?.decryptedContent.content.body}</Linkify>
                  </article>
                  <div>
                    <FilesForm
                      editable={false}
                      isLg={isLg}
                      files={files}
                      setFiles={setFiles}
                      filesData={filesData}
                      filesStatuses={null}
                      setFilesData={setFilesData}
                      onClick={handleFileClick} />
                  </div>
                </div>
                <footer>
                  <Button onClick={handleReplyClick}>
                    <Icon name={EIcon.Reply} />
                    <FormattedMessage id="reply" defaultMessage="Reply" tagName="span" />
                  </Button>
                  {/*<Button>
                   <Icon name={EIcon.Reply} />
                   <FormattedMessage id="forward" defaultMessage="Forward" tagName="span" />
                   </Button>*/}
                </footer>
              </>
            )}
          </MobileStyledContainer>
        </MobileLayout>
      )}
      {isLg && (
        <DashboardLayout>
          <Head>
            <title>
              {intl(locale).formatMessage({
                id: "inbox",
                defaultMessage: "Inbox",
              })} - {appConfig.data.title}
            </title>
          </Head>
          <ContentHeader withBack={true}>
            <StyledButtonPanel>
              <Button disabled={pending || !message} onClick={handleReplyClick}>
                <Icon name={EIcon.Reply} />
                <FormattedMessage id="reply" defaultMessage="Reply" tagName="span" />
              </Button>
              {/*<Button>
               <Icon name={EIcon.Reply} />
               <FormattedMessage id="forward" defaultMessage="Forward" tagName="span" />
               </Button>
               <Button>
               <Icon name={EIcon.UncheckedBookmark} />
               </Button>
               <Button>
               <Icon name={EIcon.Archive} />
               </Button>
               <Button>
               <Icon name={EIcon.AddFolder} />
               </Button>*/}
            </StyledButtonPanel>
          </ContentHeader>
          <StyledContainer>
            {pending && <Preloader size={200} />}
            {!pending && !message && (
              <section>
                <Icon name={EIcon.Lock} />
                <FormattedMessage id="encrypted-message" defaultMessage="This message is encrypted" tagName="p" />
                <Button primary={true}
                  size={EButtonSize.Big}
                  pending={decryptButtonPending}
                  onClick={handleDecryptClick}>
                  <FormattedMessage id="decrypt-message" defaultMessage="Decrypt message" tagName="span" />
                </Button>
              </section>
            )}
            {!pending && !!message && (
              <div>
                <header>
                  <h1>{message?.decryptedContent.subject}</h1>
                </header>
                <section>
                  <div>
                    <Avatar color="#FFDB80" symbol=":)" />
                    <strong>
                      {message?.link.senderAddress.substring(0, 15)}
                      ...
                      {message?.link.senderAddress.slice(-5)}
                    </strong>
                    {/* <DropDown>
                     <AddContactMenu onAddClick={handleAddContactClick} />
                     </DropDown> */}
                  </div>
                  <div>
                    <ul>
                      {/* <li>
                       <FormattedMessage id="multiple-addresses" defaultMessage="Multiple addresses" tagName="span" />
                       </li> */}
                      <li>
                        <Icon name={EIcon.Chain} />
                        <FormattedMessage
                          id="everscale"
                          defaultMessage="EverScale"
                          tagName="span" />
                      </li>
                    </ul>
                    <span>{message && getDateFormat(message?.time, "dd.LL.yyyy, HH:mm")} ({message &&
                      ago(message?.time, locale)})</span>
                    {/* <Pin color="#00CB08" size={10} /> */}
                  </div>
                </section>
                <article>
                  {/* <header>
                   <strong>Dude from pub</strong>
                   <span>10.07.2022, 10:24 PM </span>
                   </header> */}
                  <Linkify options={linkifyOptions} tagName="pre">{message?.decryptedContent.content.body}</Linkify>
                </article>
                <div>
                  <FilesForm
                    editable={false}
                    isLg={isLg}
                    files={files}
                    setFiles={setFiles}
                    filesData={filesData}
                    filesStatuses={null}
                    setFilesData={setFilesData}
                    onClick={handleFileClick} />
                </div>
              </div>
            )}
          </StyledContainer>
        </DashboardLayout>
      )}
    </>
  );
};

export default memo(MessageId);
