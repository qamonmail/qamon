import { forwardRef, FunctionComponent } from "react";
import styled, { StyledComponent } from "styled-components";
import { px2rem } from "../../common/lib";

type TMenuProps = {
  children?: any;
  className?: string;
  open: boolean;
  ref: any;
};

const StyledContainer: StyledComponent<any, any> = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: ${px2rem(2)} ${px2rem(10)} ${px2rem(10)} ${px2rem(10)};
  border: 1px solid rgba(32, 32, 32, 0.1);
  box-shadow: 0 3px 4px rgba(64, 68, 104, 0.09);
  background-color: #FFFFFC;
  transform: ${({ open }: TMenuProps) => open ? "scaleY(100%)" : "scaleY(0)"};
  transform-origin: 0 0;
  z-index: 10;
  overflow: hidden;
  opacity: ${({ open }: TMenuProps) => open ? 1 : 0};
  transition: all .2s;
`;
const MenuContainer: FunctionComponent<TMenuProps> = forwardRef(({ children, className, open }, ref) => {
  return (
    <StyledContainer className={className} open={open} ref={ref}>
      {children}
    </StyledContainer>
  );
});
MenuContainer.displayName = "MenuContainer";

export default MenuContainer;
