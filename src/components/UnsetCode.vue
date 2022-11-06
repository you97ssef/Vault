<template>
    <div class="is-flex is-justify-content-center" v-if="codeIsSet">
        <button class="button is-rounded is-dark is-small" @click="unsetCode()">
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