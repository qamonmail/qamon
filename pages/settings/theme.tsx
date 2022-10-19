import { NextPage } from "next";
import Head from "next/head";
import TPageProps from "../../models/types/TPageProps";
import { intl } from "../../common/intl";
import appConfig from "../../app.config";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ContentHeader from "../../components/headers/ContentHeader";
import ThemeForm from "../../components/forms/ThemeForm";
import styled, { StyledComponent } from "styled-components";
import { px2rem } from "../../common/lib";

const StyledContainer: StyledComponent<any, any> = styled.div`
  padding: 0 ${px2rem(30)};
`;
const Theme: NextPage<TPageProps> = ({ title }) => {
  return (
    <DashboardLayout>
      <Head>
        <title>{title}</title>
      </Head>
      <ContentHeader title={title?.split("-")?.[0]?.trim()} withBack={true} />
      <StyledContainer>
        <ThemeForm />
      </StyledContainer>
    </DashboardLayout>
  );
};
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      title: `${intl(locale).formatMessage({
        id: "color-theme",
        defaultMessage: "Color theme"
      })} - ${intl(locale).formatMessage({
        id: "settings",
        defaultMessage: "Settings"
      })} - ${appConfig.data.title}`
    }
  };
};

export default Theme;
