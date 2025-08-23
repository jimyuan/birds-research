import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'


// https://vite.dev/config/
export default defineConfig( {
  plugins: [ vue(),
  createSvgIconsPlugin( {
    iconDirs: [ path.resolve( process.cwd(), "src/assets/svg" ) ], // icon存放的目录
    symbolId: "icon-[name]", // symbol的id
    inject: "body-last", // 插入的位置
    customDomId: "__svg__icons__dom__" // svg的id
  } )
  ],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve( __dirname, './src' ), // 将 @ 指向 src 目录
    },
  },
} )
