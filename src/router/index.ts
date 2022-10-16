import Categories from '@/views/Categories.vue'
import EditCategory from '@/views/EditCategory.vue'
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
    {
      path: '/categories/:id/edit',
      name: 'edit-category',
      component: EditCategory
    },
  ]
})

export default router
