import 'normalize.css'
import './style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from './router'
import App from './App.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import 'element-plus/dist/index.css'
import "virtual:svg-icons-register"

const pinia = createPinia()
const app = createApp( App )
app
  .use( ElementPlus, { locale: zhCn } )
  .use( router )
  .use( pinia )
  .mount( '#app' )
app.component( 'svg-icon', SvgIcon )

