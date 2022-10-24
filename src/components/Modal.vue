<template>
    <div class="modal"
        :class="state.active"
    >
        <div class="modal-background" @click="close()"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ state.title }}</p>
                <button class="delete" @click="close()"></button>
            </header>
            <section class="modal-card-body">
                <p>Are you sure you want to make this change ?</p>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-dark" @click="submit()">{{ state.button }}</button>
                <button class="button" @click="close()">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props:["state"],
    methods: {
        close() {
            this.$emit("close", "")
        },
        submit() {
            this.$emit("submit", this.state.button)
        }
    }
}
</script>

<style>

</style>