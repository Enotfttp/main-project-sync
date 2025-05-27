import { Outlet, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import * as React from 'react';
import { StyledUnderTabsLayout } from './ServiceTabsLayout.styled';
import { HorizontalTabsTemplate } from '@shared/index';
import { routesPath } from '@app/index';
import { Breadcrumbs } from '@widgets/breadcrumbs/Breadcrumbs.tsx';

export const ServiceTabsLayout = () => {
  const { id, serviceId } = useParams();
  if (!id || !serviceId) {
    throw new Error('Вы не выбрали документ РКО');
  }

  const tabs = useMemo(
    () => [
      { text: 'Периоды', tabId: '1', path: routesPath.service.periods.fullPath(id, serviceId) },
      { text: 'События', tabId: '2', path: routesPath.service.events.fullPath(id, serviceId) },
    ],
    [id, serviceId],
  );

  return (
    <>
      <Breadcrumbs />
      <HorizontalTabsTemplate tabs={tabs} isRedirect />
      <StyledUnderTabsLayout>
        <Outlet />
      </StyledUnderTabsLayout>
    </>
  );
};
