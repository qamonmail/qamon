import { FunctionComponent } from "react";
import styled, { StyledComponent } from "styled-components";
import { px2rem } from "../common/lib";
import { size, transitions, transparentize } from "polished";

type TSwitcherProps = {
  value: boolean;
  onSwitch: () => void;
};

const StyledButton: StyledComponent<any, any> = styled.button`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${px2rem(37)};
  height: ${px2rem(24)};
  background-color: ${transparentize(.6, "#202020")};
  border: none;
  border-radius: ${px2rem(12)};
  cursor: pointer;
  ${transitions("background-color .15s")};

  &::before {
    content: "";
    position: absolute;
    ${size(px2rem(20))};
    border: none;
    border-radius: ${px2rem(10)};
    background-color: var(--inactive-color);
    left: ${px2rem(2)};
    ${transitions("left .15s", "width .15s")};
  }

  &[data-value="true"] {
    background-color: var(--active-color);

    &::before {
      left: ${px2rem(15)};
    }

    &:active::before {
      left: ${px2rem(12)};
    }
  }

  &:active {
    transform: none !important;

    &::before {
      width: ${px2rem(23)};
    }
  }
`;
const Switcher: FunctionComponent<TSwitcherProps> = ({ value, onSwitch }) => {
  return (
    <StyledButton data-value={value} onClick={onSwitch} />
  );
};

export default Switcher;
