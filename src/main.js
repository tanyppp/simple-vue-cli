import App from './App'
import Vue from 'vue'

// 重写es6方法，兼容作用
import '@babel/polyfill';

new Vue({
  render: h => h(App)
}).$mount('#root')
