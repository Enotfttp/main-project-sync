import {
  StyledUServiceSelector,
  StyledUServiceSelectorLayout,
  StyledUServiceTabs,
  StyledWhiteBlock,
} from "./AdminServiceSelector.styled";
import { T, Toggle } from "@admiral-ds/react-ui";
import { routesPath } from "@app/providers";
import { useMutationServiceActiveChange, useServices } from "@entities/admin";
import { HorizontalTabsTemplate, Loader, Notification } from "@shared/ui";
import * as React from "react";
import { useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";

export const AdminServiceSelector = () => {
  const { serviceId } = useParams();
  const { data: services = [], isLoading, error } = useServices();
  const { mutateAsync, isPending } = useMutationServiceActiveChange();

  const curStateService = useMemo(
    () => services.find((el) => el.id === serviceId)?.active || false,
    [services, serviceId],
  );

  const tabs = useMemo(
    () =>
      services?.map((service) => ({
        tabId: service.id,
        text: service.name,
        path: routesPath.adminka.fullPath(service.id),
      })),
    [services],
  );

  const handleUpdateActive = (active: boolean) => {
    mutateAsync({ id: serviceId, active });
  };

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
      <StyledWhiteBlock>
        <StyledUServiceTabs>
          <HorizontalTabsTemplate
            tabs={tabs}
            defaultSelectedTabId={serviceId || services[0].id}
            isRedirect
            dimension="l"
          />
          <div>
            <T font="Additional/L">Статус сервиса</T>
            <Toggle
              checked={curStateService}
              onChange={() => handleUpdateActive(!curStateService)}
              dimension="s"
              disabled={isPending}
            >
              {curStateService ? "Включён" : "Выключен"}
            </Toggle>
          </div>
        </StyledUServiceTabs>
      </StyledWhiteBlock>
      <StyledUServiceSelectorLayout>
        <Outlet />
      </StyledUServiceSelectorLayout>
    </StyledUServiceSelector>
  );
};
