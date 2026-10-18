import { routesPath } from "./routesPath";
import { NotFoundPage } from "@app/errorBoundary/NotFoundPage";
import { RouterErrorBoundary } from "@app/errorBoundary/RouterErrorBoundary";
import { MainPage, PackagePage, RequestPage, SchedulePage } from "@pages/index";
import { Loader } from "@shared/ui";
import { ComponentType, LazyExoticComponent, Suspense } from "react";
import { RouteObject } from "react-router-dom";

const withSuspense = (Component: LazyExoticComponent<ComponentType>) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

export const routes: RouteObject[] = [
  {
    path: routesPath.root,
    element: withSuspense(MainPage),
    errorElement: <RouterErrorBoundary />,
  },
  {
    path: routesPath.request.root,
    element: withSuspense(RequestPage),
  },
  {
    path: routesPath.schedule.root,
    element: withSuspense(SchedulePage),
  },
  {
    path: routesPath.package.root,
    element: withSuspense(PackagePage),
  },
  {
    path: "*",
    element: <NotFoundPage />,
    errorElement: <RouterErrorBoundary />,
  },
];
