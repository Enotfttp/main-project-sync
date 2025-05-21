import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorBoundary, routes } from './index';

export const AppRouter: React.FC = () => {
  const appRouter = React.useMemo(() => createBrowserRouter(routes), []);

  return (
    <ErrorBoundary>
      <RouterProvider router={appRouter} />
    </ErrorBoundary>
  );
};
