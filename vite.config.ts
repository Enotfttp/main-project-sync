import react from "@vitejs/plugin-react";
import * as path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { ViteMinifyPlugin } from "vite-plugin-minify";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const config = {
    base: "/",
    server: {
      host: true,
      https: false,
      port: 3000,
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
      sourcemap: false,
      minify: "terser",
      assetsDir: "",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          assetFileNames: "[name]-[hash][extname]",
          chunkFileNames: "[name]-[hash].js",
          entryFileNames: "[name]-[hash].js",
        },
        plugins: [
          visualizer({
            filename: "bundle-stats.html",
            open: false,
            gzipSize: true,
            brotliSize: true,
          }),
          ViteMinifyPlugin({}),
        ],
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
        },
      },
    },
  };

  const baseConfig = {
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: "Пакеты услуг",
            mode,
          },
        },
      }),
    ],
    ...config,
    preview: {
      port: 3001,
      host: false,
    },
    resolve: {
      alias: {
        "@app": path.resolve(process.cwd(), "src/app"),
        "@pages": path.resolve(process.cwd(), "src/pages"),
        "@features": path.resolve(process.cwd(), "src/features"),
        "@entities": path.resolve(process.cwd(), "src/entities"),
        "@shared": path.resolve(process.cwd(), "src/shared"),
        "@widgets": path.resolve(process.cwd(), "src/widgets"),
        "@layouts": path.resolve(process.cwd(), "src/layouts"),
        "@mocks": path.resolve(process.cwd(), "src/mocks"),
      },
      extensions: [".tsx", ".ts", ".js"],
    },
  };

  // Настройки для development
  return {
    ...baseConfig,
    define: {
      APP_ENV: JSON.stringify(env.APP_ENV),
    },
  };
});
