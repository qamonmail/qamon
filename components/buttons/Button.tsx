import { FunctionComponent } from "react";
import styled, { StyledComponent } from "styled-components";
import { px2rem } from "../../common/lib";
import { size, transparentize } from "polished";
import EButtonSize from "../../models/enums/EButtonSize";
import EButtonType from "../../models/enums/EButtonType";
import Preloader from "../Preloader";

type TButtonProps = {
  children: any;
  className?: string;
  disabled?: boolean;
  outlined?: boolean;
  pending?: boolean;
  primary?: boolean;
  size?: EButtonSize;
  type?: EButtonType;
  onClick?: () => void;
};

const StyledButton: StyledComponent<any, any> = styled.button`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${px2rem(10)};
  background-color: ${({ primary, outlined }: TButtonProps) => primary ? "var(--active-color)" : outlined
          ? "white"
          : "var(--inactive-color)"};
  border: ${({ outlined }: TButtonProps) => outlined ? `${px2rem(1)} solid ${transparentize(.85, "#202020")}` : "none"};
  border-radius: ${px2rem(10)};
  cursor: pointer;
  height: ${({ size }: TButtonProps) => size === EButtonSize.Big ? px2rem(55) : px2rem(40)};
  padding: 0 ${px2rem(14)};
  transition: all .15s;

  & > svg {
    ${size(px2rem(14))};
    fill: ${({ primary }: TButtonProps) => primary ? "var(--inactive-color)" : "var(--active-color)"};
  }

  & > span {
    font-size: ${({ size }: TButtonProps) => size === EButtonSize.Big ? px2rem(18) : px2rem(16)};
    font-weight: ${({ size, primary }: TButtonProps) => size === EButtonSize.Big ? 500 : primary ? 300 : 400};
    color: ${({ primary }: TButtonProps) => primary ? "var(--inactive-color)" : "var(--active-color)"};
  }

  &:not(:disabled)::after {
    content: "";
    display: block;
    position: absolute;
    border-radius: ${px2rem(10)};
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    box-shadow: ${({ size }: TButtonProps) => size === EButtonSize.Big
            ? `0 0 ${px2rem(35)} var(--active-color)`
            : `0 0 ${px2rem(20)} var(--active-color)`};
    transition: all .35s;
  }

  &:not(:disabled):active {
    transform: ${({ size }: TButtonProps) => size === EButtonSize.Big ? "scale(.98)" : "scale(.95)"};

    &::after {
      box-shadow: ${({ size }: TButtonProps) => size === EButtonSize.Big
              ? "0 0 0 var(--active-color)"
              : "0 0 0 transparent"};
      position: absolute;
      border-radius: ${px2rem(10)};
      left: 0;
      top: 0;
      opacity: 1;
      transition: 0s;
    }
  }

  &:disabled {
    background-color: ${({ primary }: TButtonProps) => primary ? transparentize(.95, "#202020") : "white"};
    border: ${({ outlined }: TButtonProps) => outlined
            ? `${px2rem(1)} solid ${transparentize(.95, "#202020")}`
            : "none"};
    cursor: not-allowed;

    & > * {
      color: ${transparentize(.85, "#202020")} !important;
      fill: ${transparentize(.85, "#202020")} !important;
    }
  }
`;
const Button: FunctionComponent<TButtonProps> = ({
  children,
  className,
  disabled,
  outlined = false,
  pending,
  primary = false,
  size = EButtonSize.Small,
  type = EButtonType.Button,
  onClick,
}) => {
  const handleOnClick = (e: any) => {
    e.stopPropagation();
    onClick && onClick();
  };

  return (
    <StyledButton
      data-primary={primary}
      primary={primary}
      outlined={outlined}
      size={size}
      disabled={disabled || pending}
      className={className}
      type={type}
      onClickCapture={handleOnClick}>
      {pending && <Preloader size={100} />}
      {!pending && children}
    </StyledButton>
  );
};

export default Button;
