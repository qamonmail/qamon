import { FunctionComponent, memo, useCallback, useEffect, useState } from "react";
import styled, { StyledComponent } from "styled-components";
import { FormattedMessage } from "react-intl";
import { px2rem } from "../../common/lib";
import { size, transparentize } from "polished";
import Icon from "../Icon";
import EIcon from "../../models/enums/EIcon";
import EButtonType from "../../models/enums/EButtonType";
import Image from "next/image";
import EFileType from "../../models/enums/EFileType";
import Preloader from "../Preloader";
import { IFile } from "../../models/interfaces/IFile";

type TFilesFormProps = {
  editable: boolean;
  files: File[] | IFile[];
  filesData: string[];
  filesStatuses: ("pending" | "attached")[] | null;
  isLg: boolean;
  onClick?: (file: IFile) => void;
  resetAttachDisabled?: () => void;
  setFiles: any;
  setFilesData: any;
  setFilesSetRequest?: any;
};

type TFileBlockProps = {
  editable: boolean;
  file: File | IFile;
  fileData: string;
  isLg: boolean;
  status: "pending" | "attached" | null;
  onDelete: () => void;
  onClick?: (file: IFile) => void;
};

const StyledContainer: StyledComponent<any, any> = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(14)};
  margin: ${px2rem(10)} 0;

  & > header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${px2rem(16)};

    & > strong {
      display: flex;
      flex-direction: row;
      gap: ${px2rem(5)};
      font-size: ${px2rem(16)};
      font-weight: 400;
      color: var(--active-color);
    }

    & > span {
      display: flex;
      flex-direction: row;
      gap: ${px2rem(5)};
      font-size: ${px2rem(16)};
      font-weight: 400;
      color: ${transparentize(.5, "#202020")};

      & > span {
        color: ${transparentize(.5, "#202020")};
      }
    }

    & > button {
      background: none;
      border: none;
      font-size: ${px2rem(16)};
      font-weight: 400;
      color: var(--active-color);
      cursor: pointer;
    }
  }

  & > section {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: ${px2rem(16)};

    & > article {
      position: relative;
      display: flex;
      flex-direction: row;
      gap: ${px2rem(10)};
      cursor: ${({ editable, isLg }: TFilesFormProps) => (
              !isLg && !editable
      ) ? "not-allowed" : !editable ? "pointer" : "default"};

      & > div {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        ${size(px2rem(48))};
        background-color: #f2f2f2;
        border-radius: ${px2rem(8)};
        overflow: hidden;

        & > img {
          position: absolute;
          max-width: ${px2rem(100)};
          max-height: ${px2rem(100)};
          top: 0;
          left: 0;
        }

        & > svg {
          &:nth-of-type(1) {
            position: absolute;
            ${size(18)};
            top: calc(50% - ${px2rem(9)});
          }

          &:nth-of-type(2) {
            ${size(36)};
            margin-top: ${px2rem(6)};

            @media (min-width: 992px) {
              margin-top: ${px2rem(16)};
            }
          }

          &[data-icon="lock"],
          &[data-icon="refresh"] {
            position: absolute;
            ${size(16)};
            margin-top: 0;
            top: ${px2rem(16)};
            fill: var(--red-color);
          }

          &[data-icon="refresh"] {
            top: ${px2rem(26)};
          }
        }

        &[data-image="true"] {
          background-color: transparent;
        }

        @media (min-width: 992px) {
          ${size(px2rem(70))};
          border-radius: 0;
        }
      }

      & > section {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: ${px2rem(5)};
        overflow: hidden;
        text-overflow: ellipsis;

        & > span {
          font-size: ${px2rem(12)};
          font-weight: 400;
          line-height: ${px2rem(13)};
          color: var(--active-color);
          max-width: calc(100vw - ${({ editable }: TFilesFormProps) => editable ? px2rem(145) : px2rem(60)});
          text-align: left;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          &:nth-of-type(2) {
            color: ${({ isLg, editable }: TFilesFormProps) => (
                    isLg || editable
            ) ? transparentize(.5, "#202020") : "var(--red-color)"};

            @media (min-width: 992px) {
              display: none;
            }
          }

          @media (min-width: 992px) {
            font-size: ${px2rem(11)};
            text-align: center;
            color: ${transparentize(.5, "#202020")};
            white-space: normal;
            max-width: ${px2rem(70)};
          }
        }
      }

      & > button {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        ${size(px2rem(32))};
        background-color: var(--inactive-color);
        border: none;
        border-radius: ${px2rem(8)};
        cursor: pointer;
        top: auto;
        right: auto;
        overflow: hidden;
        align-self: center;
        margin-left: auto;
        padding: ${px2rem(8.4)};
        z-index: 100;

        & > svg {
          fill: var(--active-color);
          ${size(px2rem(16))};

          @media (min-width: 992px) {
            ${size(px2rem(13.5))};
            fill: ${transparentize(.5, "#202020")};
          }
        }

        @media (min-width: 992px) {
          ${size(px2rem(13.5))};
          position: absolute;
          display: none;
          top: ${px2rem(-3)};
          right: ${px2rem(-3)};
          margin-left: 0;
          background-color: white;
          padding: 0;
          border-radius: 0;
        }
      }

      &:hover > button {
        display: flex;
      }

      @media (min-width: 992px) {
        flex-direction: column;
        gap: ${px2rem(5)};
      }
    }

    @media (min-width: 992px) {
      flex-direction: row;
    }
  }

  @media (min-width: 992px) {
    max-width: ${px2rem(800)};
  }
