import { NextPage } from "next";
import Head from "next/head";
import appConfig from "../../app.config";
import TPageProps from "../../models/types/TPageProps";
import PageLayout from "../../components/layouts/PageLayout";
import styled, { StyledComponent } from "styled-components";
import { FormattedMessage } from "react-intl";
import { px2rem } from "../../common/lib";
import Button from "../../components/buttons/Button";
import { intl } from "../../common/intl";
import Icon from "../../components/Icon";
import EIcon from "../../models/enums/EIcon";
import { size } from "polished";
import { WalletControllerFactory } from "@ylide/sdk";
import { useStore } from "../../storeZ";
import EButtonSize from "../../models/enums/EButtonSize";
import { useRouter } from "next/router";
import Preloader from "../../components/Preloader";
import { useCallback, useEffect, useState } from "react";
import EEventType from "../../models/enums/EEventType";
import { useToggle } from "ahooks";
import { useMitt } from "react-mitt";
import PasswordForm from "../../components/forms/PasswordForm";
import Window from "../../components/Window";
import IncorrectPasswordMessageForm from "../../components/forms/IncorrectPasswordMessageForm";
import { clearStorage } from "../../common/lib";

const StyledLayout: StyledComponent<any, any> = styled(PageLayout)`
  & > h1 {
    font-size: ${px2rem(24)};
    font-weight: 400;
    line-height: ${px2rem(28.8)};
    margin-top: ${px2rem(20)};
    text-align: center;
  }

  & > p {
    font-size: ${px2rem(16)};
    font-weight: 400;
    margin-top: ${px2rem(20)};
    text-align: center;

    @media (min-width: 992px) {
      font-size: ${px2rem(18)};
    }
  }

  & > div {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-width: ${px2rem(240)};
    height: ${px2rem(150)};
    background: #ffffff;
    border: ${px2rem(1)} solid var(--active-color);
    border-radius: ${px2rem(20)};
    box-shadow: ${px2rem(5)} ${px2rem(5)} 0 var(--active-color);
    margin-top: ${px2rem(30)};
    padding: ${px2rem(20)};
    overflow: hidden;

    & > button {
      position: absolute;
      border: ${px2rem(2)} solid var(--active-color);
      border-radius: ${px2rem(20)};
      background-color: transparent;
      width: ${px2rem(90)};
      top: ${px2rem(20)};
      right: ${px2rem(20)};

      & > span {
        font-size: ${px2rem(14)};
        font-weight: 400;
        color: var(--active-color);
      }

      &::after {
        border-radius: ${px2rem(20)} !important;
      }

      &:hover {
        background-color: var(--active-color);

        & > span {
          color: var(--inactive-color);
        }
      }

      &:active {
        transform: translateY(${px2rem(2)}) !important;
      }
    }

    & > p {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: ${px2rem(10)};

      & > svg {
        ${size(20)};
        fill: #6347f5;

        @media (min-width: 992px) {
          ${size(30)};
        }
      }

      & > span {
        font-size: ${px2rem(14)};
        font-weight: 400;

        @media (min-width: 992px) {
          font-size: ${px2rem(16)};
        }
      }
    }

    & > strong {
      font-size: ${px2rem(14)};
      font-weight: 400;
      margin: ${px2rem(20)} 0;
    }

    & > span {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: ${px2rem(10)};

      & > svg {
        ${size(16)};
        fill: #6347f5;
      }

      & > span {
        font-size: ${px2rem(14)};
        font-weight: 400;
      }
    }

    @media (min-width: 992px) {
      min-width: ${px2rem(360)};
      height: ${px2rem(175)};
      margin-top: ${px2rem(70)};
      border-radius: ${px2rem(30)};
    }
  }
`;
const ModalIncorrectPassword = () => {
  const [showWindow, { toggle }] = useToggle(false);
  const { emitter } = useMitt();
  const { reload } = useRouter();
  const handleToggleWindow = useCallback(() => {
    toggle();
  }, [toggle]);
  const handleCloseWindow = useCallback(() => {
    toggle();
    emitter.emit(EEventType.HideConnectPending);
    reload();
  }, [toggle]);

  useEffect(() => {
    emitter.on(EEventType.ShowIncorrectPassword, handleToggleWindow);

    return () => {
      emitter.off(EEventType.ShowIncorrectPassword, handleToggleWindow);
    };
  }, [emitter, handleToggleWindow]);

  return (
    <Window visible={showWindow} onClose={handleCloseWindow}>
      <IncorrectPasswordMessageForm onClose={handleCloseWindow} />
    </Window>
  );
};
const Wallet: NextPage<TPageProps> = ({ title }) => {
  const [pending, setPending] = useState(false);
  const { push } = useRouter();
  const { emitter } = useMitt();
  const { reload } = useRouter();

  const { walletsList } = useStore((store) => store);
  const connectAccountList = useStore((store) => store["network/connect/accountList"]);
  const handleInstallClick = () => {
    window?.open("https://l1.broxus.com/everscale/wallet", "_blank")?.focus();
  };
  const handleConnectClick = (factory: WalletControllerFactory) => {
    setPending(true);
    connectAccountList(factory, push);
  };
  const [showWindow, { toggle }] = useToggle(false);
  const handleToggleWindow = useCallback(() => {
    toggle();
  }, [toggle]);

  const handleCloseWindow = useCallback(() => {
    toggle();
    clearStorage();
    reload();
  }, [toggle]);

  const handleHideConnectPending = useCallback(() => {
    setPending(false);
  }, [setPending]);

  useEffect(() => {
    emitter.on(EEventType.ShowPasswordWindow, handleToggleWindow);
    emitter.on(EEventType.HideConnectPending, handleHideConnectPending);

    return () => {
      emitter.off(EEventType.ShowPasswordWindow, handleToggleWindow);
      emitter.off(EEventType.HideConnectPending, handleHideConnectPending);
    };
  }, [emitter, handleToggleWindow]);

  return (
    <StyledLayout>
      <Head>
        <title>{title}</title>
      </Head>
      <Window visible={showWindow} onClose={handleCloseWindow}>
        <PasswordForm />
      </Window>
      <ModalIncorrectPassword />
      <FormattedMessage id="connect-your-wallets" defaultMessage="Connect your wallets" tagName="h1" />
      <FormattedMessage
        id="we-found"
        defaultMessage="We found some wallets in your browser which you can use with Qamon"
        tagName="p" />
      {walletsList.map(({ factory, isAvailable }) => (
        <div key={factory.wallet}>
          {pending && <Preloader size={200} background="white" />}
          <p>
            <Icon name={EIcon.Everscale} />
            <FormattedMessage id="ever-wallet" defaultMessage="EverWallet" tagName="span" />
          </p>
          <FormattedMessage id="blockchains" defaultMessage="Blockchains:" tagName="strong" />
          <span>
            <Icon name={EIcon.Everscale} />
            <FormattedMessage id="everscale" defaultMessage="EverScale" tagName="span" />
          </span>
          {isAvailable ? (
            <Button primary={true} size={EButtonSize.Small} onClick={() => handleConnectClick(factory)}>
              <FormattedMessage id="connect" defaultMessage="Connect" tagName="span" />
            </Button>
          ) : (
            <Button primary={true} size={EButtonSize.Small} onClick={handleInstallClick}>
              <FormattedMessage id="install" defaultMessage="Install" tagName="span" />
            </Button>
          )}
        </div>
      ))}
    </StyledLayout>
  );
};
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      title: `${intl(locale).formatMessage({
        id: "connect-your-wallets",
        defaultMessage: "Connect your wallets",
      })} - ${appConfig.data.title}`,
    },
  };
};

export default Wallet;
