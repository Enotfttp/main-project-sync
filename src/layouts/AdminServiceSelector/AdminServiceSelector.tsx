import {
  StyledUServiceSelector,
  StyledUServiceSelectorLayout,
  StyledUServiceTabs,
} from "./AdminServiceSelector.styled";
import { routesPath } from "@app/providers";
import { useServices } from "@entities/admin";
import { HorizontalTabsTemplate, Loader, Notification } from "@shared/ui";
import * as React from "react";
import { useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";

export const AdminServiceSelector = () => {
  const { serviceId } = useParams();
  if (!serviceId) {
    throw new Error("Вы не выбрали документ РКО");
  }
  const { data: services = [], isLoading, error } = useServices();

  const tabs = useMemo(
    () =>
      services?.map((service) => ({
        tabId: service.id,
        text: service.name,
        path: routesPath.adminka.fullPath(service.id),
      })),
    [services],
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Notification
        status="error"
        title="Ошибка загрузки"
        body="Не удалось загрузить или найти сервис"
      />
    );
  }

  return (
    <StyledUServiceSelector>
      <StyledUServiceTabs>
        <HorizontalTabsTemplate
          tabs={tabs}
          isRedirect
          defaultSelectedTabId="1"
          dimension="l"
        />
      </StyledUServiceTabs>
      <StyledUServiceSelectorLayout>
        <Outlet />
      </StyledUServiceSelectorLayout>
    </StyledUServiceSelector>
  );
};
