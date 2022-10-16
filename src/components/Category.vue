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
.card:hover {
  transform: scale(1.02);
  transition: all 0.3s ease;
  box-shadow: 0 0.125rem 0.75rem #000 !important;
  z-index: 3;
  border-color: #52616b !important;
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