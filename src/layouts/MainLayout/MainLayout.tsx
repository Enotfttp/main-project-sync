import { StyledMainLayout } from "./MainLayout.styled";
import { Breadcrumbs, Header } from "@widgets/index";
import * as React from "react";
import { Outlet } from "react-router-dom";

export const MainLayout = () => (
  <>
    <Header />
    <StyledMainLayout>
      <Breadcrumbs />
      <Outlet />
    </StyledMainLayout>
  </>
);
