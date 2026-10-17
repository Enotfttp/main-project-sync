import { routes } from "../index";
import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const AppRouter: React.FC = () => {
  const appRouter = React.useMemo(() => createBrowserRouter(routes), []);

  return <RouterProvider router={appRouter} />;
};
