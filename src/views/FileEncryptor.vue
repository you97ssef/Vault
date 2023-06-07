<template>
    <div class="has-text-centered">
        <img src="@/assets/images/secure_files.svg" alt="empty" width="200" />
        <h3 class="title is-3">File Encryption / Decryption</h3>
        <h5 class="subtitle is-5">Securely Encrypt and Decrypt Your Files with a Personal Hash.</h5>
        <div class="card has-background-link-light">
            <div class="card-content">
                <h6 class="subtitle is-6">Enter your hash below to Encrypt/Decrypt your file <span v-if="$store.getters.GET_CODE"> or use the hash you setup on the app</span></h6>
                <div class="field" v-if="!useAppCode">
                    <div class="control">
                        <input
                            class="input"
                            type="text"
                            v-model="code"
                            placeholder="Encryption hash"
                            required
                        />
                    </div>
                </div>
                <div class="field" v-if="$store.getters.GET_CODE">
                    <label class="checkbox">
                        <input type="checkbox" v-model="useAppCode"> Use hash you setup for the app
                    </label>
                </div>
                <div class="is-flex is-justify-content-center is-flex-wrap-wrap">
                    <div class="file is-dark m-1">
                        <label class="file-label">
                            <input 
                                class="file-input" 
                                type="file" 
                                name="encrypt"
                                :disabled="!useAppCode && code == ''" 
                                @change="encrypt"
                            >
                            <span class="file-cta has-background-success-dark">
                                <span class="file-icon"><i class="fa-solid fa-lock"></i></span>
                                <span class="file-label">Encrypt file</span>
                            </span>
                        </label>
                    </div>
                    <div class="file is-light m-1">
                        <label class="file-label">
                            <input 
                                class="file-input" 
                                type="file" 
                                name="decrypt"
                                :disabled="!useAppCode && code == ''" 
                                @change="decrypt"
                            >
                            <span class="file-cta has-background-success-light">
                                <span class="file-icon"><i class="fa-solid fa-lock-open"></i></span>
                                <span class="file-label">Decrypt file</span>
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { FileService } from "@/services/file-service";
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return { 
            code: "",
            useAppCode: false,
            appCode: this.$store.getters.GET_CODE,
            fileService: new FileService(),
        }
    },
    methods: {
        async encrypt(event: any) {
            await this.fileService.encrypt(
                event.target.files[0], 
                this.useAppCode ? this.appCode : this.code 
            );
            event.target.value = null;
        },
        async decrypt(event: any) {
            await this.fileService.decrypt(
                event.target.files[0], 
                this.useAppCode ? this.appCode : this.code 
            );
            event.target.value = null;
        }
    },
});
</script>

<style scoped>
.card {
	border: 0.2em black solid;
}
</style>
