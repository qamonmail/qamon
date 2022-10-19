import { FunctionComponent, useEffect } from "react";
import styled, { StyledComponent } from "styled-components";
import { px2rem } from "../common/lib";
import Overlay from "./Overlay";
import { jelly } from "../styles/animations";
import { size } from "polished";
import Icon from "./Icon";
import EIcon from "../models/enums/EIcon";

type TWindowProps = {
  children: any;
  visible: boolean;
  onClose: () => void;
};

const StyledContainer: StyledComponent<any, any> = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  ${size("100%")};
  display: flex;
  justify-content: center;
  align-items: center;

  & > dialog {
    position: absolute;
    left: auto;
    right: auto;
    top: auto;
    bottom: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${px2rem(20)};
    background-color: white;
    border: none;
    border-radius: ${px2rem(10)};
    padding: ${px2rem(20)};
    z-index: 1000;
    ${jelly()};
    width: calc(100vw - ${px2rem(40)});
    max-width: ${px2rem(350)};

    & > header > button {
      position: absolute;
      ${size(px2rem(26))};
      padding: ${px2rem(5)};
      background: none;
      border: none;
      cursor: pointer;
      right: ${px2rem(5)};
      top: ${px2rem(5)};

      & > svg {
        ${size(px2rem(16))};
        transform: rotate(45deg);
      }
    }

    & > svg {
      ${size(px2rem(22))};
      position: absolute;
      left: ${px2rem(10)};
      top: ${px2rem(10)};

      &[data-icon="error"] {
        fill: var(--red-color);
      }
    }

    & > p {
      font-size: ${px2rem(20)};
      font-weight: 400;
      line-height: ${px2rem(28)};
      text-align: center;
    }

    @media (min-width: 992px) {
      max-width: ${px2rem(350)};
    }
  }
`;
const Window: FunctionComponent<TWindowProps> = ({
  children,
  visible,
  onClose
}) => {
  useEffect(() => {
    if (visible) {
      scrollTo(0, 0);
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <>
      <Overlay />
      <StyledContainer>
        <dialog>
          <header>
            <button onClick={onClose}>
              <Icon name={EIcon.Plus} />
            </button>
          </header>
          {children}
        </dialog>
      </StyledContainer>
    </>
  );
};

export default Window;
