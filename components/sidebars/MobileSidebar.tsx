import { FunctionComponent, MouseEventHandler, useCallback } from "react";
import styled, { css, StyledComponent } from "styled-components";
import { clearStorage, getAddressHidden, px2rem } from "../../common/lib";
import { intl } from "../../common/intl";
import Accordion from "../Accordion";
import { useRouter } from "next/router";
import Link from "next/link";
import Icon from "../Icon";
import EIcon from "../../models/enums/EIcon";
import { FormattedMessage } from "react-intl";
import { size, transparentize } from "polished";
import { routes } from "../../consts/routes";
import { useStore } from "../../storeZ";

type TMobileSidebarProps = {
  visibility: boolean;
  onClose: () => void;
};

type TMenuProps = {
  onClose: () => void;
};

const StyledContainer: StyledComponent<any, any> = styled.aside`
  position: absolute;
  width: ${px2rem(280)};
  height: 100vh;
  background-color: var(--active-color);
  transform: ${({ visibility }: any) => visibility === "true"
          ? `translateX(${px2rem(0)})`
          : `translateX(${px2rem(-280)})`};
  transition: all .15s;
  z-index: 10000;

  & > header {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.11) 0%, rgba(255, 255, 255, 0) 101.07%);
    padding: ${px2rem(10)} ${px2rem(16)};

    & > span {
      font-size: ${px2rem(11)};
      font-weight: 500;
      color: white;
      margin-left: ${px2rem(8)};
      line-height: ${px2rem(13)};
    }

    & > svg {
      fill: white;
      ${size(px2rem(25), px2rem(80))};
    }
  }

  & > section {
    display: flex;
    flex-direction: column;
    gap: ${px2rem(36)};
    padding: ${px2rem(42)} 0 ${px2rem(20)} ${px2rem(16)};
    overflow-x: hidden;
    overflow-y: auto;
    max-height: calc(100% - ${px2rem(52)});

    & > div {
      display: flex;
      flex-direction: row;
      align-items: center;

      & > button {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        border: none;
        border-radius: ${px2rem(15)};
        margin-left: auto;
        margin-right: ${px2rem(10)};
        cursor: pointer;
        ${size(px2rem(30))};

        & > svg {
          ${size(px2rem(12))};
          fill: ${transparentize(.3, "#ffffff")};
        }

        &:active {
          transform: scale(.85);
        }
      }
    }

    & > a {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: ${px2rem(16)} ${px2rem(18)};
      margin-left: ${px2rem(-18)};

      & > svg {
        ${size(px2rem(22))};
        fill: #fff;
      }

      & > span {
        font-size: ${px2rem(16)};
        font-weight: 400;
        margin-left: ${px2rem(12)};
        color: white;
      }

      &:hover,
      &[data-active="true"] {
        background-color: ${transparentize(.95, "#ffffff")};
      }
    }
  }
`;
const StyledMenu: StyledComponent<any, any> = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(1)};

  & > a {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${px2rem(16)} ${px2rem(18)};
    margin-left: ${px2rem(-18)};

    & > svg {
      ${size(px2rem(16))};
      fill: ${transparentize(.5, "#ffffff")};
    }

    & > span {
      font-size: ${px2rem(16)};
      font-weight: 400;
      margin-left: ${px2rem(12)};
      color: white;
    }

    & > strong {
      font-size: ${px2rem(16)};
      font-weight: 400;
      color: ${transparentize(.5, "#ffffff")};
      margin-left: ${px2rem(8)};
    }

    &:hover,
    &[data-active="true"] {
      background-color: ${transparentize(.95, "#ffffff")};
    }
  }
`;
export const spanStyles = css`
  font-weight: 400;
  font-size: ${px2rem(14)};
  line-height: ${px2rem(16)};
`;
const WalletInfo = styled.div`
  display: grid;
`;
const WalletContent = styled.span`
  color: rgba(255, 255, 255, 0.7);
  text-transform: capitalize;
  ${spanStyles}
`;
const AddressContent = styled.span`
  color: rgba(255, 255, 255, 0.7);
  ${spanStyles}
`;
const Line = styled.div`
  width: 0;
  height: 24px;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  margin: 0 14px;
