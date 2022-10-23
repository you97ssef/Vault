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
        <form class="top-space" @submit.prevent="submit()">
            <div class="field">
                <label class="label">Topic</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Secret topic ..." v-model="secret.topic" required>
                </div>
            </div>
            <div class="field">
                <label class="label">Username/Email</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Username ..." v-model="secret.username" required>
                </div>
                <SecretGenerator @secret="usernameGenerated"></SecretGenerator>
            </div>
            <div class="field">
                <label class="label">Secret/Password</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Secret ..." v-model="secret.secret">
                </div>
                <SecretGenerator @secret="secretGenerated"></SecretGenerator>
            </div>
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
    </div>
</template>

<script lang="ts">
import type { Secret } from '@/models/secret';
import { SecretService } from '@/services/secret-service';
import SecretGenerator from '@/components/SecretGenerator.vue';

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
            secretService: new SecretService(this.config),
            setting: {
                title: "",
                subtitle: "",
                edition: true
            },
            secret: secret
        };
    },
    methods: {
        deleteSecret() {
            this.secretRepo.delete(this.$route.params.categoryId, this.secret.id);
            this.$router.push("/categories/" + this.$route.params.categoryId);
        },
        submit() {
            this.secret.username = this.secretService.encrypt(this.secret.username);
            this.secret.secret = this.secretService.encrypt(this.secret.secret);
            this.secretRepo.save(this.$route.params.categoryId, this.secret);
            this.$router.push("/categories/" + this.$route.params.categoryId);
        },
        usernameGenerated(secret: string) {
            this.secret.username = secret
        },
        secretGenerated(secret: string) {
            this.secret.secret = secret
        }
    },
    components: { SecretGenerator }
}
</script>

<style>
.top-space {
    margin-top: 3em;
}
</style>