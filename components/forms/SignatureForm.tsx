import { FunctionComponent, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled, { StyledComponent } from "styled-components";
import Button from "../buttons/Button";
import { px2rem } from "../../common/lib";
import { useRouter } from "next/router";
import { intl } from "../../common/intl";
import Icon from "../Icon";
import EIcon from "../../models/enums/EIcon";
import appConfig from "../../app.config";
import { errorMessage, formButtons, formContainer, formItem, input } from "../../styles/mixins";
import EButtonSize from "../../models/enums/EButtonSize";
import EButtonType from "../../models/enums/EButtonType";
import useLocalStorage from "../../hooks/useLocalStorage";

const StyledForm: StyledComponent<any, any> = styled.form`
  ${formContainer()};

  & > div {
    ${formItem()};
    ${errorMessage()};

    & > textarea {
      ${input()};
      min-height: ${px2rem(250)};
      max-height: ${px2rem(350)};
      resize: vertical;
    }

    &:last-of-type {
      ${formButtons()};
    }
  }
`;
const SignatureForm: FunctionComponent = () => {
  const [currentSignature, setCurrentSignature] = useLocalStorage<string>(appConfig.keys.settingsSignature, "");
  const [disabledConfirmButton, setDisabledConfirmButton] = useState<boolean>(true);
  const { locale, back } = useRouter();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      signature: currentSignature
    },
    validationSchema: Yup.object({
      signature: Yup.string().trim().required(intl(locale).formatMessage({
        id: "enter-your-signature",
        defaultMessage: "Enter your signature"
      }))
    }),
    onSubmit: (values) => {
      setCurrentSignature(values.signature);
      back();
    }
  });

  useEffect(() => {
    if (formik.dirty) {
      if (formik.errors.signature) {
        setDisabledConfirmButton(true);
      } else {
        setDisabledConfirmButton(false);
      }
    } else {
      setDisabledConfirmButton(true);
    }
  }, [formik.dirty, formik.errors.signature]);

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <div>
        <textarea
          id="signature"
          name="signature"
          value={formik.values.signature}
          placeholder={intl(locale).formatMessage({
            id: "type-here",
            defaultMessage: "Type here"
          })}
          data-error={formik.touched.signature && !!formik.errors.signature}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange} />
        {formik.touched.signature && !!formik.errors.signature ? (
          <strong>{formik.errors.signature}</strong>
        ) : null}
      </div>
      <div>
        <Button
          primary={false}
          size={EButtonSize.Small}
          type={EButtonType.Submit}
          disabled={disabledConfirmButton}>
          <Icon name={EIcon.Confirm} />
          <FormattedMessage id="confirm" defaultMessage="Confirm" tagName="span" />
        </Button>
      </div>
    </StyledForm>
  );
};

export default SignatureForm;
