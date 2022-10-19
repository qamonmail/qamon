import { FunctionComponent, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { intl } from "../../common/intl";
import { useRouter } from "next/router";
import styled, { StyledComponent } from "styled-components";
import { errorMessage, formButtons, formContainer, formItem, input } from "../../styles/mixins";
import Button from "../buttons/Button";
import Icon from "../Icon";
import EIcon from "../../models/enums/EIcon";
import { FormattedMessage } from "react-intl";
import EButtonType from "../../models/enums/EButtonType";

type TEditContactForm = {
  name?: string;
  address?: string;
  folders?: string[];
};

const StyledForm: StyledComponent<any, any> = styled.form`
  ${formContainer()};

  & > div {
    ${formItem()};
    ${errorMessage()};

    & > input {
      ${input()};
    }

    &:last-of-type {
      ${formButtons()};
    }
  }
`;
const EditContactForm: FunctionComponent<TEditContactForm> = ({ name, address }) => {
  const { locale } = useRouter();
  const [disabledAddButton, setDisabledAddButton] = useState<boolean>(true);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: name || "",
      address: address || ""
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required(intl(locale).formatMessage({
        id: "enter-name",
        defaultMessage: "Enter name"
      })),
      address: Yup.string().trim().required(intl(locale).formatMessage({
        id: "enter-address",
        defaultMessage: "Enter address"
      }))
    }),
    onSubmit: (values, { resetForm }) => {
      resetForm();
    }
  });

  useEffect(() => {
    if (formik.dirty) {
      if (formik.errors.name || formik.errors.address) {
        setDisabledAddButton(true);
      } else {
        setDisabledAddButton(false);
      }
    } else {
      setDisabledAddButton(true);
    }
  }, [formik.dirty, formik.errors.name, formik.errors.address]);

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <div>
        <input
          id="name"
          name="name"
          value={formik.values.name}
          placeholder={intl(locale).formatMessage({
            id: "name",
            defaultMessage: "Name:"
          })}
          data-error={formik.touched.name && !!formik.errors.name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange} />
        {formik.touched.name && !!formik.errors.name ? (
          <strong>{formik.errors.name}</strong>
        ) : null}
      </div>
      <div>
        <input
          id="address"
          name="address"
          value={formik.values.address}
          placeholder={intl(locale).formatMessage({
            id: "address",
            defaultMessage: "Address:"
          })}
          data-error={formik.touched.address && !!formik.errors.address}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange} />
        {formik.touched.address && !!formik.errors.address ? (
          <strong>{formik.errors.address}</strong>
        ) : null}
      </div>
      <div>
        <input
          id="folders"
          name="folders"
          placeholder={intl(locale).formatMessage({
            id: "folders-ids",
            defaultMessage: "Folders:"
          })} />
      </div>
      <div>
        <Button type={EButtonType.Submit} disabled={disabledAddButton}>
          <Icon name={EIcon.Confirm} />
          <FormattedMessage id="add-contact" defaultMessage="Add contact" tagName="span" />
        </Button>
      </div>
    </StyledForm>
  );
};

export default EditContactForm;
