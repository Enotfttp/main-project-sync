/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_STAND: "development" | "production";
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_MOCKS?: "true" | "false";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
