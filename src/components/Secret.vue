<template>
    <div class="card has-background-link-light">
        <div class="card-content">
            <p class="title is-2 has-text-centered mb-5">{{ secret.topic }}</p>
            <p class="title is-6 has-text-centered mb-2">
                <i class="fa-solid fa-user"></i>
                {{ visibleUsername ? show(secret.username) : '************************' }}
            </p>
            <div class="buttons is-justify-content-center are-small">
                <button class="button is-rounded is-black" @click="showHideUsername()">
                    <i class="fa-solid fa-eye" v-if="!visibleUsername"></i>
                    <i class="fa-solid fa-eye-slash" v-if="visibleUsername"></i>
                </button> 
                <button class="button is-rounded is-dark" @click="copy(show(secret.username))">
                    <i class="fa-solid fa-copy"></i>
                </button>
            </div>
            <p class="title is-6 has-text-centered mb-2">
                <i class="fa-solid fa-key"></i>
                {{ visibleSecret ? show(secret.secret) : '************************' }}
            </p>
            <div class="buttons is-justify-content-center are-small">
                <button class="button is-rounded is-black" @click="showHideSecret()">
                    <i class="fa-solid fa-eye" v-if="!visibleSecret"></i>
                    <i class="fa-solid fa-eye-slash" v-if="visibleSecret"></i>
                </button> 
                <button class="button is-rounded is-dark" @click="copy(show(secret.secret))">
                    <i class="fa-solid fa-copy"></i>
                </button>
            </div>
            <div class="buttons is-justify-content-space-between">
                <button type="button" class="borderless-button has-background-link-light">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button type="button" class="borderless-button has-background-link-light">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    </div>
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
import { SecretService } from "@/services/secret-service";
import { defineComponent } from "vue";

export default defineComponent({
    props:[
        "secret"
    ],
    data() {
        return {
            secretService: new SecretService(this.config),
            visibleUsername: false,
            visibleSecret: false
        };
    },
    methods: {
        show(secret: string){
            return this.secretService.decrypt(secret)
        },
        showHideUsername() {
            this.visibleUsername = ! this.visibleUsername
        },
        showHideSecret() {
            this.visibleSecret = ! this.visibleSecret
        },
        copy(string: string) {
            navigator.clipboard.writeText(string);
            console.log('copied successfully!')
        }
    },
});
</script>