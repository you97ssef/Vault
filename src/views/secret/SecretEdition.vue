<template>
    <div>
        <div class="is-flex is-justify-content-space-between mb-5">
            <div>
                <h1 class="title">{{ setting.title }} Secret</h1>
                <h2 class="subtitle">{{ setting.subtitle }}</h2>
            </div>
            <div class="m-2 buttons" v-if="setting.edition">
                <router-link :to="{ name: 'category', params: { id: $route.params.categoryId } }" class="button is-black is-dark">
                    <span class="icon">
                        <i class="fa-solid fa-lg fa-ban"></i>
                    </span>
                </router-link>
            </div>
        </div>
        <form class="top-space" @submit.prevent="confirm()">
            <div class="field">
                <label class="label">Topic</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Secret topic ..." v-model="secret.topic" required>
                </div>
            </div>
            <label class="label">Username/Email</label>
            <div class="field is-grouped">
                <div class="control is-expanded">
                    <input 
                        class="input" 
                        :type="usernameVisibility ? 'text' : 'password'" 
                        placeholder="Username ..." 
                        v-model="secret.username"
                        required
                    >
                </div>
                <div class="control">
                    <button type="button" class="button is-dark" @click="toggleVisibility('username')">
                        <div class="icon">
                            <i class="fa-solid fa-lg fa-eye" v-if="!usernameVisibility"></i>
                            <i class="fa-solid fa-lg fa-eye-slash" v-if="usernameVisibility"></i>
                        </div>
                    </button>
                </div>
                <div class="control">
                    <button type="button" class="button is-dark" @click="copy('username')">
                        <div class="icon">
                            <i class="fa-solid fa-lg fa-copy"></i>
                        </div>
                    </button>
                </div>
            </div>
            <SecretGenerator @secret="usernameGenerated"></SecretGenerator>
            <label class="label">Secret/Password</label>
            <div class="field is-grouped">
                <div class="control is-expanded">
                    <input 
                        class="input" 
                        :type="passwordVisibility ? 'text' : 'password'" 
                        placeholder="Secret ..." 
                        v-model="secret.secret"
                    >
                </div>
                <div class="control">
                    <button type="button" class="button is-dark" @click="toggleVisibility('secret')">
                        <div class="icon">
                            <i class="fa-solid fa-lg fa-eye" v-if="!passwordVisibility"></i>
                            <i class="fa-solid fa-lg fa-eye-slash" v-if="passwordVisibility"></i>
                        </div>
                    </button>
                </div>
                <div class="control">
                    <button type="button" class="button is-dark" @click="copy('secret')">
                        <div class="icon">
                            <i class="fa-solid fa-lg fa-copy"></i>
                        </div>
                    </button>
                </div>
            </div>
            <SecretGenerator @secret="secretGenerated"></SecretGenerator>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button" 
                        :class="{ 
                            'is-dark': !setting.edition, 
                            'is-warning' : setting.edition 
                        }"
                    >
                        <span class="icon">
                            <i class="fa-regular fa-plus" v-if="!setting.edition"></i>
                            <i class="fa-solid fa-pen-to-square" v-if="setting.edition"></i>
                        </span>
                        <span>{{ setting.title }}</span>
                    </button>
                </div>
                <div class="control" v-if="setting.edition">
                    <button class="button is-danger is-light" type="button" @click="deleteSecret()">
                        <span class="icon">
                            <i class="fa-regular fa-trash-can"></i>
                        </span>
                        <span>Delete</span>
                    </button>
                </div>
                <div class="control">
                    <router-link :to="{ name: 'category', params: { id: $route.params.categoryId } }" class="button is-light">
                        <span class="icon">
                            <i class="fa-solid fa-lg fa-ban"></i>
                        </span>
                        <span>Cancel</span>
                    </router-link>
                </div>
            </div>
        </form>
        <Modal :state="modal" @submit="submit" @close="toggleModal(false, '', '')"></Modal>
    </div>
</template>

<script lang="ts">
import type { Secret } from '@/models/secret';
import { SecretService } from '@/services/secret-service';
import SecretGenerator from '@/components/SecretGenerator.vue';
import Modal from '@/components/Modal.vue';

export default {
    created() {
        // setting page settings depending on the route
        if (this.$route.name == "new-secret") {
            this.setting.title = "New";
            this.setting.subtitle = "Add a new secret of your secrets.";
            this.setting.edition = false;
        }
        else {
            this.setting.title = "Edit";
            this.setting.subtitle = "Edit/Delete your secret.";
            let secret = this.secretRepo.get(this.$route.params.categoryId, this.$route.params.secretId);
            if (secret) {
                this.secret = secret;
                this.secret.username = this.secretService.decrypt(this.secret.username);
                this.secret.secret = this.secretService.decrypt(this.secret.secret);
            }
            else
                this.$router.push("/404");
        }
    },
    data() {
        let secret: Secret = {
            id: null,
            topic: "",
            username: "",
            secret: "",
        };
        return {
            secretService: new SecretService(this.$store.getters.GET_CODE),
            setting: {
                title: "",
                subtitle: "",
                edition: true
            },
            secret: secret,
            usernameVisibility: false,
            passwordVisibility: false,
            modal: {
                active: "",
                title: "",
                button: ""
            }
        };
    },
    methods: {
        deleteSecret() {
            this.toggleModal(true, "Delete secret", "Delete");
        },
        submit(type: string) {
            if(type == "Delete") {
                this.secretRepo.delete(this.$route.params.categoryId, this.secret.id);
                this.$router.push("/categories/" + this.$route.params.categoryId);
            } else {
                this.secret.username = this.secretService.encrypt(this.secret.username);
                this.secret.secret = this.secretService.encrypt(this.secret.secret);
                this.secretRepo.save(this.$route.params.categoryId, this.secret);
                this.$router.push("/categories/" + this.$route.params.categoryId);
            }
        },
        confirm() {
            this.toggleModal(true, this.setting.edition ? "Update secret" : "New secret", this.setting.edition ? "Update" : "Add")
        },
        usernameGenerated(secret: string) {
            this.secret.username = secret
        },
        secretGenerated(secret: string) {
            this.secret.secret = secret
        },
        toggleVisibility(type: string) {
            if(type == 'username') this.usernameVisibility = !this.usernameVisibility
            else this.passwordVisibility = !this.passwordVisibility
        },
        copy(type: string) {
            navigator.clipboard.writeText(type == 'username' ? this.secret.username : this.secret.secret);
            console.log('copied successfully!')
        },
        toggleModal(active: boolean, title: string, button: string) {
            this.modal.active = active ? "is-active" : "";
            this.modal.title = title;
            this.modal.button = button
        }
    },
    components: { SecretGenerator, Modal }
}
</script>

<style>
.top-space {
    margin-top: 3em;
}
</style>