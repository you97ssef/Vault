<template>
    <div>
        <h5>{{ secret.id }}- {{ secret.topic }}</h5>
        <p>Username: {{ secretService.decrypt(secret.username) }}</p>
        <p>Secret: {{ secretService.decrypt(secret.secret) }}</p>
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
        };
    },
});
</script>