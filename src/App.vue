<template>
    <Navbar></Navbar>
    <section class="section">
        <div class="container">
            <RouterView />
        </div>
    </section>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from "./components/Navbar.vue";
</script>