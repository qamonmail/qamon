import { FunctionComponent, useCallback } from "react";
import ECheckboxStatus from "../models/enums/ECheckboxStatus";
import styled, { StyledComponent } from "styled-components";
import Icon from "./Icon";
import EIcon from "../models/enums/EIcon";
import { size } from "polished";
import { px2rem } from "../common/lib";

type TCheckboxProps = {
  status: ECheckboxStatus;
  onCheck: () => void;
};

const StyledContainer: StyledComponent<any, any> = styled.button`
  ${size(px2rem(20))};
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${px2rem(2)} solid var(--active-color);
  border-radius: ${px2rem(4)};
  background-color: white;
  cursor: pointer;

  & > svg {
    ${size(px2rem(9))};
  }
`;
const Checkbox: FunctionComponent<TCheckboxProps> = ({ status, onCheck }) => {
  const handleClick = useCallback((e: any) => {
    e.stopPropagation();
    onCheck();
  }, [onCheck]);

  return (
    <StyledContainer data-status={status} status={status} onClickCapture={handleClick}>
      {status === ECheckboxStatus.Checked && <Icon name={EIcon.CheckedCheckbox} />}
      {status === ECheckboxStatus.Half && <Icon name={EIcon.HalfCheckbox} />}
    </StyledContainer>
  );
};

export default Checkbox;
