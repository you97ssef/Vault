<template>
    <div class="card m-5">
        <div class="card-content">
            <div class="content">
                <p class="title is-3 has-text-centered">{{ secret.topic }}</p>
                <div class="columns">
                    <div class="column p-1 is-narrow">
                        <button class="button is-light is-small" @click="showHideUsername()">{{ visibleUsername ? 'Hide' : 'Show' }}</button> 
                    </div>
                    <div class="column p-1">
                        <p class="subtitle is-6 pt-1">
                            <strong>Username:</strong> 
                            {{ secret.username }} 
                        </p>
                    </div>
                </div>
                <div class="columns">
                    <div class="column p-1 is-narrow">
                        <button class="button is-light is-small" @click="showHideSecret()">{{ visibleSecret ? 'Hide' : 'Show' }}</button> 
                    </div>
                    <div class="column p-1">
                        <p class="subtitle is-6 pt-1">
                            <strong>Secret:</strong> 
                            {{ secret.secret }} 
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

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
        showHideUsername() {
            if(!this.visibleUsername)
                this.secret.username = this.secretService.decrypt(this.secret.username)
            else
                this.secret.username = this.secretService.encrypt(this.secret.username)
            this.visibleUsername = ! this.visibleUsername
        },
        showHideSecret() {
            if(!this.visibleSecret)
                this.secret.secret = this.secretService.decrypt(this.secret.secret)
            else
                this.secret.secret = this.secretService.encrypt(this.secret.secret)
            this.visibleSecret = ! this.visibleSecret
        }
    },
});
</script>