`;
const MainFolders: FunctionComponent<TMenuProps> = ({ onClose }) => {
  const { pathname } = useRouter();

  return (
    <StyledMenu>
      <Link href={routes.inbox}>
        <a data-active={pathname.includes("inbox")} onClick={onClose}>
          <Icon name={EIcon.Inbox} />
          <FormattedMessage id="inbox" defaultMessage="Inbox" tagName="span" />
          {/*<strong>5</strong>*/}
        </a>
      </Link>
      <Link href={routes.sent}>
        <a data-active={pathname.includes("sent")} onClick={onClose}>
          <Icon name={EIcon.Sent} />
          <FormattedMessage id="sent" defaultMessage="Sent" tagName="span" />
        </a>
      </Link>
      {/*<Link href={routes.bookmarks}>
       <a data-active={pathname.includes("bookmarks")} onClick={onClose}>
       <Icon name={EIcon.Bookmarks} />
       <FormattedMessage id="bookmarks" defaultMessage="Bookmarks" tagName="span" />
       </a>
       </Link>
       <Link href={routes.drafts}>
       <a data-active={pathname.includes("drafts")} onClick={onClose}>
       <Icon name={EIcon.Drafts} />
       <FormattedMessage id="drafts" defaultMessage="Drafts" tagName="span" />
       </a>
       </Link>
       <Link href={routes.archive}>
       <a data-active={pathname.includes("archive")} onClick={onClose}>
       <Icon name={EIcon.Archive} />
       <FormattedMessage id="archive" defaultMessage="Archive" tagName="span" />
       </a>
       </Link>*/}
    </StyledMenu>
  );
};
const PinnedFolders: FunctionComponent = () => {
  return (
    <></>
  );
};
const PinnedContacts: FunctionComponent = () => {
  return (
    <></>
  );
};
const MobileSidebar: FunctionComponent<TMobileSidebarProps> = ({ visibility, onClose }) => {
  const { locale, pathname } = useRouter();
  const { accountList } = useStore((store) => store);
  const networkInitial = useStore((store) => store["@network/initial"]);
  const handleLogoutClick = useCallback<MouseEventHandler>(e => {
    e.preventDefault();
    networkInitial();
    clearStorage();
    document.location.reload();
  }, [networkInitial]);

  return (
    <StyledContainer visibility={visibility.toString()}>
      <header>
        {/* <Avatar color="#202020" symbol=":)" size={32} /> */}
        {/* <span>Account</span> */}
        <Icon name={EIcon.Qamon} />
        <Line />
        {!!accountList?.[0] && (
          <WalletInfo key={accountList[0]?.address}>
            <WalletContent>{accountList[0]?.wallet}</WalletContent>
            <AddressContent>{getAddressHidden(accountList[0]?.address)}</AddressContent>
          </WalletInfo>
        )}
      </header>
      <section>
        <Accordion
          content={<MainFolders onClose={onClose} />}
          open={true}
          title={intl(locale).formatMessage({
            id: "main-folders",
            defaultMessage: "Main folders",
          })} />
        {/*<div>
         <Accordion
         content={<PinnedFolders />}
         title={intl(locale).formatMessage({
         id: "pinned-folders",
         defaultMessage: "Pinned folders"
         })} />
         <button>
         <Icon name={EIcon.Plus} />
         </button>
         </div>
         <div>
         <Accordion
         content={<PinnedContacts />}
         title={intl(locale).formatMessage({
         id: "pinned-contacts",
         defaultMessage: "Pinned contacts"
         })} />
         <button>
         <Icon name={EIcon.Plus} />
         </button>
         </div>
         */}
        <Link href="/settings">
          <a data-active={pathname.includes("settings")} onClick={onClose}>
            <Icon name={EIcon.Settings} />
            <FormattedMessage id="settings" defaultMessage="Settings" tagName="span" />
          </a>
        </Link>
        <a href="#" onClick={handleLogoutClick}>
          <Icon name={EIcon.LogOut} />
          <FormattedMessage id="logout" defaultMessage="Log out" tagName="span" />
        </a>
      </section>
    </StyledContainer>
  );
};

export default MobileSidebar;
