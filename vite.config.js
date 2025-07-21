import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_DIRECTORY,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0', // 외부 IP 접속 허용
    port: 5555, // 원하는 포트
    allowedHosts: ['1f807de4cd20.ngrok-free.app'], // 모든 호스트 허용
  },
})
