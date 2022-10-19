import { FunctionComponent } from "react";
import Button from "../buttons/Button";
import { FormattedMessage } from "react-intl";
import styled, { StyledComponent } from "styled-components";
import { px2rem } from "../../common/lib";

type TEncryptedMessageFormProps = {
  onClose: () => void;
};

const StyledButton: StyledComponent<any, any> = styled(Button)`
  width: ${px2rem(100)};
`;
const EncryptedMessageForm: FunctionComponent<TEncryptedMessageFormProps> = ({ onClose }) => {
  return (
    <>
      <FormattedMessage id="to-continue" defaultMessage="To continue decrypt the message!" tagName="p" />
      <StyledButton primary={true} onClick={onClose}>
        <FormattedMessage id="ok" defaultMessage="Ok" tagName="span" />
      </StyledButton>
    </>
  );
};

export default EncryptedMessageForm;
