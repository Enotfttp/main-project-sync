import { routesPath } from "./routesPath";
import { NotFoundPage } from "../errorBoundary/NotFoundPage";
import { RouterErrorBoundary } from "../errorBoundary/RouterErrorBoundary";
import {
  AdminServiceSelector,
  MainLayout,
  MainTabsLayout,
} from "@layouts/index";
import {
  AdminPage,
  DocPage,
  DocumentsPage,
  EnterPage,
  PackagePage,
  PackagesPage,
  PeriodsPage,
} from "@pages/index";
import TestUIPage from "@pages/TestUI/TestUIPage";
import { Loader } from "@shared/ui";
import { ProtectedRoute, ProtectedRouteAdmin } from "@widgets/index";
import React, { JSX, Suspense } from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";

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
    path: routesPath.root,
    element: <MainLayout />,
    errorElement: <RouterErrorBoundary />,
    children: [
      {
        element: <MainTabsLayout />,
        children: [
          {
            path: routesPath.packages.root,
            element: withProtectedRoute(PackagesPage),
            index: true,
          },
          {
            path: routesPath.documents.root,
            element: withProtectedRoute(DocPage),
            index: true,
          },
        ],
      },
      {
        element: <Outlet />,
        children: [
          {
            path: routesPath.packages.detail.root,
            element: withProtectedRoute(PackagePage),
          },
          {
            path: routesPath.packages.detail.periods.root,
            element: withProtectedRoute(PeriodsPage),
          },
          {
            path: routesPath.packages.detail.periods.documents.root,
            element: withProtectedRoute(DocumentsPage),
          },
        ],
      },
    ],
  },
  {
    path: "adminka",
    element: <ProtectedRouteAdmin />,
  },
  {
    element: <AdminServiceSelector />,
    errorElement: <RouterErrorBoundary />,
    children: [
      {
        path: routesPath.adminka.root,
        element: withSuspense(AdminPage),
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
