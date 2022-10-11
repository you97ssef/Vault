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
        <h3>Categories</h3>
        <ul>
            <li v-for="cat of data.categories" v-bind:key="cat.id">
                <h5>{{ cat.id }}- {{ cat.name }}</h5>
                <p>{{ cat.description }}</p>
                <h6>Secrets</h6>
                <div class="columns is-multiline is-mobile is-3">
                    <div class="column is-half-tablet is-one-third-desktop is-full-mobile" v-for="sec of cat.secrets" v-bind:key="sec.id">
                        <Secret :secret="sec"></Secret>
                    </div>
                </div>
            </li>
        </ul>
    </main>
</template>
