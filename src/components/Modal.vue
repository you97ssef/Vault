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
            <section class="modal-card-body"
                :class="state.button == 'Delete' ? 'has-background-danger-light' : (state.button == 'Update' ? 'has-background-warning-light' : 'has-background-link-light')" 
            >
                <p>Are you sure you want to make this change ?</p>
            </section>
            <footer class="modal-card-foot">
                <button class="button" 
                    :class="state.button == 'Delete' ? 'is-danger' : (state.button == 'Update' ? 'is-warning' : 'is-dark')" 
                    @click="submit()"
                >
                    <span class="icon">
                        <i class="fa-regular fa-trash-can" v-if="state.button == 'Delete'"></i>
                        <i class="fa-regular fa-plus" v-if="state.button == 'Add'"></i>
                        <i class="fa-solid fa-pen-to-square" v-if="state.button == 'Update'"></i>
                    </span>
                    <span>{{ state.button }}</span> 
                </button>
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