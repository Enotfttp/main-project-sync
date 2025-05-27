import * as path from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'/',
  server:{
    port: 3000,
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
})
