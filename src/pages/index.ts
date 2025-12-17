import { lazy } from "react";

export const PeriodsPage = lazy(() => import("./PeriodsPage/PeriodsPage"));
export const EnterPage = lazy(() => import("./EnterPage/EnterPage"));
export const AdminPage = lazy(() => import("./AdminPage/AdminPage"));
export const PackagesPage = lazy(
  () => import("@pages/PackagesPage/PackagesPage"),
);
export const PackageDetailPage = lazy(
  () => import("@pages/PackageDetailPage/PackageDetailPage"),
);
export const SchedulePage = lazy(() => import("./SchedulePage/SchedulePage"));
export const OptionsPage = lazy(() => import("./OptionsPage/OptionsPage"));
export const HistoryPage = lazy(() => import("./HistoryPage/HistoryPage"));
export const DocumentsPage = lazy(
  () => import("./DocumentsPage/DocumentsPage"),
);
