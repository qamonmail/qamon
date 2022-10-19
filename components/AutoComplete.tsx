import { FunctionComponent } from "react";
import styled, { StyledComponent } from "styled-components";
import { px2rem } from "../common/lib";

export type TAutoCompleteItem = {
  id: string,
  name: string,
};
type TAutoCompleteProps = {
  options: TAutoCompleteItem[];
  placeholder?: string;
  showCheckbox?: boolean;
  loading?: boolean;
  emptyRecordMsg?: string;
  onRemove?: () => void;
  onSelect?: (items: TAutoCompleteItem[]) => void;
  onSearch?: (value: string) => void;
};

const StyledMultiselect: StyledComponent<any, any> = styled.div`
  border: ${px2rem(1)} solid var(--border-color) !important;
  border-radius: ${px2rem(10)} !important;
  padding: ${px2rem(12)} ${px2rem(20)};
  min-width: ${px2rem(800)};
  max-width: ${px2rem(800)};

  & .searchWrapper {
    border: none;
    padding: 0;
    margin: 0;
  }

  & .optionListContainer {
    border-radius: ${px2rem(2)} ${px2rem(10)} ${px2rem(10)} ${px2rem(10)};
    border: 1px solid rgba(32, 32, 32, 0.1);
    box-shadow: 0 3px 4px rgba(64, 68, 104, 0.09);
    background-color: #FFFFFC;
    max-width: ${px2rem(200)};
    overflow: hidden;

    & > ul {
      border: none;
      border-radius: 0;

      & > span {
        font-size: ${px2rem(14)};
        font-weight: 400;
      }
    }
  }

  & .chip {
    font-size: ${px2rem(18)};
    font-weight: 400;
    background-color: var(--inactive-color);
    color: var(--active-color);
    border-radius: ${px2rem(5)};
    padding: ${px2rem(5)} ${px2rem(10)};
    margin-bottom: 0;

    & > img {
      filter: invert(1);
      opacity: .35;
    }
  }

  & input {
    font-size: ${px2rem(18)};
    font-weight: 400;

    &::placeholder {
      color: var(--active-color);
      opacity: .3;
    }
  }
`;
const AutoComplete: FunctionComponent<TAutoCompleteProps> = ({
  options,
  placeholder,
  showCheckbox = false,
  loading,
  emptyRecordMsg,
  onRemove,
  onSelect,
  onSearch
}) => {
  return (
    <StyledMultiselect
      options={options}
      placeholder={placeholder}
      emptyRecordMsg={emptyRecordMsg}
      showCheckbox={showCheckbox}
      displayValue="name"
      loading={loading}
      avoidHighlightFirstOption={true}
      closeIcon="circle1"
      onRemove={onRemove}
      onSelect={onSelect}
      onSearch={onSearch} />
  );
};

export default AutoComplete;
