import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL} from 'url'

// https://vitejs.dev/config/
// resolve 사용해서 alias설정해서 해당 파일 url경로를 간결하게 표현식으로 바꾸자
// 위에 import { fileURLToPath, URL} from 'url' 선언 후 아래 처럼 사용
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0'
  },
  resolve: {
      alias: {
        '@': fileURLToPath(new URL(`./src`, import.meta.url)),
        '@assets': fileURLToPath(new URL(`./src/assets`, import.meta.url)),
        '@components': fileURLToPath(new URL(`./src/components`, import.meta.url)),
        '@pages': fileURLToPath(new URL(`./src/pages`, import.meta.url)),
        '@types': fileURLToPath(new URL(`./src/types`, import.meta.url)),
        '@recoil': fileURLToPath(new URL(`./src/recoil`, import.meta.url)),
        '@apis': fileURLToPath(new URL(`./src/apis`, import.meta.url)),
      },
  },
  // CSS를 기본적인걸 사용 하지 않고 SCSS 스타일 사용
  // SCSS 전역 사용
  css:{
    preprocessorOptions:{
      scss:{
        additionalData: '@import "./src/assets/styles/main.scss";',
      },
    },
  },
})
