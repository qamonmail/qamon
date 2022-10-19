import styled, { StyledComponent } from "styled-components";
import { px2rem } from "../../common/lib";
import { FunctionComponent } from "react";
import { FormattedMessage } from "react-intl";

type TTableCheckerMenuProps = {
  onAllClick: () => void;
  onNoneClick: () => void;
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
    width: ${px2rem(100)};

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
const TableCheckerMenu: FunctionComponent<TTableCheckerMenuProps> = ({ onAllClick, onNoneClick }) => {
  return (
    <StyledContainer>
      <button onClick={onAllClick}>
        <FormattedMessage id="all" defaultMessage="All" tagName="span" />
      </button>
      <button onClick={onNoneClick}>
        <FormattedMessage id="clear" defaultMessage="Clear" tagName="span" />
      </button>
    </StyledContainer>
  );
};

export default TableCheckerMenu;
