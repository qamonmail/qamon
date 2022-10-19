import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import styled, { StyledComponent } from "styled-components";
import { size, transparentize } from "polished";
import appConfig from "../../app.config";
import TPageProps from "../../models/types/TPageProps";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { intl } from "../../common/intl";
import ContentHeader from "../../components/headers/ContentHeader";
import EIcon from "../../models/enums/EIcon";
import Icon from "../../components/Icon";
import { px2rem } from "../../common/lib";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import { useTheme } from "next-themes";
import ETheme from "../../models/enums/ETheme";
import LanguageMenu from "../../components/menus/LanguageMenu";
import ELanguage from "../../models/enums/ELanguage";
import DropDown from "../../components/DropDown";
import { useMitt } from "react-mitt";
import EEventType from "../../models/enums/EEventType";
import MobileLayout from "../../components/layouts/MobileLayout";
import Button from "../../components/buttons/Button";
import theme1 from "../../styles/themes/theme1";
import theme2 from "../../styles/themes/theme2";
import theme3 from "../../styles/themes/theme3";
import theme4 from "../../styles/themes/theme4";
import theme5 from "../../styles/themes/theme5";
import useLocalStorage from "../../hooks/useLocalStorage";

type TRowProps = {
  control: JSX.Element;
  icon: EIcon;
  title: string;
  value: string;
};

const StyledContainer: StyledComponent<any, any> = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${px2rem(55)};
  margin-top: ${px2rem(60)};
  padding: 0 ${px2rem(30)};
`;
const MobileStyledContainer: StyledComponent<any, any> = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
  height: calc(100vh - ${px2rem(42)});
  overflow-x: hidden;
  overflow-y: auto;
  padding: ${px2rem(42)} ${px2rem(52)};
  gap: ${px2rem(58)};

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & > h3 {
      color: #404468;
      font-size: ${px2rem(20)};
      font-weight: 400;
    }

    &:nth-of-type(1) {
      & > button {
        border-color: #BFBFB6;

        &[data-status="checked"] {
          border-color: var(--active-color);
          background-color: var(--active-color);

          & > svg {
            fill: white;
          }
        }
      }
    }

    &:nth-of-type(2) {
      & > button {
        width: ${px2rem(85)};
        height: ${px2rem(32)};

        & > span {
          white-space: nowrap;
        }
      }
    }

    &:nth-of-type(3) {
      & button {
        & > span {
          font-size: ${px2rem(20)};
          font-weight: 400;
          color: ${transparentize(.5, "#202020")};
          text-decoration: none;
        }

        & > svg {
          fill: ${transparentize(.5, "#202020")};
        }
      }
    }
  }

  & > p {
    font-size: ${px2rem(16)};
    font-weight: 400;
    color: ${transparentize(.5, "#202020")};
    margin-top: ${px2rem(-40)};
    line-height: ${px2rem(22.4)};
  }

  & > ul {
    display: flex;
    flex-direction: row;
    gap: ${px2rem(7)};
    margin-top: ${px2rem(-45)};

    & > li {
      & > button {
        ${theme1}
        ${theme2}
        ${theme3}
        ${theme4}
        ${theme5}
        display: flex;
        justify-content: center;
        align-items: center;
        ${size(px2rem(46))};
        background: radial-gradient(54.7% 64.58% at 50% 50%, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(56.95% 85.42% at 100% 0%, var(--shine-2) 0%, rgba(238, 137, 255, 0) 100%), radial-gradient(38.55% 57.83% at 0% 100%, var(--shine-1) 0%, rgba(131, 255, 210, 0) 100%), var(--inactive-color);
        border-radius: ${px2rem(5.77)};
        border: ${px2rem(1)} solid white;
        cursor: pointer;

        & > svg {
          ${size(px2rem(26))};
        }

        &[data-active="true"] {
          border-color: var(--active-color);
        }
      }
    }
  }
`;
const StyledRow: StyledComponent<any, any> = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(40)};

  & > section {
    display: flex;
    flex-direction: row;
    align-items: center;

    & > svg {
      ${size(px2rem(22))};
    }

    & > strong {
      font-size: ${px2rem(18)};
      font-weight: 400;
      line-height: ${px2rem(25)};
    }

    & > span {
      font-size: ${px2rem(16)};
      font-weight: 400;
      line-height: ${px2rem(25)};
      opacity: .4;
    }

    & > a {
      font-size: ${px2rem(18)};
      font-weight: 400;
    }

    &:nth-of-type(1) {
      gap: ${px2rem(17)};
      width: ${px2rem(170)};
    }

    &:nth-of-type(2) {
      flex: 1;
      max-width: ${px2rem(400)};
    }
  }
