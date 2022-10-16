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
        <div class="is-flex is-justify-content-space-between mb-5">
            <div>
                <h1 class="title">Categories</h1>
                <h2 class="subtitle">lists of some particular secrets you define.</h2>
            </div>
            <div class="buttons">
                <button class="button is-dark">
                    <i class="fa-solid fa-plus"></i>
                </button>
                <button class="button is-black">
                    <i class="fa-solid fa-pen-nib"></i>
                </button>
            </div>
        </div>
        <div class="columns is-multiline is-mobile is-3">
            <div class="column is-half-tablet is-one-third-desktop is-full-mobile" v-for="cat of data.categories" v-bind:key="cat.id">
                <Category :category="cat"></Category>
            </div>
        </div>
    </main>
</template>
