import { FunctionComponent, useCallback, useEffect, useRef } from "react";
import styled, { StyledComponent } from "styled-components";
import { px2rem } from "../common/lib";
import { size, transparentize } from "polished";
import { useClickAway, useToggle } from "ahooks";
import { useMitt } from "react-mitt";
import EEventType from "../models/enums/EEventType";
import Icon from "./Icon";
import EIcon from "../models/enums/EIcon";
import { KR, GB } from "country-flag-icons/react/1x1";
import LanguageMenu from "./menus/LanguageMenu";
import MenuContainer from "./menus/MenuContainer";
import ELanguage from "../models/enums/ELanguage";
import { useRouter } from "next/router";

type TLanguageSwitcher = {
  className?: string;
};

const StyledDropdown: StyledComponent<any, any> = styled.section`
  & > button {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: none;
    border: none;
    gap: ${px2rem(12)};
    cursor: pointer;
    transform: none !important;
    padding: ${px2rem(10)};

    & > svg {
      &:nth-of-type(1) {
        ${size(px2rem(20))};
        border: none;
        border-radius: 15px;
      }

      &:nth-of-type(2) {
        ${size(px2rem(10))};
        fill: ${transparentize(.5, "#202020")};
      }
    }
  }
`;
const LanguageSwitcher: FunctionComponent<TLanguageSwitcher> = ({ className }) => {
  const [open, { toggle, set }] = useToggle(false);
  const ref = useRef(null);
  useClickAway(() => {
    if (open) {
      toggle();
    }
  }, ref);
  const { emitter } = useMitt();
  const { locale } = useRouter();
  const handleButtonClick = () => {
    toggle();
  };
  const handleClose = useCallback(() => {
    set(false);
  }, [set]);

  useEffect(() => {
    if (emitter) {
      emitter.on(EEventType.HideDropDown, () => {
        set(false);
      });
    }
  }, [emitter, set]);

  return (
    <StyledDropdown className={className} ref={ref}>
      <button onClick={handleButtonClick}>
        {locale === ELanguage.Korean && <KR />}
        {locale === ELanguage.English && <GB />}
        <Icon name={EIcon.Arrow} />
      </button>
      <MenuContainer open={open} ref={ref}>
        <LanguageMenu onClose={handleClose} />
      </MenuContainer>
    </StyledDropdown>
  );
};

export default LanguageSwitcher;
