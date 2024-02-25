import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unplugin from '../src/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Unplugin({
    timer: 10 * 1000,
  })],
})
