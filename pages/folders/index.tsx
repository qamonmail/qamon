import { NextPage } from "next";
import Head from "next/head";
import styled, { StyledComponent } from "styled-components";
import TPageProps from "../../models/types/TPageProps";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Table from "../../components/Table";
import Button from "../../components/buttons/Button";
import Icon from "../../components/Icon";
import EIcon from "../../models/enums/EIcon";
import { px2rem } from "../../common/lib";
import ECheckboxStatus from "../../models/enums/ECheckboxStatus";
import appConfig from "../../app.config";
import { intl } from "../../common/intl";
import ContentHeader from "../../components/headers/ContentHeader";
import SearchForm from "../../components/forms/SearchForm";
import TableHeader from "../../components/TableHeader";
import { useCallback, useEffect, useState } from "react";
import FoldersRow from "../../components/rows/FoldersRow";
import { useRouter } from "next/router";
import { tableContainer } from "../../styles/mixins";

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
const Folders: NextPage<TPageProps> = ({ title }) => {
  const [pending, setPending] = useState(true);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState<string[]>([]);
  const router = useRouter();
  const handlePinClick = (id: string) => {
    alert(`${id} - Pin click`);
  };
  const handleEditClick = (id: string) => {
    alert(`${id} - Edit click`);
  };
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
  const handleAddFolderClick = () => {
    router.push("/folders/edit");
  };
  const handleDeleteFolderClick = () => {
    alert(`Delete contacts: ${checkedCheckboxes.join(",")}`);
  };
  const handleNextPageClick = () => {
    alert("Next page click");
  };
  const handlePreviousPageClick = () => {
    alert("Previous page click");
  };
  const handleCheckboxClick = (id: string) => {
    if (checkedCheckboxes.includes(id)) {
      setCheckedCheckboxes(checkedCheckboxes.filter(currentId => currentId !== id));
    } else {
      setCheckedCheckboxes(ids => [...ids, id]);
    }
  };
  const handleFolderClick = (id: string) => {
    router.push(`/folders/${id}`);
  };
  const tableRows = (
    <>
      <FoldersRow
        checked={checkedCheckboxes.includes("0")}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        pinColor="#f27685"
        pinned={true}
        title="Folder 1"
        onCheckboxClick={() => handleCheckboxClick("0")}
        onPinClick={() => handlePinClick("0")}
        onEditClick={() => handleEditClick("0")}
        onRowClick={() => handleFolderClick("0")} />
      <FoldersRow
        checked={checkedCheckboxes.includes("1")}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        pinColor="#54d971"
        pinned={false}
        title="Folder 2"
        onCheckboxClick={() => handleCheckboxClick("1")}
        onPinClick={() => handlePinClick("1")}
        onEditClick={() => handleEditClick("1")}
        onRowClick={() => handleFolderClick("0")} />
      <FoldersRow
        checked={checkedCheckboxes.includes("2")}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        pinColor="#ff8d4c"
        pinned={false}
        title="Folder 3"
        onCheckboxClick={() => handleCheckboxClick("2")}
        onPinClick={() => handlePinClick("2")}
        onEditClick={() => handleEditClick("2")}
        onRowClick={() => handleFolderClick("0")} />
      <FoldersRow
        checked={checkedCheckboxes.includes("3")}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        pinColor="#80a3ff"
        pinned={false}
        title="Folder 4"
        onCheckboxClick={() => handleCheckboxClick("3")}
        onPinClick={() => handlePinClick("3")}
        onEditClick={() => handleEditClick("3")}
        onRowClick={() => handleFolderClick("0")} />
      <FoldersRow
        checked={checkedCheckboxes.includes("4")}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        pinColor="#de80ff"
        pinned={false}
        title="Folder 5"
        onCheckboxClick={() => handleCheckboxClick("4")}
        onPinClick={() => handlePinClick("4")}
        onEditClick={() => handleEditClick("4")}
        onRowClick={() => handleFolderClick("0")} />
    </>
  );

  useEffect(() => {
    setTimeout(() => {
      setPending(false);
    }, 1000);
  }, []);

  return (
    <DashboardLayout>
      <Head>
        <title>{title}</title>
      </Head>
      <ContentHeader title={title?.split("-")?.[0]?.trim()}>
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
            {checkedCheckboxes.length === 0 && (
              <Button onClick={handleAddFolderClick}>
                <Icon name={EIcon.Add} />
              </Button>
            )}
            {(
              checkedCheckboxes.length > 0
            ) && (
              <Button onClick={handleDeleteFolderClick}>
                <Icon name={EIcon.Delete} />
              </Button>
            )}
          </TableHeader>
          <StyledContainer>
            <StyledTable rows={tableRows} />
          </StyledContainer>
        </>
      )}
    </DashboardLayout>
  );
};
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      title: `${intl(locale).formatMessage({
        id: "folders",
        defaultMessage: "Folders"
      })} - ${appConfig.data.title}`
    }
  };
};

export default Folders;
