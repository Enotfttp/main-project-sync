/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IS_ENABLED_REACT_QUERY_DEV_TOOLS: string;
  readonly VITE_NODE_ENV: 'development' | 'production';
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
