import { RouteObject } from 'react-router-dom';
import React, { JSX, Suspense } from 'react';
import { routesPath } from './routesPath';
import { RKOPage, ConnectionsPage, PeriodsPage, EventsPage } from '@pages/index';
import { MainLayout, ServiceTabsLayout } from '@layouts/index';
import { Loader } from '@shared/index';
import TestUIPage from '@pages/TestUI/TestUIPage.tsx';

const withSuspense = (Component: React.LazyExoticComponent<() => JSX.Element>) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

export const routes: RouteObject[] = [
  {
    path: routesPath.root,
    element: <MainLayout />,
    children: [
      { path: routesPath.root, element: withSuspense(RKOPage) },
      {
        path: routesPath.service.root,
        element: withSuspense(ConnectionsPage),
        index: true,
      },
      {
        element: <ServiceTabsLayout />,
        children: [
          { path: routesPath.service.events.root, element: withSuspense(EventsPage) },
          { path: routesPath.service.periods.root, element: withSuspense(PeriodsPage) },
        ],
      },
    ],
  },
  {
    path: routesPath.testUIPage,
    element: <TestUIPage />,
  },
];
