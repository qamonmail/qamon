import { FunctionComponent } from "react";
import styled, { StyledComponent } from "styled-components";
import { GB, KR } from "country-flag-icons/react/1x1";
import { px2rem } from "../../common/lib";
import ELanguage from "../../models/enums/ELanguage";
import { useRouter } from "next/router";
import appConfig from "../../app.config";
import { size } from "polished";
import useLocalStorage from "../../hooks/useLocalStorage";

type TLanguageMenuProps = {
  onClose: () => void;
};

const StyledList: StyledComponent<any, any> = styled.ul`
  & a {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${px2rem(10)};
    padding: ${px2rem(10)} ${px2rem(15)};
    cursor: pointer;

    & > svg {
      ${size(px2rem(20))};
      border: none;
      border-radius: ${px2rem(10)};
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
const LanguageMenu: FunctionComponent<TLanguageMenuProps> = ({ onClose }) => {
  const [, setCurrentLocale] = useLocalStorage<ELanguage | undefined>(appConfig.keys.settingsLocale, ELanguage.Korean);
  const { locale, asPath, replace } = useRouter();
  const handleLanguageSelect = (e: any, lang: ELanguage) => {
    e.preventDefault();
    setCurrentLocale(lang);
    onClose();
    void replace(asPath, asPath, { locale: lang });
  };

  return (
    <StyledList>
      <li>
        <a
          href="#"
          data-active={locale === ELanguage.English}
          onClick={(e: any) => handleLanguageSelect(e, ELanguage.English)}>
          <GB />
          <span>English</span>
        </a>
      </li>
      <li>
        <a
          href="#"
          data-active={locale === ELanguage.Korean}
          onClick={(e: any) => handleLanguageSelect(e, ELanguage.Korean)}>
          <KR />
          <span>한국어</span>
        </a>
      </li>
    </StyledList>
  );
};

export default LanguageMenu;
