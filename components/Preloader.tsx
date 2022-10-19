import { FunctionComponent } from "react";
import styled, { StyledComponent } from "styled-components";
import Lottie from "lottie-react";
import circlesAnimation from "../animations/circles.json";
import { size, transparentize } from "polished";
import { px2rem } from "../common/lib";

type TPreloaderProps = {
  background?: string;
  className?: string;
  size: number;
};

const StyledContainer: StyledComponent<any, any> = styled.b`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ background }: TPreloaderProps) => background ? transparentize(.1, background) : "transparent"};

  & > div {
    ${({ size: s }: TPreloaderProps) => size(px2rem(s))};
  }
`;
const Preloader: FunctionComponent<TPreloaderProps> = ({ background, className, size }) => {
  return (
    <StyledContainer background={background} className={className} size={size}>
      <Lottie animationData={circlesAnimation} loop={true} />
    </StyledContainer>
  );
};

export default Preloader;
