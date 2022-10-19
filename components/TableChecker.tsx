import { FunctionComponent, useCallback, useRef } from "react";
import styled, { StyledComponent } from "styled-components";
import Checkbox from "./Checkbox";
import MenuContainer from "./menus/MenuContainer";
import { useClickAway, useToggle } from "ahooks";
import ECheckboxStatus from "../models/enums/ECheckboxStatus";
import { px2rem } from "../common/lib";
import { size, transparentize } from "polished";
import Icon from "./Icon";
import EIcon from "../models/enums/EIcon";
import TableCheckerMenu from "./menus/TableCheckerMenu";

type TTableChecker = {
  checkboxStatus: ECheckboxStatus;
  onAllCheck: () => void;
  onCheck: () => void;
  onNoneCheck: () => void;
};

const StyledContainer: StyledComponent<any, any> = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--inactive-color);
  border: none;
  border-radius: ${px2rem(8)};
  padding: ${px2rem(10)} ${px2rem(6)};

  & > button {
    &:nth-of-type(1) {
      border-color: ${transparentize(.7, "#202020")};

      & > svg {
        fill: ${transparentize(.5, "#202020")};
      }
    }

    &:nth-of-type(2) {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border: none;
      padding: ${px2rem(6)} ${px2rem(4)};
      cursor: pointer;
      padding-left: ${px2rem(8)};

      & > svg {
        ${size(px2rem(10))};
        fill: ${transparentize(.5, "#202020")};
      }
    }
  }

  & > div {
    top: ${px2rem(42)};
    left: 0;
  }
`;
const TableChecker: FunctionComponent<TTableChecker> = ({ checkboxStatus, onAllCheck, onCheck, onNoneCheck }) => {
  const [open, { toggle, set }] = useToggle(false);
  const ref = useRef(null);
  const handleCheckboxClick = useCallback(() => {
    set(false);
    onCheck();
  }, [onCheck, set]);
  const handleAllClick = useCallback(() => {
    set(false);
    onAllCheck();
  }, [onAllCheck, set]);
  const handleNoneClick = useCallback(() => {
    set(false);
    onNoneCheck();
  }, [onNoneCheck, set]);
  const handleButtonClick = () => {
    toggle();
  };

  useClickAway(() => {
    if (open) {
      toggle();
    }
  }, ref);

  return (
    <StyledContainer ref={ref}>
      <Checkbox status={checkboxStatus} onCheck={handleCheckboxClick} />
      <button onClick={handleButtonClick}>
        <Icon name={EIcon.Arrow} />
      </button>
      <MenuContainer open={open} ref={ref}>
        <TableCheckerMenu onAllClick={handleAllClick} onNoneClick={handleNoneClick} />
      </MenuContainer>
    </StyledContainer>
  );
};

export default TableChecker;
