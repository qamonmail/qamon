import { FunctionComponent, useCallback, useState } from "react";
import styled, { StyledComponent } from "styled-components";
import Icon from "../Icon";
import EIcon from "../../models/enums/EIcon";
import Avatar from "../Avatar";
import Pin from "../Pin";
import { px2rem } from "../../common/lib";
import { size, transparentize } from "polished";
import Button from "../buttons/Button";
import { useMitt } from "react-mitt";
import EEventType from "../../models/enums/EEventType";

type TInboxRow = {
  attachments?: File[];
  avatarColor: string;
  bookmarked: boolean;
  checked: boolean;
  clickable: boolean;
  date: string;
  encrypted: boolean;
  folders?: string[];
  isLg: boolean;
  name: string;
  onBookmarkClick: () => void;
  onCheckboxClick: () => void;
  onDecodeClick: () => void;
  onRowClick: () => void;
  subject?: string;
  text?: string;
};

const StyledRow: StyledComponent<any, any> = styled.tr`
  cursor: ${({ clickable }: TInboxRow) => clickable ? "pointer" : "default"};

  & > td {
    height: ${({ withAttachments }: any) => withAttachments ? px2rem(98) : px2rem(80)};

    &:nth-of-type(1) {
      position: relative;
      padding-left: ${px2rem(36)};
      min-width: ${px2rem(85)};
      overflow: hidden;

      & > button {
        &:nth-of-type(1) {
          position: absolute;
          display: none;
          top: ${px2rem(32)};
          left: ${px2rem(8)};
          background: none;
          border: none;
          cursor: pointer;

          & > svg {
            ${size(px2rem(16))};
            fill: ${transparentize(.65, "#202020")};
          }

          &[data-active="true"] {
            display: block;

            & > svg {
              fill: var(--orange-color);
            }
          }
        }

        &:nth-of-type(2) {
          border-color: transparent;
          background-color: white;
        }
      }

      & > div {
        position: absolute;
        top: ${({ withAttachments }: any) => withAttachments ? px2rem(30) : px2rem(20)};
        left: ${px2rem(30)};
      }
    }

    &:nth-of-type(2) {
      position: relative;
      min-width: ${px2rem(180)};

      & > strong {
        font-weight: 400;
      }

      & > ul {
        position: absolute;
        display: flex;
        flex-direction: row;
        gap: ${px2rem(5)};
        top: ${px2rem(74)};
        left: ${px2rem(185)};

        & > li {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: ${px2rem(6)};
          height: ${px2rem(24)};
          border: ${px2rem(1)} solid ${transparentize(.9, "#202020")};
          border-radius: ${px2rem(12)};
          min-width: ${px2rem(24)};
          padding: 0 ${px2rem(8)};

          & > div {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: ${px2rem(13.35)};

            & > svg {
              position: absolute;

              &:nth-of-type(1) {
                ${size(px2rem(9))};
              }

              &:nth-of-type(2) {
                ${size(px2rem(16), px2rem(13.35))};
              }
            }
          }

          & > span {
            font-size: ${px2rem(11)};
            font-weight: 400;
            color: ${transparentize(.5, "#202020")};
            white-space: nowrap;
            max-width: ${px2rem(100)};
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }

    &:nth-of-type(3) {
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: ${px2rem(180)};
      max-width: ${px2rem(150)};
    }

    &:nth-of-type(4) {
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: calc(100vw - ${px2rem(1035)});
      width: calc(100vw - ${px2rem(1035)});
    }

    &:nth-of-type(5) {
      position: relative;
      width: ${px2rem(150)};
      text-align: center;

      & > div {
        height: 100%;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: ${px2rem(10)};
        top: 0;
        left: ${px2rem(50)};
      }
    }

    &:nth-of-type(6) {
      width: ${px2rem(200)};
      text-align: right;
      padding-right: ${px2rem(20)};
    }

    &:nth-of-type(n + 3) {
      filter: ${({ encrypted }: TInboxRow) => encrypted ? `blur(${px2rem(6)})` : "none"};
    }

    &:nth-of-type(7) {
      width: 0;
      position: relative;
      filter: none;

      & > button {
        display: ${({ encrypted }: TInboxRow) => encrypted ? "block" : "none"};
        position: absolute;
        top: ${px2rem(20)};
        right: 25vw;
        width: ${px2rem(80)};
        background-color: #E9E9E6;

        & > svg {
          ${size(px2rem(16))};
        }
      }
    }
  }

  &:hover > td:nth-of-type(1) {
    & > button {
      &:nth-of-type(1) {
        display: block;
      }
    }

    & > div {
      display: none;
    }
  }
`;
const StyledMobileRow: StyledComponent<any, any> = styled.article`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(8)};
  padding: ${px2rem(9)} ${px2rem(16)};
  background-color: ${({ checked }: TInboxRow) => checked ? "#f7f7ee" : "transparent"};

  & > section {
    &:nth-of-type(1) {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${px2rem(4)};

      & > button {
        &:nth-of-type(1) {
          display: flex;
          justify-content: center;
          align-items: center;
          border: none;
          border-radius: ${px2rem(19)};
          background-color: ${({ checked }: TInboxRow) => checked ? "#484848" : "transparent"};
          ${size(px2rem(38))};

          & > div {
            display: ${({ checked }: TInboxRow) => checked ? "none" : "flex"};
          }

          & > svg {
            display: ${({ checked }: TInboxRow) => checked ? "block" : "none"};
            ${size(12)};
            fill: white;
          }
        }

        &:nth-of-type(2) {
          background: none;
          border: none;

          & > svg {
            ${size(px2rem(11))};
            fill: ${({ bookmarked }: TInboxRow) => bookmarked ? "#ff8d4c" : transparentize(.5, "#202020")};
          }
        }

        &:nth-of-type(3) {
          position: absolute;
          right: ${px2rem(16)};
          width: ${px2rem(62)};
          z-index: 10;
        }
      }
    }

    &:nth-of-type(2) {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: ${px2rem(4)};

      & > header {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        & > strong {
          font-size: ${px2rem(12)};
          font-weight: 700;
          word-break: break-all;
        }

        & > div {
          display: flex;
          flex-direction: row;
          gap: ${px2rem(5)};

          & > svg {
            display: ${({ encrypted }: TInboxRow) => encrypted ? "none" : "block"};
            ${size(px2rem(12))};
          }

          & > div {
            display: flex;
            flex-direction: row;
            gap: ${px2rem(4)};
            filter: ${({ encrypted }: TInboxRow) => encrypted ? `blur(${px2rem(3)})` : "none"};
          }

          & > span {
            font-size: ${px2rem(11)};
            font-weight: 400;
            color: ${transparentize(.7, "#202020")};
            filter: ${({ encrypted }: TInboxRow) => encrypted ? `blur(${px2rem(3)})` : "none"};
          }
        }
      }

      & > div {
        display: flex;
        flex-direction: column;
        gap: ${px2rem(4)};

        & > strong {
          font-size: ${px2rem(11)};
          font-weight: 400;
          filter: ${({ encrypted }: TInboxRow) => encrypted ? `blur(${px2rem(3)})` : "none"};
          word-break: break-all;
        }

        & > span {
          display: -webkit-box;
          max-width: 100%;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          word-break: break-all;
          font-size: ${px2rem(11)};
          font-weight: 400;
          color: ${transparentize(.5, "#202020")};
          line-height: ${px2rem(13)};
          filter: ${({ encrypted }: TInboxRow) => encrypted ? `blur(${px2rem(3)})` : "none"};
        }
      }
    }
  }
`;
const InboxRow: FunctionComponent<TInboxRow> = ({
  attachments,
  avatarColor,
  bookmarked,
  checked,
  clickable,
  date,
  encrypted,
  folders,
  isLg,
  name,
  onBookmarkClick,
  onCheckboxClick,
  onDecodeClick,
  onRowClick,
  subject,
  text,
}) => {
  const [pending, setPending] = useState(false);
  const { emitter } = useMitt();
  const handleBookmarkClick = useCallback((e: any) => {
    e.stopPropagation();
    onBookmarkClick();
  }, [onBookmarkClick]);
  const handleAvatarClick = useCallback((e: any) => {
    e.stopPropagation();
    //onCheckboxClick();
  }, [onCheckboxClick]);
  const handleClick = useCallback(() => {
    if (clickable) {
      onRowClick();
    } else {
      emitter.emit(EEventType.ShowEncryptedMessageWindow);
    }
  }, [clickable]);
  const handleDecodeClick = useCallback(() => {
    if (!pending) {
      setPending(true);
      setTimeout(() => {
        onDecodeClick();
        setPending(false);
      }, 1000);
    }
  }, [onDecodeClick]);

  return (
    <>
      {isLg && (
        <StyledRow
          data-checked={checked}
          encrypted={encrypted}
          clickable={clickable}
          withAttachments={!!attachments && attachments?.length > 0}
          onClick={handleClick}>
          <td>
            {/*<button data-active={bookmarked} onClickCapture={handleBookmarkClick}>
             {!bookmarked && <Icon name={EIcon.UncheckedBookmark} />}
             {bookmarked && <Icon name={EIcon.CheckedBookmark} />}
             </button>*/}
            <Avatar color={avatarColor} symbol={isNaN(+name[0]) ? name[0] : ":)"} />
            {/* <Checkbox status={checked ? ECheckboxStatus.Checked : ECheckboxStatus.Unchecked}
             onCheck={onCheckboxClick} /> */}
          </td>
          <td>
            <strong>{name}</strong>
            <ul>
              {!!attachments && attachments.length > 0 && attachments.slice(0, 3).map((file, i) => (
                <li key={i}>
                  <div>
                    <Icon name={EIcon.Attach} />
                    <Icon name={EIcon.File} />
                  </div>
                  <span>{file.name}</span>
                </li>
              ))}
              {!!attachments && attachments.length > 3 && (
                <li>
                  <span>+{attachments.length - 3}</span>
                </li>
              )}
            </ul>
          </td>
          <td>
            <strong>{subject}</strong>
          </td>
          <td>
            <span>{text}</span>
          </td>
          <td>
            <div>
              {folders?.map((color: string, i: number) => <Pin key={i} color={color} size={10} />)}
            </div>
          </td>
          <td>
            <span>{date}</span>
          </td>
          <td>
            <Button pending={pending} onClick={handleDecodeClick}>
              <Icon name={EIcon.Unlock} />
            </Button>
          </td>
        </StyledRow>
      )}
      {!isLg && (
        <StyledMobileRow
          data-checked={checked}
          checked={checked}
          bookmarked={bookmarked}
          encrypted={encrypted}
          clickable={clickable}
          onClick={handleClick}>
          <section>
            <button onClick={handleAvatarClick}>
              <Avatar color={avatarColor} size={38} symbol={isNaN(+name[0]) ? name[0] : ":)"} />
              <Icon name={EIcon.CheckedCheckbox} />
            </button>
            <button data-active={bookmarked} onClick={handleBookmarkClick}>
              {/* {!bookmarked && <Icon name={EIcon.UncheckedBookmark} />}
               {bookmarked && <Icon name={EIcon.CheckedBookmark} />} */}
            </button>
            {encrypted && (
              <Button pending={pending} onClick={handleDecodeClick}>
                <Icon name={EIcon.Unlock} />
              </Button>
            )}
          </section>
          <section>
            <header>
              <strong>{name}</strong>
              <div>
                {!!attachments && attachments.length > 0 && <Icon name={EIcon.Attach} />}
                <div>
                  {folders?.map((color: string, i: number) => <Pin key={i} color={color} size={10} />)}
                </div>
                <span>{date}</span>
              </div>
            </header>
            <div>
              <strong>{subject}</strong>
              <span>{text}</span>
            </div>
          </section>
        </StyledMobileRow>
      )}
    </>
  );
};

export default InboxRow;
