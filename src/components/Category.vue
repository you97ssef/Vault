<template>
    <router-link :to="{ name: 'category', params: { id: category.id }}">
        <div class="card has-background-link-light">
            <div class="card-content">
                <p class="subtitle is-3 has-text-centered m-3">{{ category.name }}</p>
            </div>
        </div>
    </router-link>
</template>

<style scoped>
.card {
    border: .2em black solid;
}
.borderless-button {
    border: 0;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props:[
        "category"
    ],
});
</script>