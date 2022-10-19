import { NextPage } from "next";
import Head from "next/head";
import TPageProps from "../../models/types/TPageProps";
import { intl } from "../../common/intl";
import appConfig from "../../app.config";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ContentHeader from "../../components/headers/ContentHeader";
import SignatureForm from "../../components/forms/SignatureForm";
import styled, { StyledComponent } from "styled-components";
import { px2rem } from "../../common/lib";
import MobileLayout from "../../components/layouts/MobileLayout";

const StyledContainer: StyledComponent<any, any> = styled.div`
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
  padding: ${px2rem(20)};
  gap: ${px2rem(58)};
`;
const Signature: NextPage<TPageProps> = ({ isLg, title }) => {
  return (
    <>
      {!isLg && (
        <MobileLayout title={title?.split("-")?.[0]?.trim()} withBack={true}>
          <Head>
            <title>{title}</title>
          </Head>
          <MobileStyledContainer>
            <SignatureForm />
          </MobileStyledContainer>
        </MobileLayout>
      )}
      {isLg && (
        <DashboardLayout>
          <Head>
            <title>{title}</title>
          </Head>
          <ContentHeader title={title?.split("-")?.[0]?.trim()} withBack={true} />
          <StyledContainer>
            <SignatureForm />
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
        id: "signature",
        defaultMessage: "Signature"
      })} - ${intl(locale).formatMessage({
        id: "settings",
        defaultMessage: "Settings"
      })} - ${appConfig.data.title}`
    }
  };
};

export default Signature;
