/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IS_ENABLED_REACT_QUERY_DEV_TOOLS: string;
  readonly VITE_APP_STAND: 'development' | 'production' | 'st';
  readonly VITE_API_BASE_URL: string;
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
