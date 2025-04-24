/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly IS_ENABLED_REACT_QUERY_DEV_TOOLS: boolean
    readonly BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
