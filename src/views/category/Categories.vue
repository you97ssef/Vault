<script lang="ts">
import { defineComponent } from "vue";
import Secret from "../../components/Secret.vue";
import Category from "../../components/Category.vue";

export default defineComponent({
    data() {
        return {
            categories: [],
            edition: false
        };
    },
    components: { Secret, Category },
    methods:{
        toggleEdition() {
            this.edition = !this.edition
        }
    },
    created() {
        this.categories = this.categoryService.all()
    }
});
</script>

<template>
    <main>
        <div class="is-flex is-justify-content-space-between mb-5">
            <div>
                <h1 class="title">Categories</h1>
                <h2 class="subtitle">lists of some particular secrets you define. <i class="has-text-danger" v-if="edition">(Edition mode is on)</i></h2>
            </div>
            <div class="buttons">
                <router-link class="button is-dark" to="new-category" v-if="!edition">
                    <span class="icon">
                        <i class="fa-solid fa-lg fa-plus"></i>
                    </span>
                </router-link>
                <button class="button is-black is-light" v-if="categories.length != 0" @click="toggleEdition()">
                    <span class="icon">
                        <i class="fa-solid fa-lg fa-pen-nib" v-if="!edition"></i>
                        <i class="fa-solid fa-lg fa-xmark" v-if="edition"></i>
                    </span>
                </button>
            </div>
        </div>
        <div class="has-text-centered top-space" v-if="categories.length == 0">
            <img src="@/assets/empty.svg" alt="empty" width="200">
            <h4 class="title is-4 m-2">No categories available!!</h4>
            <router-link class="button is-dark" to="new-category" v-if="!edition">
                <span class="icon">
                    <i class="fa-solid fa-lg fa-plus"></i>
                </span>
                <span>
                    Create a new category
                </span>
            </router-link>
        </div>
        <div class="columns is-multiline is-mobile is-3">
            <div class="column is-half-tablet is-one-third-desktop is-full-mobile" v-for="cat of categories" v-bind:key="cat.id">
                <Category :category="cat" :edition="edition"></Category>
            </div>
        </div>
    </main>
</template>

<style scoped>
.top-space {
    margin-top: 6em;
}
</style>
