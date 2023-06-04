import Secrets from "@/views/secret/Secrets.vue";
import SecretEdition from "@/views/secret/SecretEdition.vue";

import Setup from "@/views/Setup.vue";
import Home from "@/views/Home.vue";

import NotFound from "@/views/NotFound.vue";
import Generator from "@/views/Generator.vue";
import FileCrypto from "@/views/FileCrypto.vue";

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
        next("/secrets");
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
            path: "/secrets",
            name: "secrets",
            component: Secrets,
            beforeEnter: setUp,
        },
        {
            path: "/new-secret",
            name: "new-secret",
            component: SecretEdition,
            beforeEnter: setUp,
        },
        {
            path: "/edit-secret/:secretId",
            name: "edit-secret",
            component: SecretEdition,
            beforeEnter: setUp,
        },
        {
            path: "/file-crypto",
            name: "file-crypto",
            component: FileCrypto
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
