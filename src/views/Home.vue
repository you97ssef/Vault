<template>
    <div class="has-text-centered top-space">
        <img src="@/assets/images/vault.svg" alt="empty" width="300">
        <h1 class="title is-1">V A U L T</h1>
        <h6 class="subtitle is-6">Created by <a href="https://youssefb.netlify.app/" target="_blank">Youssef BAHI</a>.</h6>
        <div class="card has-background-link-light my-5">
            <div class="card-content">
                <div class="content">
                    <h3 class="subtitle">A secure method for generating and storing passwords/secrets is by using your own hash.</h3>
                    <h5 class="mb-1 mt-5">🤨 What exactly is this "Vault" thing?</h5>
                    <p>Vault is an application that enables you to generate passwords and securely store them on your personal device. It serves as a secure repository for your confidential information. 😉</p>
                
                    <h5 class="mb-1 mt-5">😏 How does it ensure security?</h5>
                    <p class="m-0">Well, it provides security in several ways:</p>
                    <p class="m-0">You establish a key that is used to hash your secrets. 🔑</p>
                    <p class="m-0">Without your key, it is practically impossible for anyone to access your secrets. 🔐</p>
                    <p class="m-0">Your secrets are exclusively stored on your device, ensuring that no one else has access to them—unless your device itself is hacked. 🤭</p>
                    <p><small>(You can ensure that your data is not being transmitted elsewhere by checking the network tab when inspecting your browser or checking out <a href="https://github.com/you97ssef/vault" target="_blank">the source code</a>.)</small></p>
                    
                    <router-link class="button is-dark" to="/setup" v-if="!codeIsSet">
                        <span class="icon">
                            <i class="fa-solid fa-key"></i>
                        </span>
                        <span>Setup app hash</span>
                    </router-link>
                    <router-link class="button is-dark" to="/secrets" v-if="codeIsSet">
                        <span class="icon">
                            <i class="fa-solid fa-arrow-right-to-bracket"></i>
                        </span>
                        <span>My secrets</span>
                    </router-link>


                    <h5 class="mb-1 mt-5">🤔 Why use Vault?</h5>
                    <p class="m-0">Vault is an application I developed both as a means to explore <b>Vue 3</b> with <b>Typescript</b> and <b>Vite</b>. Its primary purpose is for my personal use but you are welcome to try it out if you'd like.</p>
                    <p class="m-0">I decided to create this app because I have reservations about relying on other similar apps. If you share these concerns, you may choose not to trust or use Vault. 😊</p>
                    <p>However, if you wish to use it, please be aware that there are potential risks involved so ⚠️ <b>Proceed at your own risk</b> ⚠️</p>

                    <h5 class="mb-1 mt-5">🙄 Curious about the source code?</h5>
                    <p class="m-0">You can access the source code for Vault on GitHub at this link: <a href="https://github.com/you97ssef/vault" target="_blank">https://github.com/you97ssef/vault</a></p>
                    <p class="m-0">
                        If you have any questions or suggestions, feel free to contact me through my socials. 
                        <div class="buttons is-justify-content-center m-2">
                            <a href="mailto:you97ssef@gmail.com" class="button is-link" target="_blank">
                                <span class="icon">
                                    <i class="fa-solid fa-lg fa-at"></i>
                                </span>
                            </a>
                            <a href="https://youssefb.netlify.app/#contact" class="button is-link" target="_blank">
                                <span class="icon">
                                    <i class="fa-regular fa-lg fa-message"></i>
                                </span>
                            </a>
                            <a href="https://github.com/you97ssef" class="button is-link" target="_blank">
                                <span class="icon">
                                    <i class="fa-brands fa-lg fa-github"></i>
                                </span>
                            </a>
                            <a href="https://www.instagram.com/yusefbahi/" class="button is-link" target="_blank">
                                <span class="icon">
                                    <i class="fa-brands fa-lg fa-instagram"></i>
                                </span>
                            </a>
                        </div>
                    </p>

                    <h5 class="mb-1 mt-5">Not interested in using the application</h5>
                    <p class="m-1">No worries! However, if you'd like to explore some of its features, you can check out the Secret/Password generator or the file encryptor. These functionalities might pique your interest.</p>
                    <div class="buttons is-justify-content-center">
                        <router-link
                            class="button is-rounded is-dark"
                            to="/generator"
                        >
                            <span class="icon ml-1"
                                ><i class="fa-solid fa-rotate fa-lg"></i
                            ></span>
                            <span>Secret generator</span>
                        </router-link>
                        <router-link
                            class="button is-rounded is-success"
                            to="/file-encryptor"
                        >
                            <span class="icon ml-1"
                                ><i class="fa-solid fa-file-shield fa-lg"></i
                            ></span>
                            <span>File encryptor</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	computed: {
		codeIsSet() {
			return this.$store.getters.GET_CODE;
		}
	}
});
</script>

<style scoped>
.top-space {
	margin-top: 3em;
}
</style>