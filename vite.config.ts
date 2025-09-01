import * as path from 'path';

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '');

  const baseConfig = {
    plugins: [react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: 'Пакеты услуг',
            mode: mode,
          },
        },
      })
    ],
    base:'/',
    server:{
      port: 3000,
    },
    preview: {
      port: 3001,
    },
    build:{
      outDir: 'dist',
    },
    resolve:{
      alias:{
        '@app': path.resolve(process.cwd(), 'src/app'),
        '@pages': path.resolve(process.cwd(), 'src/pages'),
        '@features': path.resolve(process.cwd(), 'src/features'),
        '@entities': path.resolve(process.cwd(), 'src/entities'),
        '@shared': path.resolve(process.cwd(), 'src/shared'),
        '@widgets': path.resolve(process.cwd(), 'src/widgets'),
        '@layouts': path.resolve(process.cwd(), 'src/layouts'),
        '@mocks': path.resolve(process.cwd(), 'src/mocks'),
      },
      extensions: ['.tsx', '.ts', '.js'],
    }
  };
  // Настройки только для production
  if (mode === 'production') {
    return {
      ...baseConfig,
      base: '/',
      build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: false,
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: true, // удаляем console.log в prod
            drop_debugger: true,
          },
        },
        rollupOptions: {
          plugins: [
            visualizer({
              filename: 'bundle-stats.html',
              open: false,
              gzipSize: true,
              brotliSize: true,
            }),
            ViteMinifyPlugin({}),
          ],
          output: {
            manualChunks: {
              // Разделение vendor chunks
              react: ['react', 'react-dom'],
              router: ['react-router-dom'],
            },
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
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  };
});

