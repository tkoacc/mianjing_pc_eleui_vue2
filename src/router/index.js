import { getToken } from '@/utils/storage'
import { Message } from 'element-ui'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard')
      },
      {
        path: '/article',
        component: () => import('@/views/article')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/layout',
    redirect: '/dashboard'
  }
]

const router = new VueRouter({
  routes
})

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  // Process of Elimination
  if (getToken() || whiteList.includes(to.path)) return next()
  next('/login')
  Message.error('Please log in first')
})

export default router
