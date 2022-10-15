<script lang="ts">
import { db } from "@/data/db";
import { defineComponent } from "vue";
import Secret from "../components/Secret.vue";
import Category from "../components/Category.vue";

export default defineComponent({
    data() {
        return {
            data: db,
        };
    },
    components: { Secret, Category }
});
</script>

<template>
    <main>
        <h1 class="title is-3 has-text-centered">Categories</h1>
        <div class="columns is-multiline is-mobile is-3">
            <div class="column is-half-tablet is-one-third-desktop is-full-mobile" v-for="cat of data.categories" v-bind:key="cat.id">
                <Category :category="cat"></Category>
            </div>
        </div>
    </main>
</template>
