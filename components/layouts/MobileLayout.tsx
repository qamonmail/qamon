import { FunctionComponent, memo, useCallback, useState } from "react";
import styled, { StyledComponent } from "styled-components";
import MobileSidebar from "../sidebars/MobileSidebar";
import MobileLayoutHeader from "../headers/MobileLayoutHeader";
import Overlay from "../Overlay";
import { useRouter } from "next/router";

type TMobileLayoutProps = {
  title?: string;
  children: any;
  withBack?: boolean;
};

const StyledContainer: StyledComponent<any, any> = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;

  & > main {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }
`;
const MobileLayout: FunctionComponent<TMobileLayoutProps> = ({ title, children, withBack }) => {
  const [sidebarVisibility, setSidebarVisibility] = useState(false);
  const router = useRouter();
  const handleMenuClick = () => {
    setSidebarVisibility(true);
  };
  const handleClose = () => {
    setSidebarVisibility(false);
  };
  const handleBackClick = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <StyledContainer data-mobile={true}>
      <MobileSidebar visibility={sidebarVisibility} onClose={handleClose} />
      <MobileLayoutHeader
        title={title}
        withBack={withBack}
        onMenuClick={handleMenuClick}
        onBackClick={handleBackClick} />
      <main>
        {sidebarVisibility && <Overlay onClick={handleClose} />}
        {children}
      </main>
    </StyledContainer>
  );
};

export default memo(MobileLayout);