`;
const imageTypes = [EFileType.Png, EFileType.Jpg, EFileType.Gif];
const FileBlock: FunctionComponent<TFileBlockProps> = ({
  editable,
  file,
  fileData,
  isLg,
  status,
  onDelete,
  onClick,
}) => {
  const [downloadStatus, setDownloadStatus] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
  const getFileIcon = useCallback(() => {
    if (file) {
      switch (true) {
        case imageTypes.includes(file.type as EFileType) && !!fileData:
          return <Image src={fileData} alt={file.name} width={70} height={70} />;

        case file.type === EFileType.Pdf:
          return <Icon name={EIcon.Pdf} />;

        case file.type === EFileType.Docx:
          return <Icon name={EIcon.Word} />;

        case file.type === EFileType.Xlsx:
          return <Icon name={EIcon.Excel} />;

        default:
          return <Icon name={EIcon.Attach} />;
      }
    }
  }, [file, fileData]);
  const onClickCallback = useCallback(async () => {
    if (isLg && !editable && onClick) {
      setDownloadStatus(true);
      try {
        await onClick(file as IFile);
      } catch {
        setDownloadError(true);
      }
      setDownloadStatus(false);
    }
  }, [isLg, editable, onClick, file]);

  return (
    <article onClick={onClickCallback}>
      <div>
        {(
          status === "pending" || downloadStatus
        ) && <Preloader size={70} background="#ffffff" />}
        {editable && getFileIcon()}
        {!editable &&
          (
            isLg ?
              (
                downloadError ? <Icon name={EIcon.Refresh} /> : <Icon name={EIcon.Attach} />
              ) :
              <Icon name={EIcon.Lock} />
          )}
        {(
          !(
            file instanceof File
          ) || !imageTypes.includes(file.type as EFileType)
        ) && <Icon name={EIcon.File} />}
      </div>
      <section>
        <span>
          {file.name}
          {!isLg && editable && " - "}
          {!isLg && editable && file instanceof File && Math.round(file.size * 100 / 1024 / 1024) / 100}
          {!isLg && editable && "Mb"}
        </span>
        {(
          isLg || editable
        ) && status === "attached" && <FormattedMessage id="attached" defaultMessage="Attached" tagName="span" />}
        {(
          isLg || editable
        ) && status === "pending" && <FormattedMessage id="loading" defaultMessage="Loading..." tagName="span" />}
        {!isLg &&
          !editable &&
          <FormattedMessage id="in-web-version"
            defaultMessage="Downloading is available only in Web version"
            tagName="span" />}
      </section>
      {editable && (
        <button type={EButtonType.Button} onClick={onDelete}>
          <Icon name={EIcon.Delete} />
        </button>
      )}
    </article>
  );
};
const FilesForm: FunctionComponent<TFilesFormProps> = ({
  editable,
  isLg,
  files,
  setFiles,
  filesData,
  filesStatuses,
  setFilesData,
  onClick,
  resetAttachDisabled,
  setFilesSetRequest,
}) => {
  const [count, setCount] = useState(0);
  const [weight, setWeight] = useState<number | null>(null);
  const handleDeleteAllClick = useCallback(() => {
    setFiles([]);
    setFilesData([]);
    resetAttachDisabled && resetAttachDisabled();
  }, [setFiles, setFilesData, resetAttachDisabled]);
  const handleDeleteOneClick = useCallback((i: number) => {
    setFiles((prevFiles: File[]) => [...prevFiles.filter((_: File, j: number) => j !== i)]);
    setFilesData((prevData: string[]) => [...prevData.filter((_: string, j: number) => j !== i)]);
    resetAttachDisabled && resetAttachDisabled();
    setFilesSetRequest((prevFilesSet: any[]) => [...prevFilesSet.filter((_: File, j: number) => j !== i)]);
  }, [setFiles, setFilesData, resetAttachDisabled, setFilesSetRequest]);

  useEffect(() => {
    if (files.length > 0) {
      setCount(files.length);
      if (files[0] instanceof File) {
        setWeight((
          files as File[]
        ).reduce((prevValue: number, currentFile: File) => prevValue + currentFile.size, 0));
      }
    }
  }, [files]);

  return (
    <>
      {files.length === 0 && <></>}
      {files.length > 0 && (
        <StyledContainer editable={editable} isLg={isLg}>
          <header>
            {(
              !editable || !isLg
            ) && <FormattedMessage id="attachments" defaultMessage="Attachments" tagName="span" />}
            <strong>
              {count}
              <FormattedMessage id="files" defaultMessage="files" tagName="span" />
            </strong>
            <span>
              {weight !== null && Math.round(weight * 100 / 1024 / 1024) / 100}
              {weight && <span>Mb</span>}
            </span>
            {editable && (
              <button type={EButtonType.Button} onClick={handleDeleteAllClick}>
                <FormattedMessage id="delete-all" defaultMessage="Delete all" tagName="span" />
              </button>
            )}
          </header>
          <section>
            {files.map((file: File | IFile, i: number) => (
              <FileBlock
                key={i}
                editable={editable}
                isLg={isLg}
                file={file}
                fileData={filesData[i]}
                status={filesStatuses?.[i] || null}
                onDelete={() => handleDeleteOneClick(i)}
                onClick={onClick} />
            ))}
          </section>
        </StyledContainer>
      )}
    </>
  );
};

export default memo(FilesForm);
