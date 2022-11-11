<template>
    <div class="card has-background-link-light">
        <div class="card-content">
            <p class="title is-2 has-text-centered mb-5">{{ secret.topic }}</p>
            <p class="has-text-centered mb-2">
                <i class="fa-solid fa-user"></i> <b>Username/Email :</b>
                {{ visibleUsername ? (show(secret.username) ? show(secret.username) : "The code you set up is maybe wrong!") : '************************' }}
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
            <p class="has-text-centered mb-2">
                <i class="fa-solid fa-key"></i> <b>Password/Secret :</b>
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
            <div class="is-flex is-justify-content-end">
                <router-link 
                    :to="{ name: 'edit-secret', params: { categoryId: $route.params.id, secretId: secret.id } }" 
                    class="button is-warning is-light"
                >
                    <span class="icon">
                        <i class="fa-solid fa-lg fa-pen-to-square"></i>
                    </span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import type { Secret } from "@/models/secret";
import { SecretService } from "@/services/secret-service";
import { defineComponent, type PropType } from "vue";

export default defineComponent({
    props: {
        secret: {
            type: Object as PropType<Secret>,
            required: true
        },
    },
    data() {
        return {
            secretService: new SecretService(this.$store.getters.GET_CODE),
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

<style scoped>
.card {
    border: .2em black solid;
}
</style>