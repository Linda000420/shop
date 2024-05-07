import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
//  二级路由
import Layout from '@/views/layout'
import Cart from '@/views/layout/cart'
import Category from '@/views/layout/category'
import Home from '@/views/layout/home'
import User from '@/views/layout/user'
//  一级路由，路由懒加载
const Login = () => import('@/views/login')
const MyOrder = () => import('@/views/myorder')
const Pay = () => import('@/views/pay')
const ProDetail = () => import('@/views/prodetail')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/cart', component: Cart },
        { path: '/category', component: Category },
        { path: '/home', component: Home },
        { path: '/user', component: User }
      ]
    },
    { path: '/myorder', component: MyOrder },
    { path: '/pay', component: Pay },
    //  动态路由传参，确认将来是哪个商品，路由参数中携带 id
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList }
  ]
})

//  存放所有需要权限访问的页面
const authUrls = ['/pay', '/myorder']

//  全局前置导航守卫
router.beforeEach((to, from, next) => {
  //  判断 to.path 是否在 authUrls 中
  if (!authUrls.includes(to.path)) {
    //  非权限页面直接放行
    next()
    return
  }

  //  是权限页面，判断是否有 token
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
