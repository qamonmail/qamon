import { FunctionComponent } from "react";
import styled, { StyledComponent } from "styled-components";
import { px2rem } from "../common/lib";
import { transparentize } from "polished";

type TTableProps = {
  className?: string;
  isLg: boolean;
  rows: any;
};

const StyledTable: StyledComponent<any, any> = styled.table`
  border-collapse: separate !important;
  border-spacing: 0;
  width: 100%;

  & tr {
    padding: 0 ${px2rem(30)};

    & > td {
      text-align: left;
      vertical-align: middle;
      padding: ${px2rem(20)} ${px2rem(5)};
      white-space: nowrap;
      text-overflow: ellipsis;

      & > strong {
        font-size: ${px2rem(16)};
        font-weight: 500;
      }

      & > span {
        font-size: ${px2rem(16)};
        font-weight: 400;
        color: ${transparentize(.75, "#202020")};
      }
    }

    &:hover {
      background-color: ${transparentize(.95, "#202020")};

      & button:not([data-primary="true"]) {
        background-color: white;
      }
    }

    &[data-checked="true"] {
      background-color: #D7D7CC;
    }
  }
`;
const StyledMobileTable: StyledComponent<any, any> = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: ${px2rem(16)};
`;
const Table: FunctionComponent<TTableProps> = ({ className, isLg, rows }) => {
  return (
    <>
      {!isLg && (
        <StyledMobileTable className={className}>
          {rows}
        </StyledMobileTable>
      )}
      {isLg && (
        <StyledTable className={className}>
          <tbody>
            {rows}
          </tbody>
        </StyledTable>
      )}
    </>
  );
};

export default Table;
