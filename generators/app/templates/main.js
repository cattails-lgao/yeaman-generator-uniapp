import App from './App.vue';
import createRouter from '@/routes/index.js';
import createCommon from '@/common/index.js';

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app';

createRouter(Vue);
createCommon(Vue);

const app = new Vue({ 
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return { 
    app
  }
}
// #endif