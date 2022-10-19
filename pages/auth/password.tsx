import { NextPage } from "next";
import Head from "next/head";
import appConfig from "../../app.config";
import TPageProps from "../../models/types/TPageProps";
import PageLayout from "../../components/layouts/PageLayout";
import styled, { StyledComponent } from "styled-components";
import { FormattedMessage } from "react-intl";
import { px2rem } from "../../common/lib";
import { intl } from "../../common/intl";
import CreatePasswordForm from "../../components/forms/CreatePasswordForm";

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

    &:nth-of-type(n + 2) {
      font-weight: 500;
      margin-top: ${px2rem(20)};
      max-width: ${px2rem(350)};
      line-height: ${px2rem(20)};
      text-align: center;

      @media (min-width: 992px) {
        margin-top: ${px2rem(30)};
        line-height: ${px2rem(24)};
      }
    }

    @media (min-width: 992px) {
      font-size: ${px2rem(18)};
    }
  }
`;
const Password: NextPage<TPageProps> = ({ title }) => {
  return (
    <StyledLayout>
      <Head>
        <title>{title}</title>
      </Head>
      <FormattedMessage id="create-password" defaultMessage="Create password" tagName="h1" />
      <FormattedMessage id="this-password"
        defaultMessage="This password will be used to encrypt and decrypt your mails."
        tagName="p" />
      <FormattedMessage id="please-save"
        defaultMessage="Please save it securely, because if you lose it, you will not be able to access your mail."
        tagName="p" />
      <FormattedMessage id="qamon-doesnt-save"
        defaultMessage="Qamon doesn't save your password anywhere, and we won't be able to help you recover it."
        tagName="p" />
      <CreatePasswordForm />
    </StyledLayout>
  );
};
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      title: `${intl(locale).formatMessage({
        id: "create-password",
        defaultMessage: "Create password"
      })} - ${appConfig.data.title}`
    }
  };
};

export default Password;
