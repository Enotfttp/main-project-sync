import { Outlet, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import * as React from 'react';
import { NotificationItem, NotificationItemContent, NotificationItemTitle, Spinner } from '@admiral-ds/react-ui';
import { StyledUServiceSelector, StyledUServiceSelectorLayout, StyledUServiceTabs } from './AdminServiceSelector.styled.ts';
import {HorizontalTabsTemplate} from '@shared/ui';
import {routesPath} from '@app/providers';
import {useServices} from '@entities/admin/api/admin.service.ts';

export const AdminServiceSelector = () => {
  const { serviceId } = useParams();
  if (!serviceId) {
    throw new Error('Вы не выбрали документ РКО');
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
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <Spinner dimension="m" />
      </div>
    );
  }

  if (error) {
    return (
      <NotificationItem status="error">
        <NotificationItemTitle>Ошибка загрузки</NotificationItemTitle>
        <NotificationItemContent>Не удалось загрузить или найти сервис</NotificationItemContent>
      </NotificationItem>
    );
  }

  return (
    <StyledUServiceSelector>
      <StyledUServiceTabs>
        <HorizontalTabsTemplate tabs={tabs} isRedirect defaultSelectedTabId="1" dimension="l" />
      </StyledUServiceTabs>
      <StyledUServiceSelectorLayout>
        <Outlet />
      </StyledUServiceSelectorLayout>
    </StyledUServiceSelector>
  );
};
