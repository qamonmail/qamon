import { FunctionComponent, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import styled, { StyledComponent } from "styled-components";
import { size, transparentize } from "polished";
import Button from "../buttons/Button";
import Icon from "../Icon";
import EIcon from "../../models/enums/EIcon";
import ETheme from "../../models/enums/ETheme";
import { px2rem } from "../../common/lib";
import theme1 from "../../styles/themes/theme1";
import theme2 from "../../styles/themes/theme2";
import theme3 from "../../styles/themes/theme3";
import theme4 from "../../styles/themes/theme4";
import theme5 from "../../styles/themes/theme5";
import { useTheme } from "next-themes";
import EButtonSize from "../../models/enums/EButtonSize";
import EButtonType from "../../models/enums/EButtonType";

type TThemeButtonProps = {
  active: boolean;
  children: any;
  onClick: () => void;
  theme: ETheme;
};

const StyledContainer: StyledComponent<any, any> = styled.div`
  & > ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${px2rem(12)};
    margin: ${px2rem(30)} 0 ${px2rem(66)};
  }
`;
const StyledButton: StyledComponent<any, any> = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: all .15s;

  & > section {
    ${theme1}
    ${theme2}
    ${theme3}
    ${theme4}
    ${theme5}
    display: flex;
    align-items: center;
    justify-content: center;
    ${size(px2rem(100))};
    background-color: var(--inactive-color);
    border: ${px2rem(2)} solid ${({ active }: TThemeButtonProps) => active
            ? "var(--active-color)"
            : "white"};
    border-radius: ${px2rem(12.35)};
    background: radial-gradient(54.7% 64.58% at 50% 50%, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(56.95% 85.42% at 100% 0%, var(--shine-2) 0%, rgba(238, 137, 255, 0) 100%), radial-gradient(38.55% 57.83% at 0% 100%, var(--shine-1) 0%, rgba(131, 255, 210, 0) 100%), var(--inactive-color);

    & > svg {
      ${size(px2rem(50))};
    }
  }

  & > span {
    font-size: ${px2rem(16)};
    font-weight: 400;
    line-height: ${px2rem(22.4)};
    margin-top: ${px2rem(10)};
    color: ${({ active }: TThemeButtonProps) => active ? "var(--active-color)" : transparentize(.7, "#202020")};
  }

  &:active {
    transform: scale(.95);
  }
`;
const ThemeButton: FunctionComponent<TThemeButtonProps> = ({ active, children, onClick, theme }) => {
  return (
    <StyledButton data-theme={theme} active={active} onClick={onClick}>
      <section>
        <Icon name={EIcon.QamonIcon} />
      </section>
      {children}
    </StyledButton>
  );
};
const ThemeForm: FunctionComponent = () => {
  const [disabledConfirmButton, setDisabledConfirmButton] = useState<boolean>(true);
  const [currentTheme, setCurrentTheme] = useState<ETheme | undefined>();
  const { theme, setTheme } = useTheme();
  const handleThemeChange = (theme: ETheme) => {
    if (theme !== currentTheme) {
      setCurrentTheme(theme);
      setDisabledConfirmButton(false);
    }
  };
  const handleConfirmClick = () => {
    setTheme(currentTheme || ETheme.Theme1);
    setTimeout(() => {
      setDisabledConfirmButton(true);
    }, 350);
  };

  useEffect(() => {
    if (Object.values(ETheme).includes(theme as ETheme)) {
      setCurrentTheme(theme as ETheme);
    }
  }, [theme]);

  return (
    <StyledContainer>
      <ul>
        <li>
          <ThemeButton theme={ETheme.Theme1}
            active={currentTheme === ETheme.Theme1}
            onClick={() => handleThemeChange(ETheme.Theme1)}>
            <FormattedMessage id="theme-1" defaultMessage="Theme 1" tagName="span" />
          </ThemeButton>
        </li>
        <li>
          <ThemeButton theme={ETheme.Theme2}
            active={currentTheme === ETheme.Theme2}
            onClick={() => handleThemeChange(ETheme.Theme2)}>
            <FormattedMessage id="theme-2" defaultMessage="Theme 2" tagName="span" />
          </ThemeButton>
        </li>
        <li>
          <ThemeButton theme={ETheme.Theme3}
            active={currentTheme === ETheme.Theme3}
            onClick={() => handleThemeChange(ETheme.Theme3)}>
            <FormattedMessage id="theme-3" defaultMessage="Theme 3" tagName="span" />
          </ThemeButton>
        </li>
        <li>
          <ThemeButton theme={ETheme.Theme4}
            active={currentTheme === ETheme.Theme4}
            onClick={() => handleThemeChange(ETheme.Theme4)}>
            <FormattedMessage id="theme-4" defaultMessage="Theme 4" tagName="span" />
          </ThemeButton>
        </li>
        <li>
          <ThemeButton theme={ETheme.Theme5}
            active={currentTheme === ETheme.Theme5}
            onClick={() => handleThemeChange(ETheme.Theme5)}>
            <FormattedMessage id="theme-5" defaultMessage="Theme 5" tagName="span" />
          </ThemeButton>
        </li>
      </ul>
      <Button
        primary={false}
        size={EButtonSize.Small}
        type={EButtonType.Submit}
        disabled={disabledConfirmButton}
        onClick={handleConfirmClick}>
        <Icon name={EIcon.Confirm} />
        <FormattedMessage id="confirm" defaultMessage="Confirm" tagName="span" />
      </Button>
    </StyledContainer>
  );
};

export default ThemeForm;
