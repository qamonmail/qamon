import { FunctionComponent } from "react";
import { FormattedMessage } from "react-intl";
import styled, { StyledComponent } from "styled-components";
import Button from "../buttons/Button";
import { px2rem } from "../../common/lib";
import Icon from "../Icon";
import EIcon from "../../models/enums/EIcon";

type TFileSizeErrorMessageFormProps = {
  onClose: () => void;
};

const StyledButton: StyledComponent<any, any> = styled(Button)`
  width: ${px2rem(100)};
`;
const FileSizeErrorMessageForm: FunctionComponent<TFileSizeErrorMessageFormProps> = ({ onClose }) => {
  return (
    <>
      <Icon name={EIcon.Error} />
      <FormattedMessage id="attachments-must" defaultMessage="Attachments must not exceed 10 MB!" tagName="p" />
      <StyledButton primary={true} onClick={onClose}>
        <FormattedMessage id="ok" defaultMessage="Ok" tagName="span" />
      </StyledButton>
    </>
  );
};

export default FileSizeErrorMessageForm;
