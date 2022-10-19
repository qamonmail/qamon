import { FunctionComponent, useEffect, useState } from "react";
import styled, { createGlobalStyle, GlobalStyleComponent, StyledComponent } from "styled-components";
import { cover } from "polished";
import { createPortal } from "react-dom";

type TOverlayProps = {
  className?: string;
  color?: string;
  onClick?: () => void;
};

const GlobalStyle: GlobalStyleComponent<any, any> = createGlobalStyle`
  html {
    overflow: hidden;
  }
`;
const StyledContainer: StyledComponent<any, any> = styled.div`
  ${cover()};
  background-color: ${({ color }: TOverlayProps) => color || "black"};
  opacity: 0.65;
  z-index: 100;
  height: 100vh;
`;
const Overlay: FunctionComponent<TOverlayProps> = ({ className, color, onClick }) => {
  const [container, setContainer] = useState<Element | null>(null);
  const element = (
    <>
      <GlobalStyle />
      <StyledContainer color={color} className={className} onClick={onClick} />
    </>
  );

  useEffect(() => {
    if (document) {
      setContainer(document.querySelector("#__next"));
    }
  }, []);

  return container ? createPortal(element, container) : null;
};

export default Overlay;
