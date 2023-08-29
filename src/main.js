import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/element.js'
import '@/styles/element-variables.scss'
// 重置样式
import 'normalize.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
