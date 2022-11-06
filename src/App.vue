<template>
    <Navbar></Navbar>
    <section class="section">
        <div class="container">
            <UnsetCode></UnsetCode>
            <RouterView />
        </div>
    </section>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from "./components/Navbar.vue";
import UnsetCode from "./components/UnsetCode.vue";
</script>