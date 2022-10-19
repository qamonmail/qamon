import { NextPage } from "next";
import Head from "next/head";
import appConfig from "../app.config";
import TPageProps from "../models/types/TPageProps";
import PageLayout from "../components/layouts/PageLayout";
import styled, { StyledComponent } from "styled-components";
import { px2rem } from "../common/lib";
import { FormattedMessage } from "react-intl";
import { intl } from "../common/intl";

const StyledLayout: StyledComponent<any, any> = styled(PageLayout)`
  h1 {
    font-size: ${px2rem(72)};
    font-weight: 400;
    margin-top: ${px2rem(10)};
  }

  h5 {
    font-size: ${px2rem(24)};
    font-weight: 400;
    margin-top: ${px2rem(10)};
  }
`;
const Error500: NextPage<TPageProps> = ({ title }) => {
  return (
    <StyledLayout>
      <Head>
        <title>{title}</title>
      </Head>
      <FormattedMessage id="error-500" defaultMessage="Error 500" tagName="h1" />
      <FormattedMessage id="internal-error" defaultMessage="Internal error" tagName="h5" />
    </StyledLayout>
  );
};
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      title: `${intl(locale).formatMessage({
        id: "error-500",
        defaultMessage: "Error 500"
      })} - ${appConfig.data.title}`
    }
  };
};

export default Error500;
