import { FunctionComponent } from "react";
import styled, { StyledComponent } from "styled-components";
import { px2rem } from "../common/lib";

type TPinProps = {
  color: string;
  size: number;
};

const StyledBlock: StyledComponent<any, any> = styled.div`
  display: inline-block;
  background-color: ${({ color }: TPinProps) => color};
  border: none;
  border-radius: ${({ size }: TPinProps) => px2rem(size / 2)};
  height: ${({ size }: TPinProps) => px2rem(size)};
  width: ${({ size }: TPinProps) => px2rem(size)};
`;
const Pin: FunctionComponent<TPinProps> = ({ color, size }) => {
  return <StyledBlock color={color} size={size} />;
};

export default Pin;
