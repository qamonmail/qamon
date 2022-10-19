import { FunctionComponent } from "react";
import styled, { StyledComponent } from "styled-components";
import Icon from "../Icon";
import EIcon from "../../models/enums/EIcon";
import Avatar from "../Avatar";
import Checkbox from "../Checkbox";
import ECheckboxStatus from "../../models/enums/ECheckboxStatus";
import { px2rem } from "../../common/lib";
import { size } from "polished";
import Button from "../buttons/Button";
import { FormattedMessage } from "react-intl";

type TContactsRow = {
  checked: boolean;
  address: string;
  avatarColor: string;
  pinned: boolean;
  name: string;
  onRowClick: () => void;
  onCheckboxClick: () => void,
  onPinClick: () => void,
  onSendMessageClick: () => void
};

const StyledRow: StyledComponent<any, any> = styled.tr`
  cursor: pointer;

  & > td {
    &:nth-of-type(1) {
      position: relative;
      padding-left: ${px2rem(36)};
      width: ${px2rem(120)};

      & > button {
        display: none;
        border-color: transparent;
        background-color: white;
      }

      & > div {
        position: absolute;
        top: ${px2rem(15)};
        left: ${px2rem(30)};
      }
    }

    &:nth-of-type(2) {
      width: ${px2rem(200)};
    }

    &:nth-of-type(3) {
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: ${px2rem(150)};
    }

    &:nth-of-type(4) {
      width: ${px2rem(300)};

      & > div {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: ${px2rem(20)};
        margin-right: ${px2rem(30)};

        & > button {
          & > svg {
            ${size(px2rem(12))};
          }

          &:nth-of-type(1) {
            width: ${px2rem(40)};
            padding: 0;

            & > svg {
              ${size(px2rem(18))};
            }
          }
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
const SentRow: FunctionComponent<TContactsRow> = ({
  checked,
  address,
  avatarColor,
  pinned,
  name,
  onRowClick,
  onCheckboxClick,
  onPinClick,
  onSendMessageClick
}) => {
  return (
    <StyledRow data-checked={checked} onClick={onRowClick}>
      <td>
        <Avatar color={avatarColor} symbol={name[0]} />
        {/*<Checkbox status={checked ? ECheckboxStatus.Checked : ECheckboxStatus.Unchecked} onCheck={onCheckboxClick} />*/}
      </td>
      <td>
        <strong>{name}</strong>
      </td>
      <td>
        <span>{address}</span>
      </td>
      <td>
        <div>
          <Button primary={pinned} onClick={onPinClick}>
            <Icon name={EIcon.Pin} />
          </Button>
          <Button onClick={onSendMessageClick}>
            <Icon name={EIcon.SendMail} />
            <FormattedMessage id="send-message" defaultMessage="Send message" tagName="span" />
          </Button>
        </div>
      </td>
    </StyledRow>
  );
};

export default SentRow;
