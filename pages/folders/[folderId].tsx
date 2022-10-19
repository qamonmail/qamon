import { NextPage } from "next";
import Head from "next/head";
import styled, { StyledComponent } from "styled-components";
import appConfig from "../../app.config";
import TPageProps from "../../models/types/TPageProps";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { intl } from "../../common/intl";
import ContentHeader from "../../components/headers/ContentHeader";
import SearchForm from "../../components/forms/SearchForm";
import Table from "../../components/Table";
import { px2rem } from "../../common/lib";
import ECheckboxStatus from "../../models/enums/ECheckboxStatus";
import { useCallback, useEffect, useState } from "react";
import TableHeader from "../../components/TableHeader";
import InboxRow from "../../components/rows/InboxRow";
import { useRouter } from "next/router";
import Icon from "../../components/Icon";
import EIcon from "../../models/enums/EIcon";
import Button from "../../components/buttons/Button";
import { useResponsive } from "ahooks";

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
const FolderId: NextPage<TPageProps> = ({ title }) => {
  const [pending, setPending] = useState(true);
  const [isLg, setIsLg] = useState(false);
  const responsive = useResponsive();
  const [checkedCheckboxes, setCheckedCheckboxes] = useState<string[]>([]);
  const { push } = useRouter();
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
  const handleBookmarkClick = (id: string) => {
    alert(`${id} - Bookmark click`);
  };
  const handleRowClick = (id: string) => {
    push(`/inbox/${id}`);
  };
  const tableRows = (
    <>
      <InboxRow
        isLg={isLg}
        bookmarked={false}
        checked={checkedCheckboxes.includes("0")}
        avatarColor={"#f27685"}
        name={"Fyodor Panteleev"}
        subject={"Mail subject"}
        text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
        folders={["#f27685", "#54d971", "#80a3ff"]}
        date={"12 June"}
        clickable={true}
        encrypted={true}
        onRowClick={() => handleRowClick("0")}
        onBookmarkClick={() => handleBookmarkClick("0")}
        onCheckboxClick={() => handleCheckboxClick("0")}
        onDecodeClick={() => handleDecode(["0"])} />
      <InboxRow
        isLg={isLg}
        bookmarked={false}
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
        onBookmarkClick={() => handleBookmarkClick("1")}
        onCheckboxClick={() => handleCheckboxClick("1")}
        onDecodeClick={() => handleDecode(["1"])} />
      <InboxRow
        isLg={isLg}
        bookmarked={true}
        checked={checkedCheckboxes.includes("2")}
        avatarColor={"#ff8d4c"}
        name={"Bill Gates"}
        subject={"Hello World!"}
        text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
        folders={undefined}
        date={"12 June"}
        clickable={true}
        encrypted={true}
        onRowClick={() => handleRowClick("2")}
        onBookmarkClick={() => handleBookmarkClick("2")}
        onCheckboxClick={() => handleCheckboxClick("2")}
        onDecodeClick={() => handleDecode(["2"])} />
      <InboxRow
        isLg={isLg}
        bookmarked={false}
        checked={checkedCheckboxes.includes("3")}
        avatarColor={"#80a3ff"}
        name={"Donald Trump"}
        subject={"Make America great again!"}
        text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
        folders={["#54d971", "#80a3ff"]}
        date={"12 June"}
        clickable={true}
        encrypted={true}
        onRowClick={() => handleRowClick("3")}
        onBookmarkClick={() => handleBookmarkClick("3")}
        onCheckboxClick={() => handleCheckboxClick("3")}
        onDecodeClick={() => handleDecode(["3"])} />
      <InboxRow
        isLg={isLg}
        bookmarked={false}
        checked={checkedCheckboxes.includes("4")}
        avatarColor={"#de80ff"}
        name={"Peter Parker"}
        subject={"Some subject"}
        text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
        folders={["#54d971"]}
        date={"12 June"}
        clickable={true}
        encrypted={true}
        onRowClick={() => handleRowClick("4")}
        onBookmarkClick={() => handleBookmarkClick("4")}
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
    <DashboardLayout>
      <Head>
        <title>{title}</title>
      </Head>
      <ContentHeader
        title={title?.split("-")?.[0]?.trim()}
        count={5}
        withLock={true}
        withBack={true}
        locked={true}
        onLockToggle={handleLockToggle}>
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
                <section>
                  <Button onClick={() => {
                  }}>
                    <Icon name={EIcon.Move} />
                  </Button>
                  <Button onClick={() => {
                  }}>
                    <Icon name={EIcon.Archive} />
                  </Button>
                  <Button onClick={() => {
                  }}>
                    <Icon name={EIcon.Delete} />
                  </Button>
                </section>
              )
            }
          </TableHeader>
          <StyledTable rows={tableRows} />
        </>
      )}
    </DashboardLayout>
  );
};
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      title: `${intl(locale).formatMessage({
        id: "folder",
        defaultMessage: "Folder"
      })} - ${appConfig.data.title}`
    }
  };
};
export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          folderId: "0"
        }
      }
    ],
    fallback: true
  };
};

export default FolderId;
