import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LIGHT_THEME, FontsVTBGroup, DropdownProvider } from '@admiral-ds/react-ui';
import { ThemeProvider } from 'styled-components';
import { AppRouter } from '@app/index';
import { Loader } from '@shared/ui';
import './index.css';
import { AuthProvider } from '@app/providers/authProvider/AuthProvider.tsx';

const isShowDevTools = import.meta.env.VITE_IS_ENABLED_REACT_QUERY_DEV_TOOLS === 'true';

if (import.meta.env.VITE_APP_ENV === 'development') {
  import('@mocks/msw/browser').then(({ worker }) => worker.start());
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then((d) => ({
    default: d.ReactQueryDevtools,
  })),
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={LIGHT_THEME}>
      <DropdownProvider>
        <FontsVTBGroup />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AppRouter />
            <ReactQueryDevtools initialIsOpen />
            {isShowDevTools && (
              <React.Suspense fallback={<Loader />}>
                <ReactQueryDevtoolsProduction />
              </React.Suspense>
            )}
          </AuthProvider>
        </QueryClientProvider>
      </DropdownProvider>
    </ThemeProvider>
  </StrictMode>,
);
