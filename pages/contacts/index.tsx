import { NextPage } from "next";
import Head from "next/head";
import styled, { StyledComponent } from "styled-components";
import appConfig from "../../app.config";
import TPageProps from "../../models/types/TPageProps";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { intl } from "../../common/intl";
import ContentHeader from "../../components/headers/ContentHeader";
import SearchForm from "../../components/forms/SearchForm";
import Button from "../../components/buttons/Button";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import Table from "../../components/Table";
import { px2rem } from "../../common/lib";
import ContactsRow from "../../components/rows/ContactsRow";
import { useRouter } from "next/router";
import { tableContainer } from "../../styles/mixins";
import MobileLayout from "../../components/layouts/MobileLayout";
import Preloader from "../../components/Preloader";
import { FormattedMessage } from "react-intl";
import { useStore } from "../../storeZ";
import EButtonSize from "../../models/enums/EButtonSize";
import ECheckboxStatus from "../../models/enums/ECheckboxStatus";
import TableHeader from "../../components/TableHeader";

const StyledContainer: StyledComponent<any, any> = styled.div`
  position: relative;
  flex: 1;
  ${tableContainer()};

  & > section {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > p {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: ${px2rem(32)};
      font-weight: 500;
      margin-bottom: ${px2rem(30)};
    }

    & > button {
      width: ${px2rem(268)};
    }
  }
`;
const MobileStyledContainer: StyledComponent<any, any> = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  max-height: calc(100vh - ${px2rem(42)});
  min-height: calc(100vh - ${px2rem(42)});
  overflow-x: hidden;
  overflow-y: auto;

  & > section {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > p {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: ${px2rem(24)};
      font-weight: 400;
      margin-bottom: ${px2rem(30)};
    }

    & > button {
      width: ${px2rem(155)};
    }
  }
`;
const StyledBottomPreloaderContainer: StyledComponent<any, any> = styled.div`
  position: relative;
  min-height: ${px2rem(26)};
  width: 100%;
  overflow: hidden;
  margin-bottom: ${px2rem(20)};
`;
const Contacts: NextPage<TPageProps> = ({ isLg, title }) => {
  const [pending, setPending] = useState(true);
  const [bottomPending, setBottomPending] = useState(false);
  const { contacts } = useStore(store => store);
  const router = useRouter();
  const [checkedCheckboxes, setCheckedCheckboxes] = useState<string[]>([]);
  const containerRef = useRef<HTMLElement>(null);
  const handleAllCheckboxClick = () => {
  };
  const handleCheckAllClick = () => {
  };
  const handleCheckNoneClick = () => {
    setCheckedCheckboxes([]);
  };
  const handleCreateContactClick = () => {
    void router.push("/contacts/edit");
  };
  const handleDeleteContactClick = () => {
  };
  const handleNextPageClick = () => {
    alert("Next page click");
  };
  const handlePreviousPageClick = () => {
    alert("Previous page click");
  };
  const handleTouchMove = useCallback(() => {

  }, [containerRef]);
  const tableRows = (
    <>
      {contacts?.map(item => (
        <ContactsRow
          key={item.id}
          checked={checkedCheckboxes.includes("0")}
          address="0:9ee55e89c3b48603d34d65f67e4c638863a1a3920b79dd662d7cd8c484f77445"
          avatarColor="#F27685"
          pinned={false}
          name="ignat.ylide"
          onRowClick={() => {
          }}
          onCheckboxClick={() => {
          }}
          onPinClick={() => {
          }}
          onSendMessageClick={() => {
          }} />
      ))}
    </>
  );

  useEffect(() => {
    if (contacts !== null) {
      setPending(false);
      setBottomPending(false);
    }
  }, [contacts]);

  return (
    <>
      {!isLg && (
        <MobileLayout title={title?.split("-")?.[0]?.trim()}>
          <Head>
            <title>{title}</title>
          </Head>
          <MobileStyledContainer ref={containerRef} onTouchMove={handleTouchMove}>
            {pending && <Preloader size={200} />}
            {!pending &&
              (
                contacts?.length || 0
              ) > 0 && <Table rows={tableRows} isLg={isLg} />}
            {!pending && contacts?.length === 0 &&
              <section>
                <FormattedMessage id="no-new-mail" defaultMessage="You have no mails yet" tagName="p" />
                <Button primary={true} onClick={() => {
                }}>
                  <FormattedMessage id="compose-email" defaultMessage="Compose email" tagName="span" />
                </Button>
              </section>
            }
            {bottomPending && (
              <StyledBottomPreloaderContainer>
                <Preloader size={100} />
              </StyledBottomPreloaderContainer>
            )}
          </MobileStyledContainer>
        </MobileLayout>
      )}
      {isLg && (
        <DashboardLayout>
          <Head>
            <title>{title}</title>
          </Head>
          <ContentHeader
            title={title?.split("-")?.[0]?.trim()}
            // count={5}
          >
            <SearchForm value={""} />
          </ContentHeader>
          <TableHeader
            checkboxStatus={checkedCheckboxes.length === 0
              ? ECheckboxStatus.Unchecked
              : checkedCheckboxes.length < 5
                ? ECheckboxStatus.Half
                : ECheckboxStatus.Checked}
            nextDisabled={true}
            previousDisabled={true}
            onCheck={handleAllCheckboxClick}
            onAllCheck={handleCheckAllClick}
            onNoneCheck={handleCheckNoneClick}
            onNextClick={handleNextPageClick}
            onPreviousClick={handlePreviousPageClick}>
            {/*{
             checkedCheckboxes.length > 0 && (
             <Button onClick={() => {
             }}>
             <Icon name={EIcon.Archive} />
             </Button>
             )
             }*/}
          </TableHeader>
          <StyledContainer>
            {pending && <Preloader size={200} />}
            {!pending &&
              (
                contacts?.length || 0
              ) > 0 && <Table rows={tableRows} isLg={isLg} />}
            {!pending && contacts?.length === 0 &&
              <section>
                <FormattedMessage id="no-new-mail" defaultMessage="You have no mails yet" tagName="p" />
                <Button primary={true} size={EButtonSize.Big} onClick={() => {
                }}>
                  <FormattedMessage id="compose-email" defaultMessage="Compose email" tagName="span" />
                </Button>
              </section>
            }
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
        id: "contacts",
        defaultMessage: "Contacts",
      })} - ${appConfig.data.title}`,
    },
  };
};

export default memo(Contacts);
