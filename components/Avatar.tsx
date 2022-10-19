import { FunctionComponent } from "react";
import styled, { StyledComponent } from "styled-components";
import { px2rem } from "../common/lib";

type TAvatar = {
  color: string;
  symbol: string;
  size?: number;
};

const StyledContainer: StyledComponent<any, any> = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }: TAvatar) => size ? px2rem(size) : px2rem(46)};
  height: ${({ size }: TAvatar) => size ? px2rem(size) : px2rem(46)};
  border: none;
  border-radius: ${px2rem(23)};
  background-color: ${({ color }: TAvatar) => color};

  & > span {
    font-size: ${px2rem(16)};
    line-height: ${px2rem(22)};
    font-weight: 400;
    color: white;
    text-transform: capitalize;
  }
`;
const Avatar: FunctionComponent<TAvatar> = ({ color, symbol, size }) => {
  return (
    <StyledContainer color={color} size={size}>
      <span>
        {symbol}
      </span>
    </StyledContainer>
  );
};

export default Avatar;
