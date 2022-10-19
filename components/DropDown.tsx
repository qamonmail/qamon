import { FunctionComponent, useEffect, useRef } from "react";
import { useClickAway, useToggle } from "ahooks";
import styled, { StyledComponent } from "styled-components";
import { size } from "polished";
import { useMitt } from "react-mitt";
import Icon from "./Icon";
import EIcon from "../models/enums/EIcon";
import MenuContainer from "./menus/MenuContainer";
import { px2rem } from "../common/lib";
import EEventType from "../models/enums/EEventType";

type TDropDownProps = {
  children: any;
  title?: any;
};

const StyledDropdown: StyledComponent<any, any> = styled.div`
  & > button {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: none;
    border: none;
    gap: ${px2rem(6)};
    cursor: pointer;
    transform: none !important;

    & > span {
      font-size: ${px2rem(18)};
      font-weight: 400;
      text-decoration: underline;
    }

    & > svg {
      ${size(px2rem(10))};
    }
  }
`;
const DropDown: FunctionComponent<TDropDownProps> = ({ children, title }) => {
  const [open, { toggle, set }] = useToggle(false);
  const ref = useRef(null);
  useClickAway(() => {
    if (open) {
      toggle();
    }
  }, ref);
  const { emitter } = useMitt();
  const handleButtonClick = () => {
    toggle();
  };

  useEffect(() => {
    if (emitter) {
      emitter.on(EEventType.HideDropDown, () => {
        set(false);
      });
    }
  }, [emitter, set]);

  return (
    <StyledDropdown ref={ref}>
      <button onClick={handleButtonClick}>
        <span>{title}</span>
        <Icon name={EIcon.Arrow} />
      </button>
      <MenuContainer open={open} ref={ref}>
        {children}
      </MenuContainer>
    </StyledDropdown>
  );
};

export default DropDown;
