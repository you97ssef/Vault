import Categories from '@/views/category/Categories.vue'
import CategoryEdition from '@/views/category/CategoryEdition.vue'
import Secrets from '@/views/Secrets.vue'
import NotFound from '@/views/NotFound.vue'
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
      component: CategoryEdition
    },
    {
      path: '/new-category',
      name: 'new-category',
      component: CategoryEdition
    },
    {
      path: '/404',
      name: 'not-found',
      component: NotFound
    },
    {
      path: "/:catchAll(.*)",
      redirect: '/404'
    },
  ]
})

export default router
