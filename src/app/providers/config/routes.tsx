import { RouteObject } from 'react-router-dom';
import React, { JSX, Suspense } from 'react';
import { routesPath } from './routesPath';
import { RKOPage, ConnectionsPage, PeriodsPage, EventsPage, EnterPage } from '@pages/index';
import { MainLayout, ServiceTabsLayout } from '@layouts/index';
import { Loader } from '@shared/ui';
import TestUIPage from '@pages/TestUI/TestUIPage.tsx';
import { ProtectedRoute } from '@widgets/protectedRoute/ProtectedRoute.tsx';
import { RouterErrorBoundary } from '@app/providers/errorBoundary/RouterErrorBoundary.tsx';

const withSuspense = (Component: React.LazyExoticComponent<() => JSX.Element>) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);
const withProtectedRoute = (Component: React.LazyExoticComponent<() => JSX.Element>) => (
  <ProtectedRoute>
    {withSuspense(Component)}
  </ProtectedRoute>
);

export const routes: RouteObject[] = [
  {
    path: routesPath.root,
    element: <MainLayout />,
    errorElement: <RouterErrorBoundary />,
    children: [
      { path: routesPath.root, element: withProtectedRoute(RKOPage) },
      {
        path: routesPath.service.root,
        element: withProtectedRoute(ConnectionsPage),
        index: true,
      },
      {
        element: <ServiceTabsLayout />,
        children: [
          { path: routesPath.service.events.root, element: withProtectedRoute(EventsPage) },
          { path: routesPath.service.periods.root, element: withProtectedRoute(PeriodsPage) },
        ],
      },
    ],
  },
  {
    path: routesPath.enter.root,
    element: <EnterPage />,
    errorElement: <RouterErrorBoundary />,
  },
  {
    path: routesPath.testUIPage,
    element: <TestUIPage />,
    errorElement: <RouterErrorBoundary />,
  },
];
