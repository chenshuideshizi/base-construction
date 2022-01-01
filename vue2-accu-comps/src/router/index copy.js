import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// const asyncRouteFiles = require.context('./async-modules', false, /\.js$/)
// const asyncRoutes = asyncRouteFiles.keys().reduce((acc, key) => acc.concat(asyncRouteFiles(key).default), [])

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  // ...asyncRoutes
  // {
  //   path: '/mark-picture',
  //   name: 'MarkPicture',
  //   // component: () => import(/* webpackChunkName: "mark-picture" */ '../custom-components/mark-picture/README.md') // TODO: 使用 import 会进入 loader 多次
  //   component: resolve => require(['../custom-components/mark-picture/README.md'],resolve) 
  // }
]

console.log('allRoutes', routes)

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
