import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import ProductList from '@/components/productList'
import ProductDetail from '@/components/productDetail'
import HeaderBar from '@/components/common/headerBar'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      meta: {
        keepAlive: true,
        title:'首页'
      },
      component: Login
    },
    {
      path: '/productList',
      name: 'ProductList',
      meta: {
        keepAlive: true,
        title:'首页1'
      },
      component: ProductList
    },
    {
      path: '/productDetail',
      name: 'ProductDetail',
      meta: {
        keepAlive: true,
        title:'首页2'
      },
      component: ProductDetail
    }
  ]
})
