import Categories from '@/views/Categories.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Categories
    },
    {
      path: '/categories',
      name: 'categories',
      redirect: '/'
    },
  ]
})

export default router
