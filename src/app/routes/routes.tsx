import { routesPath } from "./routesPath";
import { NotFoundPage } from "@app/errorBoundary/NotFoundPage";
import { RouterErrorBoundary } from "@app/errorBoundary/RouterErrorBoundary";
import {
  MainPage,
  OptionInfoPage,
  OptionPage,
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

const page = (
  path: string,
  Page: LazyExoticComponent<ComponentType>,
): RouteObject => ({
  path,
  element: withSuspense(Page),
});

const PackageInfoPages = [
  routesPath.request.detail.package.root,
  routesPath.schedule.detail.package.root,
].map((path) => page(path, PackageInfoPage));

const OptionInfoPages = [
  routesPath.request.detail.option.root,
  routesPath.schedule.detail.option.root,
].map((path) => page(path, OptionInfoPage));

const OptionPages = [
  routesPath.request.detail.package.option.root,
  routesPath.schedule.detail.package.option.root,
  routesPath.package.detail.option.root,
].map((path) => page(path, OptionPage));

const RootLayout = () => <Outlet />;

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    errorElement: <RouterErrorBoundary />,
    children: [
      ...PackageInfoPages,
      ...OptionInfoPages,
      ...OptionPages,
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
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
    errorElement: <RouterErrorBoundary />,
  },
];
