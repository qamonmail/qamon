import { BaseSyntheticEvent, FunctionComponent, useRef } from "react";
import styled, { StyledComponent } from "styled-components";
import Icon from "../Icon";
import EIcon from "../../models/enums/EIcon";
import { FormattedMessage } from "react-intl";
import { px2rem } from "../../common/lib";
import { size, transparentize } from "polished";
import { symmetricEncrypt } from "@ylide/sdk";
import { useMitt } from "react-mitt";
import EEventType from "../../models/enums/EEventType";

type TUploadFileButton = {
  filesCounter: number;
  setFiles: any;
  setFilesData: any;
  setFilesCript: any;
  key32: any;
  setFilesSetReqest: any;
  setFilesStatuses: (prev: any) => void;
};

const StyledLabel: StyledComponent<any, any> = styled.label`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${px2rem(10)};
  background-color: transparent;
  border: none;
  padding: 0 ${px2rem(14)};
  height: ${px2rem(40)};
  border-radius: ${px2rem(10)};
  cursor: pointer;
  transition: all .15s;
  top: ${px2rem(0)};
  right: ${px2rem(0)};

  & > svg {
    ${size(px2rem(20))};
    fill: var(--active-color);

    @media (min-width: 992px) {
      ${size(px2rem(14))};
    }
  }

  & > span {
    display: none;
    font-size: ${px2rem(16)};
    font-weight: 400;
    color: var(--active-color);

    @media (min-width: 992px) {
      display: block;
    }
  }

  & > input {
    display: none;
  }

  &:not([data-disabled="true"])::after {
    content: "";
    display: block;
    position: absolute;
    border-radius: ${px2rem(10)};
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    box-shadow: 0 0 ${px2rem(20)} var(--active-color);
    transition: all .35s;
  }

  &:not([data-disabled="true"]):active {
    transform: scale(.95);

    @media (min-width: 992px) {
      &::after {
        box-shadow: 0 0 0 transparent;
        position: absolute;
        border-radius: ${px2rem(10)};
        left: 0;
        top: 0;
        opacity: 1;
        transition: 0s;
      }
    }
  }

  &[data-disabled="true"] {
    opacity: .5;
    filter: grayscale(1);
    cursor: not-allowed;
  }

  @media (min-width: 992px) {
    position: relative;
    top: auto;
    right: auto;
    border: ${px2rem(1)} solid ${transparentize(.85, "#202020")};
    background-color: white;
  }
`;
const UploadFileButton: FunctionComponent<TUploadFileButton> = ({
  filesCounter,
  key32,
  setFiles,
  setFilesCript,
  setFilesData,
  setFilesSetReqest,
  setFilesStatuses,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { emitter } = useMitt();
  const uint8array = (props: string) => new TextEncoder().encode(props);
  const handleLoad = (e: any) => {
    const { result } = e.target;
    setFilesData((prev: any[]) => [...prev, result]);
  };
  const blobToBase64 = (blob: any) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };
  const handleChange = async (e: BaseSyntheticEvent) => {
    const { files } = e.target;
    const fileReader = new FileReader();
    fileReader.onload = handleLoad;
    const file = files.item(0);

    if (file) {
      if (file.size / 1024 / 1024 > 10) {
        emitter.emit(EEventType.ShowFileSizeErrorMessageWindow);
        return;
      }

      const fileBuffer = await file.arrayBuffer();
      const encryptFile = await symmetricEncrypt(new Uint8Array(fileBuffer), uint8array(key32));

      setFiles((prev: any[]) => [...prev, file]);
      setFilesCript((prev: any[]) => [...prev, encryptFile]);
      blobToBase64(new Blob([encryptFile])).then((item) => {
        setFilesStatuses((prev: ("pending" | "attached")[]) => {
          const statuses = [...prev];
          statuses[filesCounter] = "pending";
          return statuses;
        });
        // https://cors-anywhere.herokuapp.com/https://app.qamon.io
        fetch("/v1/ipfs/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
          },
          body: JSON.stringify({
            image: item,
          }),
        })
          .then(response => response.json())
          .then(data => {
            setFilesSetReqest((prev: any[]) => [...prev, { ...data, name: file.name }]);
            setFilesStatuses((prev: ("pending" | "attached")[]) => {
              const statuses = [...prev];
              statuses[filesCounter] = "attached";
              return statuses;
            });
          });
      });
      fileReader.readAsDataURL(file);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <StyledLabel>
      <Icon name={EIcon.Attach} />
      <FormattedMessage id="attach" defaultMessage="Attach files" tagName="span" />
      <input ref={inputRef} type="file" onChange={handleChange} />
    </StyledLabel>
  );
};

export default UploadFileButton;
