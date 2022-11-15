import Categories from "@/views/category/Categories.vue";
import CategoryEdition from "@/views/category/CategoryEdition.vue";

import Secrets from "@/views/secret/Secrets.vue";
import SecretEdition from "@/views/secret/SecretEdition.vue";

import Setup from "@/views/Setup.vue";
import Home from "@/views/Home.vue";

import NotFound from "@/views/NotFound.vue";
import Generator from "@/views/Generator.vue";

import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index";

function setUp(to: any, from: any, next: any) {
    if (store.state.code) {
        next();
    } else {
        next("/setup");
    }
}

function unSet(to: any, from: any, next: any) {
    if (!store.state.code) {
        next();
    } else {
        next("/categories");
    }
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    },
    routes: [
        {
            path: "/generator",
            name: "generator",
            component: Generator,
        },
        {
            path: "/setup",
            name: "setup",
            component: Setup,
            beforeEnter: unSet,
        },
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/categories",
            name: "categories",
            component: Categories,
            beforeEnter: setUp,
        },
        {
            path: "/categories/:id",
            name: "category",
            component: Secrets,
            beforeEnter: setUp,
        },
        {
            path: "/categories/:id/edit",
            name: "edit-category",
            component: CategoryEdition,
            beforeEnter: setUp,
        },
        {
            path: "/new-category",
            name: "new-category",
            component: CategoryEdition,
            beforeEnter: setUp,
        },
        {
            path: "/categories/:categoryId/new-secret",
            name: "new-secret",
            component: SecretEdition,
            beforeEnter: setUp,
        },
        {
            path: "/categories/:categoryId/edit-secret/:secretId",
            name: "edit-secret",
            component: SecretEdition,
            beforeEnter: setUp,
        },
        {
            path: "/404",
            name: "not-found",
            component: NotFound,
        },
        {
            path: "/:catchAll(.*)",
            redirect: "/404",
        },
    ],
});

export default router;
