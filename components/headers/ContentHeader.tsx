import { FunctionComponent, useCallback } from "react";
import styled, { StyledComponent } from "styled-components";
import { px2rem } from "../../common/lib";
import Icon from "../Icon";
import EIcon from "../../models/enums/EIcon";
import Button from "../buttons/Button";
import { useRouter } from "next/router";
import { transparentize } from "polished";
import EButtonSize from "../../models/enums/EButtonSize";
import LockSwitcher from "../LockSwitcher";

type TContentHeaderProps = {
  children?: any;
  count?: number;
  title?: string;
  withBack?: boolean;
  withLock?: boolean;
  locked?: boolean;
  onLockToggle?: () => void;
};

const StyledHeader: StyledComponent<any, any> = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${px2rem(20)} ${px2rem(30)} 0;

  & > section {
    display: flex;
    flex-direction: row;
    gap: ${px2rem(10)};

    &:nth-of-type(1) {
      flex: 1 0 auto;

      & > h1 {
        font-size: ${px2rem(32)};
        font-weight: 500;
        line-height: ${px2rem(38.4)};
      }

      & > span {
        font-size: ${px2rem(24)};
        font-weight: 500;
        color: ${transparentize(.8, "#202020")};
        margin-top: ${px2rem(10)};
      }
    }

    &:nth-of-type(2) {
      flex: 0 0 auto;

      & > span {
        font-size: ${px2rem(14)};
        font-weight: 400;
        line-height: ${px2rem(20)};
        background-color: var(--inactive-color);
        padding: ${px2rem(10)};
        border: none;
        border-radius: ${px2rem(10)};
        margin: 0 ${px2rem(30)};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        min-width: 0;
      }
    }
  }
`;
const StyledButton: StyledComponent<any, any> = styled(Button)`
  width: ${px2rem(40)};
  margin-right: ${px2rem(20)};
  padding: 0 !important;

  & > svg {
    transform: rotate(90deg);
  }
`;
const ContentHeader: FunctionComponent<TContentHeaderProps> = ({
  children,
  count,
  title,
  withBack,
  withLock,
  locked,
  onLockToggle,
}) => {
  const router = useRouter();
  const handleBackClick = useCallback(() => {
    if (router) {
      router.back();
    }
  }, [router]);

  return (
    <StyledHeader>
      <section>
        {withBack && (
          <StyledButton size={EButtonSize.Small} primary={false} onClick={handleBackClick}>
            <Icon name={EIcon.Arrow} />
          </StyledButton>
        )}
        {!!title && <h1>{title}</h1>}
        {!!count && <span>{count}</span>}
        {withLock && <LockSwitcher locked={!!locked} onToggle={onLockToggle ? onLockToggle : () => {
        }} />}
      </section>
      <section>
        {children}
      </section>
    </StyledHeader>
  );
};

export default ContentHeader;
