import { FunctionComponent, memo } from "react";
import styled, { StyledComponent } from "styled-components";
import { px2rem } from "../../common/lib";
import Icon from "../Icon";
import EIcon from "../../models/enums/EIcon";
import Link from "next/link";
import { size } from "polished";

const StyledContainer: StyledComponent<any, any> = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: auto;
  padding: ${px2rem(20)} 0;

  & > a > svg {
    ${size(px2rem(64), px2rem(60.5))};
  }
`;
const PageLayout: FunctionComponent<any> = ({ children, className }) => {
  return (
    <StyledContainer className={className}>
      <Link href="/" passHref>
        <a>
          <Icon name={EIcon.QamonIcon} />
        </a>
      </Link>
      {children}
    </StyledContainer>
  );
};

export default memo(PageLayout);
