import { FunctionComponent } from "react";
import Button from "../buttons/Button";
import { FormattedMessage } from "react-intl";
import styled, { StyledComponent } from "styled-components";
import { px2rem } from "../../common/lib";

type TIncorrectPasswordMessageFormProps = {
  onClose: () => void;
};

const StyledButton: StyledComponent<any, any> = styled(Button)`
  width: ${px2rem(100)};
`;
const IncorrectPasswordMessageForm: FunctionComponent<TIncorrectPasswordMessageFormProps> = ({ onClose }) => {
  return (
    <>
      <FormattedMessage id="incorrect-password" defaultMessage="Wrong password, try again" tagName="p" />
      <StyledButton primary={true} onClick={onClose}>
        <FormattedMessage id="ok" defaultMessage="Ok" tagName="span" />
      </StyledButton>
    </>
  );
};

export default IncorrectPasswordMessageForm;
