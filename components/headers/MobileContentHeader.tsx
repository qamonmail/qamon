import { FunctionComponent } from "react";
import styled, { StyledComponent } from "styled-components";
import LockSwitcher from "../LockSwitcher";
import TableChecker from "../TableChecker";
import ECheckboxStatus from "../../models/enums/ECheckboxStatus";
import { px2rem } from "../../common/lib";
import { size } from "polished";

type TMobileContentHeaderProps = {
  checkboxStatus: ECheckboxStatus;
  children?: any;
  locked?: boolean;
  withLock?: boolean;
  onLockToggle?: () => void;
  onCheck: () => void;
  onAllCheck: () => void;
  onNoneCheck: () => void;
};

const StyledHeader: StyledComponent<any, any> = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: ${px2rem(16)};

  & > section {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${px2rem(8)};

    & > section {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: ${px2rem(8)};

      & > button {
        ${size(px2rem(42), px2rem(34))};
        padding: ${px2rem(5)};
      }
    }
  }
`;
const MobileContentHeader: FunctionComponent<TMobileContentHeaderProps> = ({
  checkboxStatus,
  children,
  withLock,
  locked,
  onLockToggle,
  onCheck,
  onAllCheck,
  onNoneCheck
}) => {
  return (
    <StyledHeader>
      {/* <section>
        <TableChecker
          checkboxStatus={checkboxStatus}
          onCheck={onCheck}
          onAllCheck={onAllCheck}
          onNoneCheck={onNoneCheck} />
       {children}
      </section>
      <section>
        {withLock && <LockSwitcher locked={!!locked} onToggle={onLockToggle ? onLockToggle : () => {
        }} />}
      </section> */}
    </StyledHeader>
  );
};

export default MobileContentHeader;
