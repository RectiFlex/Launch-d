import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'web3-vendor': ['wagmi', 'viem', '@web3modal/wagmi'],
          'ui-vendor': ['framer-motion', '@react-spring/web', 'lucide-react'],
          'state-vendor': ['zustand', '@tanstack/react-query']
        }
      }
    },
    target: 'esnext',
    minify: 'esbuild'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: true,
    port: 5173
  },
  optimizeDeps: {
    include: [
      '@react-spring/web',
      'framer-motion',
      'lucide-react',
      'wagmi',
      'viem',
      '@web3modal/wagmi',
      'react-router-dom'
    ]
  }
});