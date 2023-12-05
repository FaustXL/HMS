import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/elementviews/HomeView.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/room',
    name: 'room',
    component: () => import('../views/elementviews/RoomView.vue'),
    meta: {
      index: 2
    }
  },
  {
    path: '/resource',
    name: 'resource',
    component: () => import('@/views/elementviews/ResourceView.vue'),
    meta: {
      index: 3
    }
  },
  {
    path: '/dooropen',
    name: 'dooroper',
    component: () => import('@/views/elementviews/DoorOpenView.vue'),
    meta: {
      index: 4
    }
  },
  {
    path: '/client',
    name: 'client',
    component: () => import('@/views/elementviews/ClientView.vue'),
    meta: {
      index: 5
    }
  },
  {
    path: '/resource',
    name: 'resource',
    component: () => import('@/views/elementviews/ResourceView.vue'),
    meta: {
      index: 6
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/elementviews/LoginView.vue'),
    meta: {
      index: 7
    }
  },
  {
    path: '/',
    redirect: '/login'
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
