import { StyledMainLayout } from "./MainLayout.styled";
import { routesPath } from "@app/providers";
import { Breadcrumbs, Header } from "@widgets/index";
import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";

export const MainLayout = () => {
  const location = useLocation();
  return (
    <>
      <Header />
      <StyledMainLayout>
        {location.pathname !== routesPath.packages.root && <Breadcrumbs />}
        <Outlet />
      </StyledMainLayout>
    </>
  );
};
