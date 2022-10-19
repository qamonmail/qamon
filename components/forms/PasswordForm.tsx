import { FunctionComponent, useEffect, useState } from "react";
import styled, { StyledComponent } from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { intl } from "../../common/intl";
import { useRouter } from "next/router";
import EButtonType from "../../models/enums/EButtonType";
import { FormattedMessage } from "react-intl";
import Button from "../buttons/Button";
import { px2rem } from "../../common/lib";
import { input } from "../../styles/mixins";
import { useMitt } from "react-mitt";
import EEventType from "../../models/enums/EEventType";

const StyledForm: StyledComponent<any, any> = styled.form`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${px2rem(20)};

  & > p {
    font-size: ${px2rem(20)};
    font-weight: 400;
    line-height: ${px2rem(28)};
    text-align: center;
  }

  & > div {
    display: flex;
    flex-direction: column;

    & > strong {
      color: var(--red-color);
      font-size: ${px2rem(12)};
      font-weight: 500;
      margin-top: ${px2rem(20)};
    }

    & > input {
      ${input()};
      text-align: center;
    }
  }
`;
const PasswordForm: FunctionComponent = () => {
  const [disabledSubmitButton, setDisabledSubmitButton] = useState(true);
  const { locale } = useRouter();
  const { emitter } = useMitt();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().trim().required(intl(locale).formatMessage({
        id: "enter-your-password",
        defaultMessage: "Enter your password",
      })),
    }),
    onSubmit: ({ password }: any) => {
      setDisabledSubmitButton(true);
      emitter.emit(EEventType.GetPassword, password);
    },
  });

  useEffect(() => {
    if (formik.dirty) {
      if (formik.errors.password) {
        setDisabledSubmitButton(true);
      } else {
        setDisabledSubmitButton(false);
      }
    } else {
      setDisabledSubmitButton(true);
    }
  }, [formik.dirty, formik.errors.password]);

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <FormattedMessage id="enter-qamon-password" defaultMessage="Enter Qamon password:" tagName="p" />
      <div>
        <input
          type="password"
          id="password"
          name="password"
          placeholder={intl(locale).formatMessage({
            id: "enter-your-password",
            defaultMessage: "Enter your password",
          })}
          value={formik.values.password}
          data-error={formik.touched.password && !!formik.errors.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange} />
        {formik.touched.password && !!formik.errors.password ? (
          <strong>{formik.errors.password}</strong>
        ) : null}
      </div>
      <Button
        primary={true}
        type={EButtonType.Submit}
        disabled={disabledSubmitButton}>
        <FormattedMessage id="submit" defaultMessage="Submit" tagName="span" />
      </Button>
    </StyledForm>
  );
};

export default PasswordForm;
