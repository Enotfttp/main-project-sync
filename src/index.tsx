import {
  DropdownProvider,
  FontsVTBGroup,
  LIGHT_THEME,
} from "@admiral-ds/react-ui";
import { AppRouter } from "@app/index";
import { AuthProvider } from "@app/providers/authProvider/AuthProvider";
import { makeServer } from "@mocks/server";
import { Loader } from "@shared/ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import "./index.css";

makeServer();

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
  import("@tanstack/react-query-devtools/build/modern/production.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={LIGHT_THEME}>
      <DropdownProvider>
        <FontsVTBGroup />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AppRouter />
            <ReactQueryDevtools initialIsOpen />
            {import.meta.env.VITE_APP_STAND === "development" && (
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
