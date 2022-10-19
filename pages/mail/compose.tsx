import { NextPage } from "next";
import Head from "next/head";
import TPageProps from "../../models/types/TPageProps";
import { intl } from "../../common/intl";
import appConfig from "../../app.config";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ContentHeader from "../../components/headers/ContentHeader";
import styled, { StyledComponent } from "styled-components";
import { px2rem } from "../../common/lib";
import ComposeMailForm from "../../components/forms/ComposeMailForm";
import MobileLayout from "../../components/layouts/MobileLayout";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Window from "../../components/Window";
import { useToggle } from "ahooks";
import { useMitt } from "react-mitt";
import EEventType from "../../models/enums/EEventType";
import FileSizeErrorMessageForm from "../../components/forms/FileSizeErrorMessageForm";

const StyledContainer: StyledComponent<any, any> = styled.div`
  position: relative;
  padding: 0 ${px2rem(30)};
`;
const MobileStyledContainer: StyledComponent<any, any> = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
  max-height: calc(100vh - ${px2rem(42)});
  overflow-x: hidden;
  overflow-y: auto;
  padding: ${px2rem(20)};
  gap: ${px2rem(58)};
`;
const Compose: NextPage<TPageProps> = ({ isLg, title }) => {
  const [showWindow, { toggle }] = useToggle(false);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const { query } = useRouter();
  const { emitter } = useMitt();
  const handleToggleWindow = useCallback(() => {
    toggle();
  }, [toggle]);

  useEffect(() => {
    if (query) {
      setTo((
        query?.to as string
      ) ?? "");
      setSubject((
        query?.subject as string
      ) ?? "");
    }
  }, [query]);
  useEffect(() => {
    if (emitter) {
      emitter.on(EEventType.ShowFileSizeErrorMessageWindow, handleToggleWindow);

      return () => {
        emitter.off(EEventType.ShowFileSizeErrorMessageWindow, handleToggleWindow);
      };
    }
  }, [emitter, handleToggleWindow]);

  return (
    <>
      {!isLg && (
        <MobileLayout title={title?.split("-")?.[0]?.trim()} withBack={true}>
          <Head>
            <title>{title}</title>
          </Head>
          <Window visible={showWindow} onClose={handleToggleWindow}>
            <FileSizeErrorMessageForm onClose={handleToggleWindow} />
          </Window>
          <MobileStyledContainer>
            <ComposeMailForm isLg={isLg} to={to} subject={subject} />
          </MobileStyledContainer>
        </MobileLayout>
      )}
      {isLg && (
        <DashboardLayout>
          <Head>
            <title>{title}</title>
          </Head>
          <Window visible={showWindow} onClose={handleToggleWindow}>
            <FileSizeErrorMessageForm onClose={handleToggleWindow} />
          </Window>
          <ContentHeader title={title?.split("-")?.[0]?.trim()} withBack={true} />
          <StyledContainer>
            <ComposeMailForm isLg={isLg} to={to} subject={subject} />
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
        id: "compose-email",
        defaultMessage: "Compose email",
      })} - ${appConfig.data.title}`,
    },
  };
};

export default Compose;
