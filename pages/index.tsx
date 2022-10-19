import { NextPage } from "next";
import Head from "next/head";
import appConfig from "../app.config";
import TPageProps from "../models/types/TPageProps";
import PageLayout from "../components/layouts/PageLayout";
import styled, { StyledComponent } from "styled-components";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { px2rem } from "../common/lib";
import Button from "../components/buttons/Button";
import { useCallback } from "react";
import EButtonSize from "../models/enums/EButtonSize";
import { transparentize } from "polished";
import LanguageSwitcher from "../components/LanguageSwitcher";

const StyledLayout: StyledComponent<any, any> = styled(PageLayout)`
  padding-top: ${({ isLg }: any) => isLg ? px2rem(20) : px2rem(80)};

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

    &:nth-of-type(2) {
      font-size: ${px2rem(18)};
      font-weight: 400;
      margin-top: ${px2rem(60)};

      @media (min-width: 992px) {
        font-size: ${px2rem(20)};
      }
    }

    @media (min-width: 992px) {
      font-size: ${px2rem(18)};
    }
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: ${px2rem(20)};
    margin-top: ${px2rem(40)};

    & > button {
      border: ${px2rem(1.5)} solid ${transparentize(.5, "#202020")};
      border-radius: ${px2rem(10)};
      background-color: transparent;
      width: ${px2rem(268)};
      height: ${px2rem(64)};

      & > span {
        font-size: ${px2rem(18)};
        font-weight: 500;
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

    @media (min-width: 992px) {
      flex-direction: row;
      gap: ${px2rem(30)};
    }
  }
`;
const StyledLanguageSwitcher: StyledComponent<any, any> = styled(LanguageSwitcher)`
  position: absolute;
  top: ${({ isLg }: any) => isLg ? px2rem(50) : px2rem(20)};
  border: ${px2rem(1)} solid ${transparentize(.85, "#202020")};
  border-radius: ${px2rem(10)};
`;
const Index: NextPage<TPageProps> = ({ isLg, title }) => {
  const router = useRouter();
  const handleBeforeClick = useCallback(() => {
    void router.push("/auth/wallet");
  }, [router]);
  const handleNeverClick = useCallback(() => {
    void router.push("/auth/password");
  }, [router]);

  return (
    <StyledLayout isLg={isLg}>
      <Head>
        <title>{title}</title>
      </Head>
      <StyledLanguageSwitcher isLg={isLg} />
      <FormattedMessage id="welcome" defaultMessage="Welcome to Qamon" tagName="h1" />
      <FormattedMessage
        id="your-gate"
        defaultMessage="Your gate to the trustless world of communication."
        tagName="p" />
      <FormattedMessage id="have-you-ever"
        defaultMessage="Have you ever used Qamon?"
        tagName="p" />
      <div>
        <Button primary={true} size={EButtonSize.Small} onClick={handleBeforeClick}>
          <FormattedMessage id="ive-used" defaultMessage="I've used Qamon before" tagName="span" />
        </Button>
        <Button primary={true} size={EButtonSize.Small} onClick={handleNeverClick}>
          <FormattedMessage id="first-time" defaultMessage="It's my first time with Qamon" tagName="span" />
        </Button>
      </div>
    </StyledLayout>
  );
};
export const getStaticProps = async () => {
  return {
    props: {
      title: appConfig.data.title,
    },
  };
};

export default Index;
