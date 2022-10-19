import styled, { StyledComponent } from "styled-components";
import { FunctionComponent } from "react";
import { px2rem } from "../../common/lib";
import { size } from "polished";
import Icon from "../Icon";
import EIcon from "../../models/enums/EIcon";

type TSearchFormProps = {
  value: string;
};

const StyledForm: StyledComponent<any, any> = styled.form`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;

  & > input {
    ${size(px2rem(40), px2rem(250))};
    border: ${px2rem(1)} solid var(--border-color);
    border-radius: ${px2rem(10)};
    padding: 0 ${px2rem(24)} 0 ${px2rem(12)};
    font-size: ${px2rem(14)};
    font-weight: 400;
  }

  & > svg {
    ${size(14)};
    position: absolute;
    opacity: .25;
    right: ${px2rem(10)};
    pointer-events: none;
  }
`;
const SearchForm: FunctionComponent<TSearchFormProps> = () => {
  return (
    <StyledForm>
      {/*<input type="search" />
      <Icon name={EIcon.Search} />*/}
    </StyledForm>
  );
};

export default SearchForm;
