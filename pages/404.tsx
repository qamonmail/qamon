import { NextPage } from "next";
import Head from "next/head";
import appConfig from "../app.config";
import TPageProps from "../models/types/TPageProps";
import PageLayout from "../components/layouts/PageLayout";
import styled, { StyledComponent } from "styled-components";
import { px2rem } from "../common/lib";
import Button from "../components/buttons/Button";
import { useRouter } from "next/router";
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
const StyledButton: StyledComponent<any, any> = styled(Button)`
  margin-top: ${px2rem(30)};
`;
const Error404: NextPage<TPageProps> = ({ title }) => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.back();
  };

  return (
    <StyledLayout>
      <Head>
        <title>{title}</title>
      </Head>
      <FormattedMessage id="error-404" defaultMessage="Error 404" tagName="h1" />
      <FormattedMessage id="page-not-found" defaultMessage="Page not found" tagName="h5" />
      <StyledButton primary={true} onClick={handleButtonClick}>
        <FormattedMessage id="go-back" defaultMessage="Go back" tagName="span" />
      </StyledButton>
    </StyledLayout>
  );
};
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      title: `${intl(locale).formatMessage({
        id: "error-404",
        defaultMessage: "Error 404"
      })} - ${appConfig.data.title}`
    }
  };
};

export default Error404;
