import { StyledUnderTabsLayout } from "./MainTabsLayout.styled";
import { routesPath } from "@app/index";
import { HorizontalTabsTemplate } from "@shared/ui";
import * as React from "react";
import { useMemo } from "react";
import { Outlet } from "react-router-dom";

export const MainTabsLayout = () => {
  const tabs = useMemo(
    () => [
      {
        text: routesPath.package.label,
        tabId: "1",
        path: routesPath.package.root,
      },
      {
        text: routesPath.documents.label,
        tabId: "2",
        path: routesPath.documents.root,
      },
    ],
    [],
  );

  return (
    <>
      <HorizontalTabsTemplate tabs={tabs} isRedirect />
      <StyledUnderTabsLayout>
        <Outlet />
      </StyledUnderTabsLayout>
    </>
  );
};
