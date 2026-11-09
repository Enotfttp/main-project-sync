import { lazy } from "react";

export const MainPage = lazy(() => import("@pages/main/MainPage"));
export const RequestPage = lazy(() => import("@pages/request/RequestPage"));
export const RequestHistoryPage = lazy(
  () => import("@pages/request-history/RequestHistoryPage"),
);
export const SchedulePage = lazy(() => import("@pages/schedule/SchedulePage"));
export const ScheduleInfoPage = lazy(
  () => import("@pages/schedule-info/ScheduleInfoPage"),
);
export const PackagePage = lazy(() => import("@pages/package/PackagePage"));
export const PackageInfoPage = lazy(
  () => import("@pages/package-info/PackageInfoPage"),
);
export const OptionInfoPage = lazy(
  () => import("@pages/option-info/OptionInfoPage"),
);
