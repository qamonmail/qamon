import { FunctionComponent } from "react";
import styled, { StyledComponent } from "styled-components";
import ECheckboxStatus from "../models/enums/ECheckboxStatus";
import Icon from "./Icon";
import EIcon from "../models/enums/EIcon";
import { px2rem } from "../common/lib";
import { size, transparentize } from "polished";

type TTableHeader = {
  checkboxStatus: ECheckboxStatus;
  children?: any;
  className?: string;
  nextDisabled: boolean;
  previousDisabled: boolean;
  onCheck: () => void;
  onAllCheck: () => void;
  onNoneCheck: () => void;
  onNextClick: () => void;
  onPreviousClick: () => void;
};

const StyledContainer: StyledComponent<any, any> = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(30)};
  padding: 0 ${px2rem(30)};

  & > div {
      /*&:nth-of-type(2) {
      & > section {
        display: flex;
        flex-direction: row;
        gap: ${px2rem(10)};

        & svg {
          ${size(px2rem(18))};
        }
      }

      & > button {
        & > svg {
          ${size(px2rem(18))};
        }
      }

      & [data-icon="delete"] {
        fill: var(--red-color);
      }
    }*/

    // change to 3
    &:nth-of-type(1) {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: ${px2rem(10)};
      margin-left: auto;

      & > span {
        font-size: ${px2rem(16)};
        font-weight: 400;
        color: ${transparentize(.6, "#202020")};
        margin-right: ${px2rem(15)};
      }

      & > button {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        border: none;
        border-radius: ${px2rem(10)};
        cursor: pointer;
        padding: ${px2rem(10)};
        transition: all .15s;

        & > svg {
          ${size(px2rem(14))};
          fill: ${transparentize(.6, "#202020")};
        }

        &:nth-of-type(1) {
          & > svg {
            transform: rotate(90deg);
          }
        }

        &:nth-of-type(2) {
          & > svg {
            transform: rotate(-90deg);
          }
        }

        &:disabled {
          opacity: .25;
          cursor: not-allowed;
        }

        &:not(:disabled) {
          &:hover {
            background-color: var(--inactive-color);
          }

          &:active {
            transform: scale(.85);
          }
        }
      }
    }
  }
`;
const TableHeader: FunctionComponent<TTableHeader> = ({
  checkboxStatus,
  children,
  className,
  nextDisabled,
  previousDisabled,
  onCheck,
  onAllCheck,
  onNoneCheck,
  onNextClick,
  onPreviousClick,
}) => {
  return (
    <StyledContainer className={className}>
      {/*<TableChecker
       checkboxStatus={checkboxStatus}
       onCheck={onCheck}
       onAllCheck={onAllCheck}
       onNoneCheck={onNoneCheck} />*/}
      {/*<div>
       {children}
       </div>*/}
      <div>
        {/*<span>{offset + 1} - {offset + pageSize < fullCount ? offset + pageSize : fullCount} from {fullCount}</span>*/}
        <button disabled={previousDisabled} onClick={onPreviousClick}>
          <Icon name={EIcon.Arrow} />
        </button>
        <button disabled={nextDisabled} onClick={onNextClick}>
          <Icon name={EIcon.Arrow} />
        </button>
      </div>
    </StyledContainer>
  );
};

export default TableHeader;
