<template>
    <nav class="footer bottom-top has-background-link-light is-justify-content-center">
        <div class="columns m-0">
            <div class="column is-multiline is-mobile has-text-centered" v-if="!dataExists">
                <h6 class="title is-6 m-0">Already have exported your data ?</h6>
                <p>
                    <small>If you used the app before and exported your data you can import data</small>
                </p>
                <label class="button is-rounded is-dark my-2">
                    <input class="file-input" type="file" name="resume" @change="importData">
                    <span class="file-icon ml-1">
                        <i class="fas fa-upload fa-lg"></i>
                    </span>
                    <span class="file-label">
                        Import data
                    </span>
                </label>
            </div>
            <div class="column is-multiline is-mobile has-text-centered" v-if="dataExists">
                <h6 class="title is-6 m-0">Export your data into a file</h6>
                <p>
                    <small>You can export your data and use it in another device</small>
                </p>
                <label class="button is-rounded is-dark my-2">
                    <input class="file-input" type="file" name="resume" @change="importData">
                    <span class="file-icon ml-1">
                        <i class="fas fa-download fa-lg"></i>
                    </span>
                    <span class="file-label">
                        Export data
                    </span>
                </label>
            </div>
            <div class="column is-multiline is-mobile has-text-centered">
                <div class="buttons is-justify-content-center mt-2 m-0">
                    <a href="mailto:you97ssef@gmail.com" class="button is-dark">
                        <span class="icon">
                            <i class="fa-solid fa-lg fa-at"></i>
                        </span>
                    </a>
                    <a href="https://youssefb.netlify.app/#contact" class="button is-dark">
                        <span class="icon">
                            <i class="fa-regular fa-lg fa-message"></i>
                        </span>
                    </a>
                    <a href="https://github.com/you97ssef" class="button is-dark">
                        <span class="icon">
                            <i class="fa-brands fa-lg fa-github"></i>
                        </span>
                    </a>
                    <a href="https://www.instagram.com/yusefbahi/" class="button is-dark">
                        <span class="icon">
                            <i class="fa-brands fa-lg fa-instagram"></i>
                        </span>
                    </a>
                </div>
                <h6 class="title is-6">Contact me</h6>
            </div>
        </div>
        <div class="has-text-centered mb-5">
            <h3 class="title is-3 m-0">V A U L T</h3>
            <small class="m-0">by <a href="https://youssefb.netlify.app/">Youssef BAHI</a> - © 2022</small>
            <p></p>
        </div>
    </nav>
</template>

<script lang="ts">
export default {
    methods: {
        exportData() {
            this.dataService.export()
        },
        importData(event: any) {
            this.dataService.import(event.target.files[0])
        }
    },
    computed: {
        dataExists() {
            return this.$store.getters.DATA_EXISTS
        },
    },
}
</script>

<style scoped>
.bottom-top {
  border-top: .2em black solid;
  padding: 1rem;
}
</style>