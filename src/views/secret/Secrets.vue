<script lang="ts">
import { defineComponent } from "vue";
import Secret from "@/components/Secret.vue";

export default defineComponent({
    data() {
        return {
            category: {},
            secrets: []
        };
    },
    created() {
        let category = this.categoryRepo.get(this.$route.params.id);
        if (category) {
            this.category = category;
            this.secrets = this.secretRepo.all(this.$route.params.id)
        }
        else this.$router.push('/404');
    },
    components: { Secret }
});
</script>

<template>
    <main>
        <div class="is-flex is-justify-content-space-between mb-5">
            <div>
                <h1 class="title">{{ category.name }}</h1>
                <h2 class="subtitle">
                    {{ category.description ? category.description : "(This category has no description)" }}
                </h2>
            </div>
            <div class="buttons">
                <router-link class="button is-dark" :to="{ name: 'new-secret', params: { categoryId: $route.params.id } }">
                    <span class="icon">
                        <i class="fa-solid fa-lg fa-plus"></i>
                    </span>
                </router-link>
                <router-link class="button is-black is-light" to="/categories">
                    <span class="icon">
                        <i class="fa-solid fa-lg fa-arrow-left-long"></i>
                    </span>
                </router-link>
            </div>
        </div>
        <div class="has-text-centered top-space" v-if="secrets.length == 0">
            <img src="@/assets/images/empty.svg" alt="empty" width="200">
            <h4 class="title is-4 m-2">No Secrets available!!</h4>
            <router-link class="button is-dark" :to="{ name: 'new-secret', params: { categoryId: $route.params.id } }">
                <span class="icon">
                    <i class="fa-solid fa-lg fa-plus"></i>
                </span>
                <span>
                    Create a new secret
                </span>
            </router-link>
        </div>
        <div class="columns is-multiline is-mobile is-3">
            <div class="column is-half-tablet is-one-third-desktop is-full-mobile" v-for="secret of secrets" v-bind:key="secret.id">
                <Secret :secret="secret"></Secret>
            </div>
        </div>
    </main>
</template>

<style scoped>
.top-space {
    margin-top: 6em;
}
</style>