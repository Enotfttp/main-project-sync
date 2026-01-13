import { lazy } from "react";

export const PeriodsPage = lazy(() => import("./PeriodsPage/PeriodsPage"));
export const EnterPage = lazy(() => import("./EnterPage/EnterPage"));
export const AdminPage = lazy(() => import("./AdminPage/AdminPage"));
export const PackagesPage = lazy(
  () => import("@pages/PackagesPage/PackagesPage"),
);

export const PackagePage = lazy(() => import("@pages/PackagePage/PackagePage"));
export const DocumentsPage = lazy(
  () => import("./DocumentsPage/DocumentsPage"),
);

export const DocPage = lazy(() => import("./DocPage/DocPage"));