`;
const Row: FunctionComponent<TRowProps> = ({ control, icon, title, value }) => {
  return (
    <StyledRow>
      <section>
        <Icon name={icon} />
        <strong>{title}</strong>
      </section>
      <section>
        <span>{value}</span>
      </section>
      <section>{control}</section>
    </StyledRow>
  );
};
const Settings: NextPage<TPageProps> = ({ isLg, title }) => {
  const { locale, push } = useRouter();
  const [paranoidMode, setParanoidMode] = useState<boolean | undefined>(undefined);
  const [currentParanoidMode, setCurrentParanoidMode] = useLocalStorage<boolean>(
    appConfig.keys.settingsParanoidMode,
    false
  );
  const [signature, setSignature] = useState<string>("");
  const [currentSignature] = useLocalStorage<string>(appConfig.keys.settingsSignature, "");
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [currentTheme, setCurrentTheme] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const { theme, setTheme } = useTheme();
  const { emitter } = useMitt();
  const handleParanoidModeClick = () => {
    setCurrentParanoidMode(!currentParanoidMode);
  };
  const languageItemClick = useCallback(() => {
    emitter.emit(EEventType.HideDropDown);
  }, [emitter]);
  const handleThemeButtonClick = (theme: ETheme) => {
    setTheme(theme);
    setSelectedTheme(theme);
  };
  const handleEditSignatureClick = useCallback(() => {
    void push("/settings/signature");
  }, [push]);

  useEffect(() => {
    setParanoidMode(currentParanoidMode);
    setSignature(currentSignature);

    if (theme && Object.values(ETheme).includes(theme as ETheme) && locale) {
      switch (true) {
        case theme === ETheme.Theme1:
          setCurrentTheme(intl(locale).formatMessage({
            id: "theme-1",
            defaultMessage: "Theme 1"
          }));
          break;

        case theme === ETheme.Theme2:
          setCurrentTheme(intl(locale).formatMessage({
            id: "theme-2",
            defaultMessage: "Theme 2"
          }));
          break;

        case theme === ETheme.Theme3:
          setCurrentTheme(intl(locale).formatMessage({
            id: "theme-3",
            defaultMessage: "Theme 3"
          }));
          break;

        case theme === ETheme.Theme4:
          setCurrentTheme(intl(locale).formatMessage({
            id: "theme-4",
            defaultMessage: "Theme 4"
          }));
          break;

        case theme === ETheme.Theme5:
          setCurrentTheme(intl(locale).formatMessage({
            id: "theme-5",
            defaultMessage: "Theme 5"
          }));
          break;
      }
    }

    if (locale && Object.values(ELanguage).includes(locale as ELanguage)) {
      switch (true) {
        case locale === ELanguage.English:
          setCurrentLanguage("English");
          break;

        case locale === ELanguage.Korean:
        default:
          setCurrentLanguage("한국어");
      }
    }
  }, [currentParanoidMode, currentSignature, theme, locale]);
  useEffect(() => {
    if (Object.values(ETheme).includes(theme as ETheme)) {
      setSelectedTheme(theme as ETheme);
    }
  }, [theme]);

  return (
    <>
      {!isLg && (
        <MobileLayout title={title?.split("-")?.[0]?.trim()}>
          <Head>
            <title>{title}</title>
          </Head>
          <MobileStyledContainer>
            {/* <div>
             <FormattedMessage id="paranoid-mode" defaultMessage="Paranoid mode" tagName="h3" />
             <Checkbox
             status={paranoidMode ? ECheckboxStatus.Checked : ECheckboxStatus.Unchecked}
             onCheck={handleParanoidModeClick} />
             </div> */}
            <div>
              <FormattedMessage id="signature" defaultMessage="Signature" tagName="h3" />
              <Button primary={true} onClick={handleEditSignatureClick}>
                <FormattedMessage id="edit" defaultMessage="Edit" tagName="span" />
              </Button>
            </div>
            <p>{currentSignature || "..."}</p>
            <div>
              <FormattedMessage id="language" defaultMessage="Language" tagName="h3" />
              <DropDown title={currentLanguage}>
                <LanguageMenu onClose={languageItemClick} />
              </DropDown>
            </div>
            <div>
              <FormattedMessage id="color-theme" defaultMessage="Color theme" tagName="h3" />
            </div>
            <ul>
              <li>
                <button
                  data-theme="theme1"
                  data-active={selectedTheme === ETheme.Theme1}
                  onClick={() => handleThemeButtonClick(ETheme.Theme1)}>
                  <Icon name={EIcon.QamonIcon} />
                </button>
              </li>
              <li>
                <button
                  data-theme="theme2"
                  data-active={selectedTheme === ETheme.Theme2}
                  onClick={() => handleThemeButtonClick(ETheme.Theme2)}>
                  <Icon name={EIcon.QamonIcon} />
                </button>
              </li>
              <li>
                <button
                  data-theme="theme3"
                  data-active={selectedTheme === ETheme.Theme3}
                  onClick={() => handleThemeButtonClick(ETheme.Theme3)}>
                  <Icon name={EIcon.QamonIcon} />
                </button>
              </li>
              <li>
                <button
                  data-theme="theme4"
                  data-active={selectedTheme === ETheme.Theme4}
                  onClick={() => handleThemeButtonClick(ETheme.Theme4)}>
                  <Icon name={EIcon.QamonIcon} />
                </button>
              </li>
              <li>
                <button
                  data-theme="theme5"
                  data-active={selectedTheme === ETheme.Theme5}
                  onClick={() => handleThemeButtonClick(ETheme.Theme5)}>
                  <Icon name={EIcon.QamonIcon} />
                </button>
              </li>
            </ul>
          </MobileStyledContainer>
        </MobileLayout>
      )}
      {isLg && (
        <DashboardLayout>
          <Head>
            <title>{title}</title>
          </Head>
          <ContentHeader title={title?.split("-")?.[0]?.trim()} />
          <StyledContainer>
            {/* <Row
             control={(
             paranoidMode !== undefined
             ? <Switcher value={paranoidMode} onSwitch={handleParanoidModeClick} />
             : <></>
             )}
             icon={EIcon.Eye}
             title={intl(locale).formatMessage({
             id: "paranoid-mode",
             defaultMessage: "Paranoid mode"
             })}
             value={intl(locale).formatMessage({
             id: "paranoid-mode-description",
             defaultMessage: "All data will be hidden"
             })} /> */}
            <Row
              control={(
                <Link href="/settings/signature">
                  <a>
                    <FormattedMessage id="edit" defaultMessage="Edit" />
                  </a>
                </Link>
              )}
              icon={EIcon.Signature}
              title={intl(locale).formatMessage({
                id: "signature",
                defaultMessage: "Signature"
              })}
              value={signature || "..."} />
            <Row
              control={(
                <DropDown title={<FormattedMessage id="select" defaultMessage="Select" />}>
                  <LanguageMenu onClose={languageItemClick} />
                </DropDown>
              )}
              icon={EIcon.Language}
              title={intl(locale).formatMessage({
                id: "language",
                defaultMessage: "Language"
              })}
              value={currentLanguage} />
            <Row
              control={(
                <Link href="/settings/theme">
                  <a>
                    <FormattedMessage id="change" defaultMessage="Change" />
                  </a>
                </Link>
              )}
              icon={EIcon.Themes}
              title={intl(locale).formatMessage({
                id: "color-theme",
                defaultMessage: "Color theme"
              })}
              value={currentTheme} />
          </StyledContainer>
        </DashboardLayout>
      )}
    </>
  );
};
export const getStaticProps = async ({ locale }: any) => {

  return {
    props: {
      title: `${intl(locale).formatMessage({
        id: "settings",
        defaultMessage: "Settings"
      })} - ${appConfig.data.title}`
    }
  };
};

export default Settings;
