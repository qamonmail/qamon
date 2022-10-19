import { FunctionComponent } from "react";
import Icon from "./Icon";
import EIcon from "../models/enums/EIcon";
import styled, { StyledComponent } from "styled-components";
import { size } from "polished";
import { px2rem } from "../common/lib";

type TLockSwitcherProps = {
  locked: boolean;
  onToggle: () => void;
};

const StyledSwitcher: StyledComponent<any, any> = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${size(px2rem(40), px2rem(80))};
  background-color: var(--inactive-color);
  border: none;
  border-radius: ${px2rem(10)};
  cursor: pointer;
  padding: ${px2rem(4)};
  margin-left: ${px2rem(20)};

  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    ${size(px2rem(32))};
    border-radius: ${px2rem(8)};

    & > svg {
      ${size(px2rem(16))};
    }

    &:nth-of-type(1) {
      opacity: ${({ locked }: TLockSwitcherProps) => locked ? .15 : 1};
      background-color: white;

      & > svg {
        fill: var(--active-color);
      }
    }

    &:nth-of-type(2) {
      opacity: ${({ locked }: TLockSwitcherProps) => locked ? 1 : .15};
      background-color: ${({ locked }: TLockSwitcherProps) => locked ? "var(--active-color)" : "transparent"};

      & > svg {
        fill: ${({ locked }: TLockSwitcherProps) => locked ? "var(--inactive-color)" : "var(--active-color)"};
      }
    }
  }
`;
const LockSwitcher: FunctionComponent<TLockSwitcherProps> = ({ locked, onToggle }) => {
  return (
    <StyledSwitcher locked={locked} onClick={onToggle}>
      <span>
        <Icon name={EIcon.Unlock} />
      </span>
      <span>
        <Icon name={EIcon.Lock} />
      </span>
    </StyledSwitcher>
  );
};

export default LockSwitcher;
