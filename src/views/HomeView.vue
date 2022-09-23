<script lang="ts">
import { db } from "@/data/db";
import { defineComponent } from "vue";
import Secret from "../components/Secret.vue";

export default defineComponent({
    data() {
        return {
            data: db,
        };
    },
    components: { Secret }
});
</script>

<template>
    <main>
        <h1>Chest application</h1>
        <h3>Categories</h3>
        <ul>
            <li v-for="cat of data.categories">
                <h5>{{ cat.id }}- {{ cat.name }}</h5>
                <p>{{ cat.description }}</p>
                <h6>Secrets</h6>
                <ul>
                    <li v-for="sec of cat.secrets">
                        <Secret :secret="sec"></Secret>
                    </li>
                </ul>
            </li>
        </ul>
    </main>
</template>
