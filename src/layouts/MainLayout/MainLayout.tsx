import { StyledMainLayout } from "./MainLayout.styled";
import { Header } from "@widgets/index";
import { Outlet } from "react-router-dom";

export const MainLayout = () => (
  <>
    <Header />
    <StyledMainLayout>
      <Outlet />
    </StyledMainLayout>
  </>
);
