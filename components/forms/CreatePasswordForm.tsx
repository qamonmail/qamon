import { FunctionComponent, useEffect, useState } from "react";
import styled, { StyledComponent } from "styled-components";
import Button from "../buttons/Button";
import Icon from "../Icon";
import EIcon from "../../models/enums/EIcon";
import { FormattedMessage } from "react-intl";
import { px2rem } from "../../common/lib";
import { useFormik } from "formik";
import * as Yup from "yup";
import { intl } from "../../common/intl";
import { useRouter } from "next/router";
import { useStore } from "../../storeZ";
import EButtonSize from "../../models/enums/EButtonSize";
import EButtonType from "../../models/enums/EButtonType";

const StyledForm: StyledComponent<any, any> = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${px2rem(40)};
  margin-top: ${px2rem(50)};

  & > section {
    display: flex;
    flex-direction: column;
    gap: ${px2rem(20)};

    & > input {
      flex: 1;
      width: 90vw;
      max-width: ${px2rem(400)};
      border: ${px2rem(1)} solid var(--active-color);
      border-radius: ${px2rem(22)};
      font-size: ${px2rem(14)};
      padding: ${px2rem(10)} ${px2rem(14)};
      text-align: center;

      ::placeholder {
        color: var(--active-color);
        opacity: .3;
      }

      &[data-error="true"] {
        border-color: var(--red-color);
      }

      @media (min-width: 992px) {
        width: ${px2rem(400)};
        font-size: ${px2rem(18)};
      }
    }

    & > strong {
      font-size: ${px2rem(12)};
      font-weight: 400;
      color: var(--red-color);
      text-align: center;
    }
  }

  & > button {
    border: ${px2rem(2)} solid var(--active-color);
    border-radius: ${px2rem(20)};
    background-color: transparent;
    width: ${px2rem(200)};

    & > span {
      font-size: ${px2rem(14)};
      font-weight: 400;
      color: var(--active-color);
    }

    & > svg {
      fill: var(--active-color);
    }

    &::after {
      border-radius: ${px2rem(20)} !important;
    }

    &:not(:disabled):hover {
      background-color: var(--active-color);

      & > span {
        color: var(--inactive-color);
      }

      & > svg {
        fill: var(--inactive-color);
      }
    }

    &:not(:disabled):active {
      transform: translateY(${px2rem(2)}) !important;
    }
  }
`;
const CreatePasswordForm: FunctionComponent = () => {
  const [disabledContinueButton, setDisabledContinueButton] = useState<boolean>(true);
  const { locale, push } = useRouter();
  const postReaders = useStore((store) => store["network/post/password"]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      passwordFirst: "",
      passwordSecond: ""
    },
    validationSchema: Yup.object({
      passwordFirst: Yup.string().trim().required(intl(locale).formatMessage({
        id: "enter-your-password",
        defaultMessage: "Enter your password"
      })).min(8, intl(locale).formatMessage({
        id: "short-password",
        defaultMessage: "Password is too short - should be 8 chars minimum"
      })),
      passwordSecond: Yup.string().trim().required(intl(locale).formatMessage({
        id: "repeat-your-password",
        defaultMessage: "Repeat your password"
      })).oneOf([Yup.ref("passwordFirst"), null], intl(locale).formatMessage({
        id: "password-must-match",
        defaultMessage: "Passwords must match"
      }))
    }),
    onSubmit: (values) => {
      void push("/auth/wallet");
      postReaders(values.passwordSecond);
    }
  });
  const handleFocus = () => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 500);
  };

  useEffect(() => {
    if (formik.dirty) {
      if (formik.errors.passwordFirst || formik.errors.passwordSecond) {
        setDisabledContinueButton(true);
      } else {
        setDisabledContinueButton(false);
      }
    } else {
      setDisabledContinueButton(true);
    }
  }, [formik.dirty, formik.errors.passwordFirst, formik.errors.passwordSecond]);

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <section>
        <input
          type="password"
          placeholder={intl(locale).formatMessage({
            id: "enter-qamon-password",
            defaultMessage: "Enter Qamon password"
          })}
          id="passwordFirst"
          name="passwordFirst"
          value={formik.values.passwordFirst}
          data-error={formik.touched.passwordFirst && !!formik.errors.passwordFirst}
          onFocus={handleFocus}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange} />
        {formik.touched.passwordFirst && !!formik.errors.passwordFirst ? (
          <strong>{formik.errors.passwordFirst}</strong>
        ) : null}
        <input
          type="password"
          placeholder={intl(locale).formatMessage({
            id: "repeat-qamon-password",
            defaultMessage: "Repeat Qamon password"
          })}
          id="passwordSecond"
          name="passwordSecond"
          value={formik.values.passwordSecond}
          data-error={formik.touched.passwordSecond && !!formik.errors.passwordSecond}
          onFocus={handleFocus}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange} />
        {formik.touched.passwordSecond && !!formik.errors.passwordSecond ? (
          <strong>{formik.errors.passwordSecond}</strong>
        ) : null}
      </section>
      <Button
        primary={true}
        size={EButtonSize.Small}
        type={EButtonType.Submit}
        disabled={disabledContinueButton}>
        <FormattedMessage id="continue" defaultMessage="Continue" tagName="span" />
        <Icon name={EIcon.SendMail} />
      </Button>
    </StyledForm>
  );
};

export default CreatePasswordForm;
