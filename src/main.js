// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
});
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://192.168.4.149:6001';   //请求的默认路径

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use(config => {
// 让每个请求携带token--['token']为自定义key
//   let token = sessionStorage.getItem('token');
//   console.log(token)
//   Object.assign(config.headers, { 'token': token });
//   axios.defaults.headers.common['token'] = token;
  config.headers.token=JSON.parse(sessionStorage.getItem('token'));
  return config;
},error =>{
  console.log(error); // for debug
  Promise.reject(error);
});

Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
});
