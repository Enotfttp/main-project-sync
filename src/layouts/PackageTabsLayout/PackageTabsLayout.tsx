import { StyledUnderTabsLayout, Gap } from "./PackageTabsLayout.styled";
import { routesPath } from "@app/index";
import { PackageDetailPage } from "@pages/index";
import { HorizontalTabsTemplate } from "@shared/ui";
import { Breadcrumbs } from "@widgets/breadcrumbs/Breadcrumbs";
import * as React from "react";
import { useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";

export const PackageTabsLayout = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error("Вы не выбрали Пакет услуг");
  }

  const tabs = useMemo(
    () => [
      {
        text: routesPath.package.detail.schedule.label,
        tabId: "1",
        path: routesPath.package.detail.schedule.fullPath(id),
      },
      {
        text: routesPath.package.detail.options.label,
        tabId: "2",
        path: routesPath.package.detail.options.fullPath(id),
      },
      {
        text: routesPath.package.detail.history.label,
        tabId: "3",
        path: routesPath.package.detail.history.fullPath(id),
      },
    ],
    [id],
  );

  return (
    <>
      <Breadcrumbs />
      <PackageDetailPage />
      <Gap />
      <HorizontalTabsTemplate tabs={tabs} isRedirect />
      <StyledUnderTabsLayout>
        <Outlet />
      </StyledUnderTabsLayout>
    </>
  );
};
