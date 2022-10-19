import { FunctionComponent, MouseEventHandler, useCallback } from "react";
import styled, { css, StyledComponent } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { size } from "polished";
import { clearStorage, getAddressHidden, px2rem } from "../../common/lib";
import Icon from "../Icon";
import EIcon from "../../models/enums/EIcon";
import { FormattedMessage } from "react-intl";
import { routes } from "../../consts/routes";
import { useStore } from "../../storeZ";
import LanguageSwitcher from "../LanguageSwitcher";

const StyledHeader: StyledComponent<any, any> = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${px2rem(128)};

  & > section {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;

    &:nth-of-type(1) {
      max-width: ${px2rem(380)};
      padding-left: ${px2rem(76)};
    }

    & > a > svg {
      ${size(px2rem(120))};
    }
  }
`;
const StyledTabs: StyledComponent<any, any> = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: ${px2rem(30)};
  padding-right: ${px2rem(60)};

  & > a {
    display: flex;
    position: relative;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-height: ${px2rem(20)};

    & > svg {
      ${size(px2rem(20))};
      margin-right: ${px2rem(14)};
    }

    & > span {
      font-size: ${px2rem(16)};
      font-weight: 400;
    }

    &[data-active="true"]::after {
      content: "";
      display: block;
      position: absolute;
      background-color: #404468;
      height: ${px2rem(2)};
      width: 100%;
      bottom: ${px2rem(-10)};
      border-radius: ${px2rem(2)};
    }

    &:nth-of-type(1) {
      margin-right: auto;
      min-width: ${px2rem(90)};
    }
  }
`;
const WalletInfo = styled.div`
  display: grid;
`;
export const spanStyles = css`
  font-weight: 400;
  font-size: ${px2rem(14)};
  line-height: ${px2rem(16)};
`;
const WalletContent = styled.span`
  color: #202020;
  text-transform: capitalize;
  ${spanStyles}
`;
const AddressContent = styled.span`
  color: rgba(32, 32, 32, 0.5);
  ${spanStyles}
`;
const Line = styled.div`
  width: 0;
  height: 24px;
  border-right: 1px solid rgba(32, 32, 32, 0.3);
  margin: 0 14px;
`;
const Tabs: FunctionComponent = () => {
  const router = useRouter();
  const networkInitial = useStore((store) => store["@network/initial"]);
  const handleLogoutClick = useCallback<MouseEventHandler>(e => {
    e.preventDefault();
    networkInitial();
    clearStorage();
    document.location.reload();
    // Что б выполнить редирект, нужно почистить стейт в Yilde, иначе вход происходит без пароля
    // void router.replace(routes.main);
  }, [networkInitial]);

  return (
    <StyledTabs>
      <Link href={routes.inbox} passHref>
        <a data-active={router.pathname.includes("mail")}>
          <FormattedMessage id="mail" defaultMessage="Mail" tagName="span" />
        </a>
      </Link>
      <LanguageSwitcher />
      {/*<Link href={routes.contacts} passHref>
        <a data-active={router.pathname.includes("contacts")}>
          <Icon name={EIcon.Contacts} />
          <FormattedMessage id="contacts" defaultMessage="Contacts" tagName="span" />
        </a>
      </Link>
      <Link href={routes.folders} passHref>
       <a data-active={router.pathname.includes("folders")}>
       <Icon name={EIcon.Folders} />
       <FormattedMessage id="folders" defaultMessage="Folders" tagName="span" />
       </a>
       </Link>*/}
      <Link href={routes.settings} passHref>
        <a data-active={router.pathname.includes("settings")}>
          <Icon name={EIcon.Settings} />
          <FormattedMessage id="settings" defaultMessage="Settings" tagName="span" />
        </a>
      </Link>
      <a href="#" onClick={handleLogoutClick}>
        <Icon name={EIcon.LogOut} />
        <FormattedMessage id="logout" defaultMessage="Log out" tagName="span" />
      </a>
    </StyledTabs>
  );
};
const LayoutHeader: FunctionComponent = () => {
  const { accountList } = useStore((store) => store);
  return (
    <StyledHeader>
      <section>
        <Link href={routes.inbox} passHref>
          <a>
            <Icon name={EIcon.Qamon} />
          </a>
        </Link>
        <Line />
        {!!accountList?.[0] && (
          <WalletInfo key={accountList[0]?.address}>
            <WalletContent>{accountList[0]?.wallet}</WalletContent>
            <AddressContent>{getAddressHidden(accountList[0]?.address)}</AddressContent>
          </WalletInfo>
        )}
      </section>
      <section>
        <Tabs />
      </section>
    </StyledHeader>
  );
};

export default LayoutHeader;
