import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LIGHT_THEME, FontsVTBGroup, DropdownProvider } from '@admiral-ds/react-ui';
import { ThemeProvider } from 'styled-components';
import { AppRouter } from '@app/index';
import { Loader } from '@shared/index';
import './index.css';

const isShowDevTools = import.meta.env.VITE_IS_ENABLED_REACT_QUERY_DEV_TOOLS === 'true';

if (import.meta.env.VITE_NODE_ENV === 'development') {
  import('@mocks/msw/browser').then(({ worker }) => worker.start());
}

const queryClient = new QueryClient();

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
          <AppRouter />
          <ReactQueryDevtools initialIsOpen />
          {isShowDevTools && (
            <React.Suspense fallback={<Loader />}>
              <ReactQueryDevtoolsProduction />
            </React.Suspense>
          )}
        </QueryClientProvider>
      </DropdownProvider>
    </ThemeProvider>
  </StrictMode>,
);
