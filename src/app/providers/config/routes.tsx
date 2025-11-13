import { routesPath } from "./routesPath";
import { NotFoundPage } from "../errorBoundary/NotFoundPage";
import { RouterErrorBoundary } from "../errorBoundary/RouterErrorBoundary";
import {
  MainLayout,
  ServiceTabsLayout,
  AdminServiceSelector,
} from "@layouts/index";
import {
  RKOPage,
  ConnectionsPage,
  PeriodsPage,
  EventsPage,
  EnterPage,
  AdminPage,
} from "@pages/index";
import TestUIPage from "@pages/TestUI/TestUIPage.tsx";
import { Loader } from "@shared/ui";
import { ProtectedRoute } from "@widgets/protectedRoute/ProtectedRoute.tsx";
import React, { JSX, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const withSuspense = (
  Component: React.LazyExoticComponent<() => JSX.Element>,
) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);
const withProtectedRoute = (
  Component: React.LazyExoticComponent<() => JSX.Element>,
) => <ProtectedRoute>{withSuspense(Component)}</ProtectedRoute>;

export const routes: RouteObject[] = [
  {
    path: routesPath.root,
    element: <Navigate to={routesPath.enter.root} />,
    index: true,
  },
  {
    path: routesPath.enter.root,
    element: <EnterPage />,
    errorElement: <RouterErrorBoundary />,
  },
  {
    path: routesPath.rko.root,
    element: <MainLayout />,
    errorElement: <RouterErrorBoundary />,
    children: [
      { path: routesPath.rko.root, element: withProtectedRoute(RKOPage) },
      {
        path: routesPath.rko.service.root,
        element: withProtectedRoute(ConnectionsPage),
        index: true,
      },
      {
        element: <ServiceTabsLayout />,
        children: [
          {
            path: routesPath.rko.service.events.root,
            element: withProtectedRoute(EventsPage),
          },
          {
            path: routesPath.rko.service.periods.root,
            element: withProtectedRoute(PeriodsPage),
          },
        ],
      },
    ],
  },
  {
    element: <AdminServiceSelector />,
    children: [
      {
        path: routesPath.adminka.root,
        element: <AdminPage />,
      },
    ],
  },
  {
    path: routesPath.testUIPage.root,
    element: <TestUIPage />,
    errorElement: <RouterErrorBoundary />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
    errorElement: <RouterErrorBoundary />,
  },
];
