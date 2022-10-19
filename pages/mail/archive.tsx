import { NextPage } from "next";
import Head from "next/head";
import appConfig from "../../app.config";
import TPageProps from "../../models/types/TPageProps";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { intl } from "../../common/intl";
import SearchForm from "../../components/forms/SearchForm";
import ContentHeader from "../../components/headers/ContentHeader";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import DraftsRow from "../../components/rows/DraftsRow";
import styled, { StyledComponent } from "styled-components";
import Table from "../../components/Table";
import { px2rem } from "../../common/lib";
import TableHeader from "../../components/TableHeader";
import ECheckboxStatus from "../../models/enums/ECheckboxStatus";
import Button from "../../components/buttons/Button";
import Icon from "../../components/Icon";
import EIcon from "../../models/enums/EIcon";
import { tableContainer } from "../../styles/mixins";
import { useResponsive } from "ahooks";
import MobileLayout from "../../components/layouts/MobileLayout";

const StyledContainer: StyledComponent<any, any> = styled.div`
  ${tableContainer()};
`;
const StyledTable: StyledComponent<any, any> = styled(Table)`
  margin-top: ${px2rem(20)};
`;
const StyledPreloaderContainer: StyledComponent<any, any> = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const allIds = ["0", "1", "2", "3", "4"];
const Archive: NextPage<TPageProps> = ({ title }) => {
  const [pending, setPending] = useState(true);
  const [isLg, setIsLg] = useState(false);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState<string[]>([]);
  const { pathname, push } = useRouter();
  const responsive = useResponsive();
  const handleAllCheckboxClick = useCallback(() => {
    if (checkedCheckboxes.length === allIds.length) {
      setCheckedCheckboxes([]);
    } else {
      setCheckedCheckboxes([...allIds]);
    }
  }, [checkedCheckboxes]);
  const handleCheckAllClick = () => {
    setCheckedCheckboxes([...allIds]);
  };
  const handleCheckNoneClick = () => {
    setCheckedCheckboxes([]);
  };
  const handleNextPageClick = () => {
    alert("Next page click");
  };
  const handlePreviousPageClick = () => {
    alert("Previous page click");
  };
  const handleDecode = (ids: string[]) => {
    alert(`Decode ids: ${ids.join(",")}`);
  };
  const handleLockToggle = () => {
    handleDecode(allIds);
  };
  const handleCheckboxClick = (id: string) => {
    if (checkedCheckboxes.includes(id)) {
      setCheckedCheckboxes(checkedCheckboxes.filter(currentId => currentId !== id));
    } else {
      setCheckedCheckboxes(ids => [...ids, id]);
    }
  };
  const handleRowClick = (id: string) => {
    push(`${pathname}/${id}`);
  };
  const tableRows = (
    <>
      <DraftsRow
        checked={checkedCheckboxes.includes("0")}
        avatarColor={"#f27685"}
        name={"Fyodor Panteleev"}
        subject={"Mail subject"}
        text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
        folders={["#f27685", "#54d971", "#80a3ff"]}
        date={"12 June"}
        clickable={true}
        encrypted={false}
        onRowClick={() => handleRowClick("0")}
        onCheckboxClick={() => handleCheckboxClick("0")}
        onDecodeClick={() => handleDecode(["0"])} />
      <DraftsRow
        checked={checkedCheckboxes.includes("1")}
        avatarColor={"#54d971"}
        name={"Steve Jobs"}
        subject={"Hello"}
        text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
        folders={["#54d971", "#80a3ff"]}
        date={"12 June"}
        clickable={true}
        encrypted={false}
        onRowClick={() => handleRowClick("1")}
        onCheckboxClick={() => handleCheckboxClick("1")}
        onDecodeClick={() => handleDecode(["1"])} />
      <DraftsRow
        checked={checkedCheckboxes.includes("2")}
        avatarColor={"#ff8d4c"}
        name={"Bill Gates"}
        subject={"Hello World!"}
        text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
        folders={undefined}
        date={"12 June"}
        clickable={true}
        encrypted={false}
        onRowClick={() => handleRowClick("2")}
        onCheckboxClick={() => handleCheckboxClick("2")}
        onDecodeClick={() => handleDecode(["2"])} />
      <DraftsRow
        checked={checkedCheckboxes.includes("3")}
        avatarColor={"#80a3ff"}
        name={"Donald Trump"}
        subject={"Make America great again!"}
        text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
        folders={["#54d971", "#80a3ff"]}
        date={"12 June"}
        clickable={true}
        encrypted={false}
        onRowClick={() => handleRowClick("3")}
        onCheckboxClick={() => handleCheckboxClick("3")}
        onDecodeClick={() => handleDecode(["3"])} />
      <DraftsRow
        checked={checkedCheckboxes.includes("4")}
        avatarColor={"#de80ff"}
        name={"Peter Parker"}
        subject={"Some subject"}
        text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
        folders={["#54d971"]}
        date={"12 June"}
        clickable={true}
        encrypted={false}
        onRowClick={() => handleRowClick("4")}
        onCheckboxClick={() => handleCheckboxClick("4")}
        onDecodeClick={() => handleDecode(["4"])} />
    </>
  );

  useEffect(() => {
    setTimeout(() => {
      setPending(false);
    }, 1000);
  }, []);
  useEffect(() => {
    if (responsive) {
      setIsLg(responsive.lg);
    }
  }, [responsive]);

  return (
    <>
      {!isLg && (
        <MobileLayout>
          <Head>
            <title>{title}</title>
          </Head>
        </MobileLayout>
      )}
      {isLg && (
        <DashboardLayout>
          <Head>
            <title>{title}</title>
          </Head>
          <ContentHeader title={title?.split("-")?.[0]?.trim()} withLock={true} onLockToggle={handleLockToggle}>
            <SearchForm value={""} />
          </ContentHeader>
          {pending && (
            <StyledPreloaderContainer>

            </StyledPreloaderContainer>
          )}
          {!pending && (
            <>
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
                {
                  checkedCheckboxes.length > 0 && (
                    <Button onClick={() => {
                    }}>
                      <Icon name={EIcon.Unarchive} />
                    </Button>
                  )
                }
              </TableHeader>
              <StyledContainer>
                <StyledTable rows={tableRows} />
              </StyledContainer>
            </>
          )}
        </DashboardLayout>
      )}
    </>
  );
};
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      title: `${intl(locale).formatMessage({
        id: "archive",
        defaultMessage: "Archive"
      })} - ${appConfig.data.title}`
    }
  };
};

export default Archive;
