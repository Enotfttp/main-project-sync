import react from "@vitejs/plugin-react";
import * as path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { ViteMinifyPlugin } from "vite-plugin-minify";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const stand = env.VITE_APP_STAND || "development";

  const standConfigs = {
    development: {
      base: "/",
      server: { port: 3000, host: true },
      build: {
        sourcemap: true,
        assetsDir: "",
        rollupOptions: {
          output: {
            assetFileNames: "[name]-[hash][extname]",
            chunkFileNames: "[name]-[hash].js",
            entryFileNames: "[name]-[hash].js",
          },
        },
      },
    },
    st: {
      base: "/",
      server: { port: 3000, host: true },
      build: {
        sourcemap: false,
        outDir: "dist",
        assetsDir: "",
        rollupOptions: {
          output: {
            assetFileNames: "[name]-[hash][extname]",
            chunkFileNames: "[name]-[hash].js",
            entryFileNames: "[name]-[hash].js",
          },
        },
      },
    },
    production: {
      base: "/",
      build: {
        sourcemap: false,
        minify: "terser",
        outDir: "dist",
        assetsDir: "",
        rollupOptions: {
          output: {
            assetFileNames: "[name]-[hash][extname]",
            chunkFileNames: "[name]-[hash].js",
            entryFileNames: "[name]-[hash].js",
          },
        },
      },
    },
  };

  const config = standConfigs[stand] || standConfigs.development;

  const baseConfig = {
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: "Пакеты услуг",
            mode: mode,
          },
        },
      }),
    ],
    base: config.base,
    server: config.server,
    build: config.build,
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
  // Настройки только для production
  if (mode === "production") {
    return {
      ...baseConfig,
      base: "/",
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
  }

  // Настройки для development
  return {
    ...baseConfig,
    build: {
      sourcemap: true,
      assetsDir: "",
      rollupOptions: {
        output: {
          assetFileNames: "[name]-[hash][extname]",
          chunkFileNames: "[name]-[hash].js",
          entryFileNames: "[name]-[hash].js",
        },
      },
    },
    define: {
      APP_ENV: JSON.stringify(env.APP_ENV),
      APP_STAND: JSON.stringify(stand),
    },
  };
});
