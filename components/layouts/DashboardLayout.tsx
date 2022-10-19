import { FunctionComponent, memo } from "react";
import styled, { StyledComponent } from "styled-components";
import LayoutHeader from "../headers/LayoutHeader";
import Sidebar from "../sidebars/Sidebar";
import { px2rem } from "../../common/lib";

const StyledContainer: StyledComponent<any, any> = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  & > div {
    flex: 1;
    display: flex;
    flex-direction: row;
    padding: 0 ${px2rem(60)} ${px2rem(60)} 0;

    & > main {
      flex: 1;
      display: flex;
      flex-direction: column;
      background-color: white;
      border-radius: ${px2rem(20)};
    }
  }
`;
const DashboardLayout: FunctionComponent<any> = ({ children }) => {
  return (
    <StyledContainer data-mobile={false}>
      <LayoutHeader />
      <div>
        <Sidebar />
        <main>
          {children}
        </main>
      </div>
    </StyledContainer>
  );
};

export default memo(DashboardLayout);
