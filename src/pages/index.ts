import { lazy } from "react";

export const MainPage = lazy(() => import("@pages/main/MainPage"));
export const RequestPage = lazy(() => import("@pages/request/RequestPage"));
export const SchedulePage = lazy(() => import("@pages/schedule/SchedulePage"));
export const PackagePage = lazy(() => import("@pages/package/PackagePage"));
