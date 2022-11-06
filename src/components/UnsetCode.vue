<template>
    <div class="is-flex is-justify-content-center buttons" v-if="codeIsSet">
        <router-link class="button is-rounded is-dark is-small" to="/categories">
            <span class="icon ml-1"><i class="fa-solid fa-layer-group fa-lg"></i></span>
            <span>Categories</span>
        </router-link>
        <button class="button is-rounded is-light is-small" @click="unsetCode()">
            <span class="icon ml-1"><i class="fa-solid fa-arrow-right-from-bracket fa-lg"></i></span>
            <span>Unset the code</span>
        </button>
    </div>
</template>

<script lang="ts">
export default {
    methods: {
        unsetCode() {
            this.$store.commit("SET_CODE", null);
            this.$router.push("/setup");
        }
    },
    computed: {
        codeIsSet() {
            return this.$store.getters.GET_CODE
        },
    },
}
</script>

<style scoped>
</style>