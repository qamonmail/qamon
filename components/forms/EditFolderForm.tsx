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
import { px2rem } from "../../common/lib";
import { size } from "polished";

type TEditFolderForm = {
  name?: string;
  description?: string;
  color?: string;
};

const StyledForm: StyledComponent<any, any> = styled.form`
  ${formContainer()};

  & > div {
    ${formItem()};
    ${errorMessage()};

    & > input:not([type="color"]) {
      ${input()};
    }

    & > input[type="color"] {
      background-color: transparent;
      border: ${px2rem(1)} solid var(--border-color);
      border-radius: ${px2rem(10)};
      padding: ${px2rem(13)};
      ${size(px2rem(48))};
      margin-left: ${px2rem(10)};

      &::-webkit-color-swatch-wrapper {
        padding: 0;
      }

      &::-webkit-color-swatch {
        border: none;
        border-radius: ${px2rem(10)};
      }
    }

    &:last-of-type {
      ${formButtons()};
    }
  }
`;
const EditFolderForm: FunctionComponent<TEditFolderForm> = ({ name, description, color }) => {
  const { locale } = useRouter();
  const [disabledCreateButton, setDisabledCreateButton] = useState<boolean>(true);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: name || "",
      description: description || ""
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required(intl(locale).formatMessage({
        id: "enter-name",
        defaultMessage: "Enter name"
      })),
      description: Yup.string().trim().required(intl(locale).formatMessage({
        id: "enter-description",
        defaultMessage: "Enter description"
      }))
    }),
    onSubmit: (values, { resetForm }) => {
      resetForm();
    }
  });

  useEffect(() => {
    if (formik.dirty) {
      if (formik.errors.name || formik.errors.description) {
        setDisabledCreateButton(true);
      } else {
        setDisabledCreateButton(false);
      }
    } else {
      setDisabledCreateButton(true);
    }
  }, [formik.dirty, formik.errors.name, formik.errors.description]);

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
          id="description"
          name="description"
          value={formik.values.description}
          placeholder={intl(locale).formatMessage({
            id: "description",
            defaultMessage: "Description:"
          })}
          data-error={formik.touched.description && !!formik.errors.description}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange} />
        <input type="color" value={color} />
        {formik.touched.description && !!formik.errors.description ? (
          <strong>{formik.errors.description}</strong>
        ) : null}
      </div>
      <div>
        <Button type={EButtonType.Submit} disabled={disabledCreateButton}>
          <Icon name={EIcon.Confirm} />
          <FormattedMessage id="create-folder" defaultMessage="Create folder" tagName="span" />
        </Button>
      </div>
    </StyledForm>
  );
};

export default EditFolderForm;
