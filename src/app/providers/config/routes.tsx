import { RouteObject } from 'react-router-dom';
import React, { JSX, Suspense } from 'react';
import { routesPath } from './routesPath';
import { RKOPage, ConnectionsPage, PackagesPage } from '@pages/index';
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
        element: <ServiceTabsLayout />,
        children: [
          { path: routesPath.service.connections.root, element: withSuspense(ConnectionsPage) },
          { path: routesPath.service.packages.root, element: withSuspense(PackagesPage) },
        ],
      },
    ],
  },
  {
    path: routesPath.testUIPage,
    element: <TestUIPage />,
  },
];
