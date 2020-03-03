// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 全局注册组件
import clock from './components/clock'
Vue.component('clock',clock)
// 默认请求地址
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://116.62.46.122:80/BottleProject'
// 中央事件车
import bus from './bus/index'
Vue.prototype.$bus = bus

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
