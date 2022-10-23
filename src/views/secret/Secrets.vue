<script lang="ts">
import { defineComponent } from "vue";
import Secret from "@/components/Secret.vue";

export default defineComponent({
    data() {
        return {
            category: {}
        };
    },
    created() {
        let category = this.categoryRepo.get(this.$route.params.id);
        if (category) this.category = category;
        else this.$router.push('/404');
    },
    components: { Secret }
});
</script>

<template>
    <main>
        <p class="title is-3 has-text-centered">{{ category.name }}</p>
        <p class="has-text-centered mb-5">{{ category.description }}</p>
        <div class="columns is-multiline is-mobile is-3">
            <div class="column is-half-tablet is-one-third-desktop is-full-mobile" v-for="secret of category.secrets" v-bind:key="secret.id">
                <Secret :secret="secret"></Secret>
            </div>
        </div>
    </main>
</template>
