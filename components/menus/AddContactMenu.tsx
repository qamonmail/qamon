import styled, { StyledComponent } from "styled-components";
import { px2rem } from "../../common/lib";
import { FunctionComponent } from "react";
import { FormattedMessage } from "react-intl";
import Icon from "../Icon";
import EIcon from "../../models/enums/EIcon";
import { size } from "polished";

type TAddContactMenuProps = {
  onAddClick: () => void;
};

const StyledContainer: StyledComponent<any, any> = styled.div`
  display: flex;
  flex-direction: column;

  & button {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${px2rem(10)};
    padding: ${px2rem(10)};
    cursor: pointer;
    background-color: transparent;
    border: none;

    & > svg {
      ${size(px2rem(10))};
    }

    & > span {
      font-size: ${px2rem(14)};
      font-weight: 400;
    }

    &:hover,
    &[data-active="true"] {
      background-color: #F7F7EE;
    }
  }
`;
const AddContactMenu: FunctionComponent<TAddContactMenuProps> = ({ onAddClick }) => {
  return (
    <StyledContainer>
      <button onClick={onAddClick}>
        <Icon name={EIcon.Plus} />
        <FormattedMessage id="add-contact" defaultMessage="Add contact" tagName="span" />
      </button>
    </StyledContainer>
  );
};

export default AddContactMenu;
