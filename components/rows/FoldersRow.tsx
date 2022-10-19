import { FunctionComponent } from "react";
import styled, { StyledComponent } from "styled-components";
import Icon from "../Icon";
import EIcon from "../../models/enums/EIcon";
import Checkbox from "../Checkbox";
import ECheckboxStatus from "../../models/enums/ECheckboxStatus";
import { px2rem } from "../../common/lib";
import { size } from "polished";
import Button from "../buttons/Button";
import { FormattedMessage } from "react-intl";
import Pin from "../Pin";

type TFoldersRow = {
  checked: boolean,
  description: string,
  pinColor: string,
  pinned: boolean,
  title: string,
  onCheckboxClick: () => void,
  onPinClick: () => void,
  onEditClick: () => void
  onRowClick: () => void;
};

const StyledRow: StyledComponent<any, any> = styled.tr`
  cursor: pointer;

  & > td:nth-of-type(1) {
    padding-left: ${px2rem(36)};
    width: ${px2rem(90)};

    & > button {
      display: none;
      border-color: transparent;
      background-color: white;
    }

    & > div {
      display: inline-block;
      margin: ${px2rem(2)} 0 0 ${px2rem(3)};
    }
  }

  & > td:nth-of-type(2) {
    width: ${px2rem(200)};
  }

  & > td:nth-of-type(4) {
    width: ${px2rem(300)};

    & > div {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      gap: ${px2rem(20)};
      margin-right: ${px2rem(30)};

      & > button {

        & > svg {
          ${size(px2rem(16))};
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

  &:hover > td:nth-of-type(1) {
    & > button {
      display: inline-block;
    }

    & > div {
      display: none;
    }
  }
`;
const FoldersRow: FunctionComponent<TFoldersRow> = ({
  checked,
  description,
  pinColor,
  pinned,
  title,
  onCheckboxClick,
  onPinClick,
  onEditClick,
  onRowClick
}) => {
  return (
    <StyledRow data-checked={checked} onClick={onRowClick}>
      <td>
        <Pin color={pinColor} size={14} />
        <Checkbox status={checked ? ECheckboxStatus.Checked : ECheckboxStatus.Unchecked} onCheck={onCheckboxClick} />
      </td>
      <td>
        <strong>{title}</strong>
      </td>
      <td>
        <span>{description}</span>
      </td>
      <td>
        <div>
          <Button primary={pinned} onClick={onPinClick}>
            <Icon name={EIcon.Pin} />
          </Button>
          <Button onClick={onEditClick}>
            <Icon name={EIcon.Edit} />
            <FormattedMessage id="edit" defaultMessage="Edit" tagName="span" />
          </Button>
        </div>
      </td>
    </StyledRow>
  );
};

export default FoldersRow;
