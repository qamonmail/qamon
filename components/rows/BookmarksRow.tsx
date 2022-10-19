import { FunctionComponent, useCallback } from "react";
import styled, { StyledComponent } from "styled-components";
import Icon from "../Icon";
import EIcon from "../../models/enums/EIcon";
import Avatar from "../Avatar";
import Checkbox from "../Checkbox";
import ECheckboxStatus from "../../models/enums/ECheckboxStatus";
import Pin from "../Pin";
import { px2rem } from "../../common/lib";
import { size } from "polished";
import Button from "../buttons/Button";

type TBookmarksRow = {
  checked: boolean;
  avatarColor: string;
  name: string;
  subject: string;
  text: string;
  folders?: string[];
  date: string;
  clickable: boolean;
  encrypted: boolean;
  onRowClick: () => void;
  onBookmarkClick: () => void;
  onCheckboxClick: () => void;
  onDecodeClick: () => void;
};

const StyledRow: StyledComponent<any, any> = styled.tr`
  cursor: ${({ clickable }: TBookmarksRow) => clickable ? "pointer" : "default"};

  & > td {
    height: ${px2rem(80)};

    &:nth-of-type(1) {
      position: relative;
      padding-left: ${px2rem(36)};
      width: ${px2rem(120)};

      & > button {
        &:nth-of-type(1) {
          position: absolute;
          display: block;
          top: ${px2rem(32)};
          left: ${px2rem(8)};
          background: none;
          border: none;
          cursor: pointer;

          & > svg {
            ${size(px2rem(16))};
            fill: var(--orange-color);
          }
        }

        &:nth-of-type(2) {
          border-color: transparent;
          background-color: white;
        }
      }

      & > div {
        position: absolute;
        top: ${px2rem(15)};
        left: ${px2rem(30)};
      }
    }

    &:nth-of-type(2) {
      width: ${px2rem(200)};

      & > strong {
        font-weight: 400;
      }
    }

    &:nth-of-type(3) {
      width: ${px2rem(200)};

      & > strong {
        font-weight: 400;
      }
    }

    &:nth-of-type(4) {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px;
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
      width: ${px2rem(100)};
    }

    &:nth-of-type(n + 3) {
      filter: ${({ encrypted }: TBookmarksRow) => encrypted ? `blur(${px2rem(6)})` : "none"};
    }

    &:nth-of-type(7) {
      width: 0;
      position: relative;
      filter: none;

      & > button {
        display: ${({ encrypted }: TBookmarksRow) => encrypted ? "block" : "none"};
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
const BookmarksRow: FunctionComponent<TBookmarksRow> = ({
  checked,
  avatarColor,
  name,
  subject,
  text,
  folders,
  date,
  clickable,
  encrypted,
  onRowClick,
  onBookmarkClick,
  onCheckboxClick,
  onDecodeClick
}) => {
  const handleBookmarkClick = useCallback((e: any) => {
    e.stopPropagation();
    onBookmarkClick();
  }, [onBookmarkClick]);
  return (
    <StyledRow data-checked={checked} encrypted={encrypted} clickable={clickable} onClick={onRowClick}>
      <td>
        <button data-active={true} onClick={handleBookmarkClick}>
          <Icon name={EIcon.CheckedBookmark} />
        </button>
        <Avatar color={avatarColor} symbol={name[0]} />
        <Checkbox status={checked ? ECheckboxStatus.Checked : ECheckboxStatus.Unchecked} onCheck={onCheckboxClick} />
      </td>
      <td>
        <strong>{name}</strong>
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
        <Button onClick={onDecodeClick}>
          <Icon name={EIcon.Unlock} />
        </Button>
      </td>
    </StyledRow>
  );
};

export default BookmarksRow;
