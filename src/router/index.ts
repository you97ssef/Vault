import Categories from '@/views/Categories.vue'
import Secrets from '@/views/Secrets.vue'
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
    {
      path: '/categories/:id',
      name: 'category',
      component: Secrets
    },
  ]
})

export default router
