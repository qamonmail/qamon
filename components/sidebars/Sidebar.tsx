import { FunctionComponent, useCallback } from "react";
import styled, { StyledComponent } from "styled-components";
import { px2rem } from "../../common/lib";
import Button from "../buttons/Button";
import { FormattedMessage } from "react-intl";
import Accordion from "../Accordion";
import { useRouter } from "next/router";
import { intl } from "../../common/intl";
import Link from "next/link";
import Icon from "../Icon";
import EIcon from "../../models/enums/EIcon";
import { size, transparentize } from "polished";
import EButtonSize from "../../models/enums/EButtonSize";
import { routes } from "../../consts/routes";

const StyledSidebar: StyledComponent<any, any> = styled.aside`
  display: flex;
  flex-direction: column;
  min-width: ${px2rem(380)};
  padding: 0 ${px2rem(36)} 0 ${px2rem(76)};

  & > section {
    display: flex;
    flex-direction: column;
    gap: ${px2rem(42)};
    margin-top: ${px2rem(46)};

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
        cursor: pointer;
        ${size(px2rem(30))};

        & > svg {
          ${size(px2rem(12))};
        }

        &:hover {
          background-color: ${transparentize(.9, "#202020")};
        }

        &:active {
          transform: scale(.85);
        }
      }
    }
  }
`;
const StyledMenu: StyledComponent<any, any> = styled.nav`
  margin-top: ${px2rem(20)};
  display: flex;
  flex-direction: column;
  gap: ${px2rem(1)};

  & > a {
    display: flex;
    flex-direction: row;
    align-items: center;
    border: none;
    border-radius: ${px2rem(10)};
    padding: ${px2rem(16)} ${px2rem(18)};
    margin-left: ${px2rem(-18)};

    & > svg {
      ${size(px2rem(20))};
    }

    & > span {
      font-size: ${px2rem(18)};
      font-weight: 400;
      margin-left: ${px2rem(18)};
    }

    & > strong {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: auto;
      background-color: ${transparentize(.9, "#202020")};
      border: none;
      border-radius: ${px2rem(6)};
      padding: ${px2rem(6)};
      font-size: ${px2rem(12)};
      line-height: ${px2rem(12)};
      font-weight: 700;
      min-width: ${px2rem(24)};
    }

    &:hover,
    &[data-active="true"] {
      background-color: #FFFFFC;
    }
  }
`;
const MainFolders: FunctionComponent = () => {
  const { pathname } = useRouter();

  return (
    <StyledMenu>
      <Link href={routes.inbox}>
        <a data-active={pathname.includes("inbox")}>
          <Icon name={EIcon.Inbox} />
          <FormattedMessage id="inbox" defaultMessage="Inbox" tagName="span" />
          {!!0 && <strong>0</strong>}
        </a>
      </Link>
      <Link href={routes.sent}>
        <a data-active={pathname.includes("sent")}>
          <Icon name={EIcon.Sent} />
          <FormattedMessage id="sent" defaultMessage="Sent" tagName="span" />
        </a>
      </Link>
      {/*<Link href={routes.bookmarks}>
       <a data-active={pathname.includes("bookmarks")}>
       <Icon name={EIcon.Bookmarks} />
       <FormattedMessage id="bookmarks" defaultMessage="Bookmarks" tagName="span" />
       </a>
       </Link>
       <Link href={routes.drafts}>
       <a data-active={pathname.includes("drafts")}>
       <Icon name={EIcon.Drafts} />
       <FormattedMessage id="drafts" defaultMessage="Drafts" tagName="span" />
       </a>
       </Link>
       <Link href={routes.archive}>
       <a data-active={pathname.includes("archive")}>
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
const Sidebar: FunctionComponent = () => {
  const { locale, push } = useRouter();
  const handleComposeClick = useCallback(async () => {
    await push(routes.compose);
  }, [push]);

  return (
    <StyledSidebar>
      <Button primary={true} size={EButtonSize.Big} onClick={handleComposeClick}>
        <FormattedMessage id="compose-email" defaultMessage="Compose email" tagName="span" />
      </Button>
      <section>
        <Accordion
          content={<MainFolders />}
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
         </div>*/}
      </section>
    </StyledSidebar>
  );
};

export default Sidebar;
