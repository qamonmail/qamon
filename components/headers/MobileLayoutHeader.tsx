import { FunctionComponent, useCallback } from "react";
import styled, { StyledComponent } from "styled-components";
import Icon from "../Icon";
import EIcon from "../../models/enums/EIcon";
import { px2rem } from "../../common/lib";
import { size } from "polished";
import { routes } from "../../consts/routes";
import { useRouter } from "next/router";

type MobileLayoutHeaderProps = {
  title?: string;
  withBack?: boolean;
  onMenuClick: () => void;
  onBackClick: () => void;
};

const StyledHeader: StyledComponent<any, any> = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--inactive-color);
  height: ${px2rem(42)};

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    ${size(px2rem(42))};

    & > svg {
      ${size(px2rem(28))};

      &[data-icon="arrow"] {
        ${size(px2rem(14))};
        transform: rotate(90deg);
      }
    }
  }

  & > h1 {
    font-size: ${px2rem(18)};
    font-weight: 500;
    margin-left: ${px2rem(12)};
  }

  & > ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: auto;

    & > li {
      & > button {
        display: flex;
        justify-content: center;
        align-items: center;
        background: none;
        border: none;
        cursor: pointer;
        ${size(px2rem(42))};

        & > svg {
          ${size(px2rem(18))};
        }
      }
    }
  }
`;
const MobileLayoutHeader: FunctionComponent<MobileLayoutHeaderProps> = ({
  title, withBack, onMenuClick, onBackClick
}) => {
  const { push } = useRouter();
  const handleComposeClick = useCallback(() => {
    void push(routes.compose);
  }, [push]);

  return (
    <StyledHeader>
      {!withBack && onMenuClick && (
        <button onClick={onMenuClick}>
          <Icon name={EIcon.Menu} />
        </button>
      )}
      {withBack && onBackClick && (
        <button onClick={onBackClick}>
          <Icon name={EIcon.Arrow} />
        </button>
      )}
      <h1>{title}</h1>
      {!withBack && (
        <ul>
          {/*<li>
           <button>
           <Icon name={EIcon.Search} />
           </button>
           </li>*/}
          <li>
            <button onClick={handleComposeClick}>
              <Icon name={EIcon.Sent} />
            </button>
          </li>
        </ul>
      )}
    </StyledHeader>
  );
};

export default MobileLayoutHeader;
