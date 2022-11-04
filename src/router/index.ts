import Categories from '@/views/category/Categories.vue'
import CategoryEdition from '@/views/category/CategoryEdition.vue'
import Secrets from '@/views/secret/Secrets.vue'
import NotFound from '@/views/NotFound.vue'
import Setup from '@/views/Setup.vue'
import { createRouter, createWebHistory } from 'vue-router'
import SecretEdition from '@/views/secret/SecretEdition.vue'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/setup',
      name: 'setup',
      component: Setup
    },
    {
      path: '/',
      name: 'home',
      component: Home
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
      path: '/categories/:categoryId/new-secret',
      name: 'new-secret',
      component: SecretEdition
    },
    {
      path: '/categories/:categoryId/edit-secret/:secretId',
      name: 'edit-secret',
      component: SecretEdition
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
