import styled, { StyledComponent } from "styled-components";
import { FunctionComponent } from "react";
import { px2rem } from "../common/lib";
import Icon from "./Icon";
import EIcon from "../models/enums/EIcon";
import { size, transitions } from "polished";

type TAccordionProps = {
  content: any;
  open?: boolean;
  title: string;
};

const StyledContainer: StyledComponent<any, any> = styled.details`
  & > summary {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${px2rem(8)};
    list-style: none;
    cursor: pointer;

    & > span {
      font-size: ${px2rem(16)};
      font-weight: 500;
      line-height: ${px2rem(22.4)};
      white-space: nowrap;
      color: white;

      @media (min-width: 992px) {
        font-size: ${px2rem(20)};
        font-weight: 600;
        line-height: ${px2rem(28)};
        color: var(--active-color);
      }
    }

    & > svg {
      ${size(px2rem(10))};
      ${transitions("transform .15s")};
      transform: rotate(-90deg);
      fill: white;

      @media (min-width: 992px) {
        fill: var(--active-color);
      }
    }

    &::-webkit-details-marker {
      display: none;
    }
  }

  &[open] {
    & > summary > svg {
      transform: rotate(0);
    }
  }
`;
const Accordion: FunctionComponent<TAccordionProps> = ({ content, open, title }) => {
  return (
    <StyledContainer open={open}>
      <summary>
        <span>
          {title}
        </span>
        <Icon name={EIcon.Arrow} />
      </summary>
      {content}
    </StyledContainer>
  );
};

export default Accordion;
