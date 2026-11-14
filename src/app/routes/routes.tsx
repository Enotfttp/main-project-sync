import { routesPath } from "./routesPath";
import { NotFoundPage } from "@app/errorBoundary/NotFoundPage";
import { RouterErrorBoundary } from "@app/errorBoundary/RouterErrorBoundary";
import {
  DocumentPage,
  MainPage,
  OptionInfoPage,
  OptionPage,
  PackageInfoPage,
  PackagePage,
  PeriodPage,
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
  routesPath.request.detail.schedule.option.root,
  routesPath.schedule.detail.option.root,
].map((path) => page(path, OptionInfoPage));

const OptionPages = [
  routesPath.request.detail.package.option.root,
  routesPath.schedule.detail.package.option.root,
  routesPath.package.detail.option.root,
].map((path) => page(path, OptionPage));

const PeriodPages = [
  routesPath.request.detail.schedule.period.root,
  routesPath.schedule.detail.period.root,
].map((path) => page(path, PeriodPage));

const DocumentPages = [
  routesPath.request.detail.schedule.period.document.root,
  routesPath.request.detail.schedule.package.document.root,
  routesPath.request.detail.schedule.option.document.root,
  routesPath.request.detail.package.option.detail.document.root,
  routesPath.request.detail.package.document.root,
  routesPath.request.detail.option.document.root,
  routesPath.schedule.detail.period.document.root,
  routesPath.schedule.detail.package.option.document.root,
  routesPath.schedule.detail.package.document.root,
  routesPath.schedule.detail.option.document.root,
  routesPath.package.detail.option.detail.document.root,
  routesPath.package.detail.document.root,
  routesPath.request.detail.schedule.period.document.documentUnion.root,
  routesPath.request.detail.schedule.package.document.documentUnion.root,
  routesPath.request.detail.schedule.option.document.documentUnion.root,
  routesPath.request.detail.package.option.detail.document.documentUnion.root,
  routesPath.request.detail.package.document.documentUnion.root,
  routesPath.request.detail.option.document.documentUnion.root,
  routesPath.schedule.detail.package.option.document.documentUnion.root,
  routesPath.schedule.detail.package.document.documentUnion.root,
  routesPath.schedule.detail.option.document.documentUnion.root,
  routesPath.schedule.detail.period.document.documentUnion.root,
  routesPath.package.detail.option.detail.document.documentUnion.root,
  routesPath.package.detail.document.documentUnion.root,
].map((path) => page(path, DocumentPage));

const RootLayout = () => <Outlet />;

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    errorElement: <RouterErrorBoundary />,
    children: [
      ...PackageInfoPages,
      ...OptionInfoPages,
      ...OptionPages,
      ...PeriodPages,
      ...DocumentPages,
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
