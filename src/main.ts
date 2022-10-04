import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/components/router.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {store,key} from '@/components/vuex/vuex'
import VueCookies from 'vue3-cookies'


import '../static/UEditor/ueditor.config'
import '../static/UEditor/ueditor.all'
import '../static/UEditor/ueditor.parse'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  
app.use(VueCookies);
app.use(store,key)
app.use(router).use(ElementPlus).mount('#app')

import { globalCookiesConfig } from "vue3-cookies";

globalCookiesConfig({
  expireTimes: "30d",
  path: "/",
  domain: "",
  secure: true,
  sameSite: "None",
});
