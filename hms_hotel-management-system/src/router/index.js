import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/elementviews/HomeView.vue')
  },
  {
    path: '/room',
    name: 'room',
    component: () => import('../views/elementviews/RoomView.vue')
  },
  {
    path: '/resource',
    name: 'resource',
    component: () => import('@/views/elementviews/ResourceView.vue')
  },
  {
    path: '/dooropen',
    name: 'dooroper',
    component: () => import('@/views/elementviews/DoorOpenView.vue')
  },
  {
    path: '/client',
    name: 'client',
    component: () => import('@/views/elementviews/ClientView.vue')
  },
  {
    path: '/resource',
    name: 'resource',
    component: () => import('@/views/elementviews/ResourceView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/elementviews/LoginView.vue')
  },
  {
    path: '/',
    redirect: '/client'
  }
]

const router = new VueRouter({
  routes
})

export default router
