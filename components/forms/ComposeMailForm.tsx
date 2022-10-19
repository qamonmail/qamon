import { FunctionComponent, memo, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { intl } from "../../common/intl";
import { useRouter } from "next/router";
import styled, { StyledComponent } from "styled-components";
import { px2rem } from "../../common/lib";
import { errorMessage, formButtons, formContainer, formItem, input } from "../../styles/mixins";
import Button from "../buttons/Button";
import Icon from "../Icon";
import EIcon from "../../models/enums/EIcon";
import { FormattedMessage } from "react-intl";
import EButtonType from "../../models/enums/EButtonType";
import { useStore } from "../../storeZ";
import { MessageContentV3 } from "@ylide/sdk";
import { routes } from "../../consts/routes";
import UploadFileButton from "../buttons/UploadFileButton";
import FilesForm from "./FilesForm";
import Overlay from "../Overlay";
import appConfig from "../../app.config";
import { EVMNetwork } from "@ylide/ethereum";
import rocketAnimation from "../../animations/rocket.json";
import { size } from "polished";
import Lottie from "lottie-react";
import useLocalStorage from "../../hooks/useLocalStorage";

type TComposeMailFormProps = {
  isLg: boolean;
  subject?: string;
  to?: string;
};

const StyledForm: StyledComponent<any, any> = styled.form`
  ${formContainer()};

  & > div {
    position: relative;
    ${formItem()};
    ${errorMessage()};

    & > input,
    & > textarea {
      ${input()};
    }

    & > textarea {
      min-height: ${px2rem(100)};
      height: ${px2rem(100)};
      resize: none;

      @media (min-width: 992px) {
        min-height: ${px2rem(100)};
        height: calc(100vh - ${px2rem(750)});
      }
    }

    &:nth-of-type(2) > input {
      padding-right: ${px2rem(40)};

      @media (min-width: 992px) {
        padding-right: ${px2rem(20)};
      }
    }

    &:last-of-type {
      ${formButtons()};

      & > div {
        display: flex;
        flex-direction: row;
        gap: ${px2rem(10)};
        margin-left: auto;

        & > button:nth-of-type(1) {
          & > svg {
            fill: var(--red-color);
          }

          & > span {
            color: var(--red-color);
          }
        }
      }
    }
  }
`;
const StyledRocketContainer: StyledComponent<any, any> = styled.div`
  position: absolute;
  ${size("100%")};
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: calc((100vh - ${px2rem(500)}) / 2 - ${px2rem(150)});

  @media (min-width: 992px) {
    top: calc((100vh - ${px2rem(500)}) / 2 - ${px2rem(125)});
  }

  & > div {
    ${size("75vw")};

    @media (min-width: 992px) {
      ${size(px2rem(500))};
    }
  }
`;
/*const contacts: TAutoCompleteItem[] = [
 {
 id: "0",
 name: "Dude from pub",
 },
 {
 id: "1",
 name: "Steve Jobs",
 },
 {
 id: "2",
 name: "Bill Gates",
 },
 {
 id: "3",
 name: "George Bush",
 },
 {
 id: "4",
 name: "Donald Trump",
 },
 {
 id: "5",
 name: "Bill Clinton",
 },
 ];*/
const ComposeMailForm: FunctionComponent<TComposeMailFormProps> = ({ isLg, subject, to }) => {
  const { locale } = useRouter();
  const [currentSignature] = useLocalStorage<string>(appConfig.keys.settingsSignature, "");
  const [pending, setPending] = useState(false);
  const [disabledSendButton, setDisabledSendButton] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  const [filesStatuses, setFilesStatuses] = useState<("pending" | "attached")[]>([]);
  const [filesData, setFilesData] = useState<string[]>([]);
  const [, setFilesCript] = useState<Uint8Array[]>([]);
  const [filesSetRequest, setFilesSetRequest] = useState<any[]>([]);
  const router = useRouter();
  const DeNSContractCheck = useStore((store) => store["DeNS/contract/check"]);
  const [addressDeNS, setAddressDeNS] = useState<string>("");
  // const [addresses, setAddresses] = useState<TAutoCompleteItem[]>([]);
  // const [options, setOptions] = useState<TAutoCompleteItem[]>([]);
  // const [searchPending, setSearchPending] = useState(false);
  const { accountsState, accountList, ylide } = useStore((store) => store);
  const key32Gen = () => {
    let count = "";
    let i = 0;
    while(i < 32) {
      i++;
      count += `${Math.floor(Math.random() * 2)}`;
    }
    return count;
  };
  const [key32] = useState<string>(key32Gen());
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address: to,
      subject: subject ? `RE: ${subject}` : "",
      text: currentSignature ? `\n\n--\n${currentSignature}` : "",
    },
    validationSchema: Yup.object({
      address: Yup.string().trim().required(intl(locale).formatMessage({
        id: "enter-address",
        defaultMessage: "Enter address",
      })),
      subject: Yup.string().trim().max(1024, intl(locale).formatMessage({
        id: "subject-too-long",
        defaultMessage: "Subject too long",
      })),
      text: Yup.string().trim().required(intl(locale).formatMessage({
        id: "enter-message",
        defaultMessage: "Enter message",
      })),
    }),
    onSubmit: async (values, { resetForm }) => {
      const address = addressDeNS ? addressDeNS : values.address;
      const fromAccount = accountList.find((a) => a.address === accountList[0]?.address);

      if (!fromAccount) {
        return;
      }

      const state = accountsState?.[fromAccount.address];

      if (!state) {
        return;
      }

      setPending(true);

      try {
        // BAG Инкапсулировать
        const blockchain = ylide?.blockchains[0];
        const verAddress = blockchain && address && await blockchain.extractPublicKeyFromAddress(address);
        // ----
        if (verAddress) {
          const content = MessageContentV3.plain(
            values.subject,
            JSON.stringify({
              body: values.text,
              signature: localStorage.getItem("qamon-settings-signature") ?
                `${JSON.parse(localStorage.getItem("qamon-settings-signature")!)} `
                : null,
              version: 1,
              files: filesSetRequest.length ? filesSetRequest : null,
              filesKey: key32,
            }),
          );
          await ylide!.sendMessage(
            {
              wallet: state.wallet!.wallet,
              sender: (
                await state.wallet!.wallet.getAuthenticatedAccount()
              )!,
              content,
              recipients: [address ?? ""],
            },
            { network: EVMNetwork.ARBITRUM },
          );
          resetForm();
          await router.push(routes.inbox);
        } else {
          formik.errors.address = "doesNotExist";
          setPending(false);
        }
      } catch {
        setPending(false);
      }
    },
  });
  // const handleSelect = (items: TAutoCompleteItem[]) => {
  //   setAddresses(items);
  //   setOptions([]);
  // };
  // const handleRemove = () => {
  //   setOptions([]);
  // };
  // const handleSearch = (value: string) => {
  //   setSearchPending(true);
  //   setTimeout(() => {
  //     const res = contacts.filter(item => item.name.includes(value));
  //     setOptions(res);
  //     setSearchPending(false);
  //   }, 1000);
  // };
  const converterDeFI = () => {
    if (formik.values.address && formik.values.address.indexOf(".") > -1) {
      setPending(true);
      const address = formik.values.address.replaceAll("@", ".");
      DeNSContractCheck(address, (e: object | string) => {
        if (typeof e === "string") {
          // formik.setFieldValue("address", e)
          setAddressDeNS(e);
        } else {
          // Действие при неверном домене
        }
        setPending(false);
      });
    }
  };

  useEffect(() => {
    if (formik.dirty) {
      if (
        // addresses.length === 0 ||
        formik.errors.subject || formik.errors.text) {
        setDisabledSendButton(true);
      } else {
        setDisabledSendButton(false);
      }
    } else {
      setDisabledSendButton(true);
    }
  }, [formik.dirty, formik.errors.subject, formik.errors.text]);

  return (
    <>
      {pending && (
        <>
          <Overlay color="white" />
          <StyledRocketContainer>
            <Lottie animationData={rocketAnimation} loop={true} />
          </StyledRocketContainer>
        </>
      )}
      <StyledForm onSubmit={formik.handleSubmit}>
        <div>
          <input
            id="address"
            name="address"
            value={formik.values.address}
            placeholder={intl(locale).formatMessage({
              id: "to",
              defaultMessage: "To:",
            })}
            data-error={formik.touched.address && !!formik.errors.address}
            onBlur={() => {
              formik.handleBlur;
              converterDeFI();
            }}
            onChange={(e) => {
              formik.handleChange(e);
              setAddressDeNS("");
            }} />
          {/*<AutoComplete
           options={options}
           placeholder={intl(locale).formatMessage({
           id: "to",
           defaultMessage: "To:"
           })}
           emptyRecordMsg={intl(locale).formatMessage({
           id: "start-typing",
           defaultMessage: "Start typing..."
           })}
           loading={searchPending}
           onSelect={handleSelect}
           onRemove={handleRemove}
           onSearch={handleSearch}
           />*/}
          {formik.touched.address && formik.errors.address && formik.errors.address !== "doesNotExist" ? (
            <FormattedMessage id="empty-address" defaultMessage="Empty address" tagName="strong" />
          ) : null}
          {formik.touched.address && formik.errors.address === "doesNotExist" ? (
            <FormattedMessage id="empty-address-doesNotExist" defaultMessage="Does not exist" tagName="strong" />
          ) : null}
        </div>
        <div>
          <input
            id="subject"
            name="subject"
            value={formik.values.subject}
            placeholder={intl(locale).formatMessage({
              id: "subject",
              defaultMessage: "Subject:",
            })}
            data-error={formik.touched.subject && !!formik.errors.subject}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange} />
          {!isLg &&
            <UploadFileButton
              key32={key32}
              setFilesSetReqest={setFilesSetRequest}
              setFilesCript={setFilesCript}
              setFiles={setFiles}
              setFilesData={setFilesData}
              filesCounter={files.length}
              setFilesStatuses={setFilesStatuses} />}
          {formik.touched.subject && !!formik.errors.subject ? (
            <strong>{formik.errors.subject}</strong>
          ) : null}
        </div>
        {!isLg && (
          <div>
            <FilesForm
              editable={true}
              isLg={isLg}
              files={files}
              setFiles={setFiles}
              filesData={filesData}
              filesStatuses={filesStatuses}
              setFilesData={setFilesData}
              setFilesSetRequest={setFilesSetRequest} />
          </div>
        )}
        <div>
          <textarea
            id="text"
            name="text"
            value={formik.values.text}
            placeholder={intl(locale).formatMessage({
              id: "message",
              defaultMessage: "Message:",
            })}
            data-error={formik.touched.text && !!formik.errors.text}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange} />
          {formik.touched.text && !!formik.errors.text ? (
            <strong>{formik.errors.text}</strong>
          ) : null}
        </div>
        {isLg && (
          <div>
            <FilesForm
              editable={true}
              isLg={isLg}
              files={files}
              setFiles={setFiles}
              filesData={filesData}
              filesStatuses={filesStatuses}
              setFilesData={setFilesData}
              setFilesSetRequest={setFilesSetRequest} />
          </div>
        )}
        <div>
          {isLg &&
            <UploadFileButton
              key32={key32}
              setFilesSetReqest={setFilesSetRequest}
              setFilesCript={setFilesCript}
              setFiles={setFiles}
              setFilesData={setFilesData}
              filesCounter={files.length}
              setFilesStatuses={setFilesStatuses}
            />}
          <div>
            <Button type={EButtonType.Reset} disabled={!formik.dirty} onClick={formik.resetForm}>
              <Icon name={EIcon.Discard} />
              <FormattedMessage id="discard" defaultMessage="Discard" tagName="span" />
            </Button>
            <Button
              type={EButtonType.Submit}
              disabled={disabledSendButton ||
                !filesStatuses.every((item: "pending" | "attached") => item === "attached")}>
              <Icon name={EIcon.SendMail} />
              <FormattedMessage id="send" defaultMessage="Send" tagName="span" />
            </Button>
          </div>
        </div>
      </StyledForm>
    </>
  );
};

export default memo(ComposeMailForm);
