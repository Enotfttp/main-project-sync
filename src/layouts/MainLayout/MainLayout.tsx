import { StyledMainLayout } from "./MainLayout.styled";
import { ModalProvider } from "@features/ModalRouting/ModalProvider";
import { ModalRouteHandler } from "@features/ModalRouting/ModalRouteHanlder";
import { Breadcrumbs, Header } from "@widgets/index";
import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";

export const MainLayout = () => {
  const location = useLocation();

  return (
    <ModalProvider>
      <ModalRouteHandler />
      <Header />
      <StyledMainLayout>
        {location.pathname.split("/").length > 2 && <Breadcrumbs />}
        <Outlet />
      </StyledMainLayout>
    </ModalProvider>
  );
};
