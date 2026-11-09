import { routesPath } from "./routesPath";
import { NotFoundPage } from "@app/errorBoundary/NotFoundPage";
import { RouterErrorBoundary } from "@app/errorBoundary/RouterErrorBoundary";
import {
  MainPage,
  OptionInfoPage,
  PackageInfoPage,
  PackagePage,
  RequestHistoryPage,
  RequestPage,
  ScheduleInfoPage,
  SchedulePage,
} from "@pages/index";
import { Loader } from "@shared/ui";
import { ComponentType, LazyExoticComponent, Suspense } from "react";
import { Outlet, RouteObject } from "react-router-dom";

const withSuspense = (Component: LazyExoticComponent<ComponentType>) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

const RootLayout = () => <Outlet />;

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    errorElement: <RouterErrorBoundary />,
    children: [
      {
        path: routesPath.root,
        element: withSuspense(MainPage),
      },
      {
        path: routesPath.request.root,
        element: withSuspense(RequestPage),
      },
      {
        path: routesPath.request.detail.history.root,
        element: withSuspense(RequestHistoryPage),
      },
      {
        path: routesPath.schedule.root,
        element: withSuspense(SchedulePage),
      },
      {
        path: routesPath.request.detail.schedule.root,
        element: withSuspense(ScheduleInfoPage),
      },
      {
        path: routesPath.package.root,
        element: withSuspense(PackagePage),
      },
      {
        path: routesPath.request.detail.package.root,
        element: withSuspense(PackageInfoPage),
      },
      {
        path: routesPath.package.detail.option.root,
        element: withSuspense(OptionInfoPage),
      },
      {
        path: routesPath.request.detail.option.root,
        element: withSuspense(OptionInfoPage),
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
    errorElement: <RouterErrorBoundary />,
  },
];
