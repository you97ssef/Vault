<template>
    <div class="has-text-centered top-space">
        <img src="@/assets/vault.svg" alt="empty" width="300">
        <h1 class="title is-1">V A U L T</h1>
        <h6 class="subtitle is-6">Created by <a href="https://youssefb.netlify.app/">Youssef BAHI</a>.</h6>
        <div class="card has-background-link-light my-5">
            <div class="card-content">
                <div class="content">
                    <h3 class="subtitle">A secure way to generate your password/secret and store them using your own hash.</h3>
                    <h5 class="mb-1 mt-5">🤨 What's this vault thing ?</h5>
                    <p>Vault is an app that generate you passwords and let you store them in their categories on your own device. It's simply a vault for your secrets. 😉</p>
                
                    <h5 class="mb-1 mt-5">😏 Secure huh, how is it secure ?</h5>
                    <p class="m-0">Well it is secure in many ways</p>
                    <p class="m-0">You setup a key that will be used to hash your secrets 🔑</p>
                    <p class="m-0">Your secrets you have are impossible to be accessed without your key 🔐</p>
                    <p class="m-0">Your secrets will be stored only on your device that means no one will have them. Unless you're device is hacked 🤭</p>
                    <p><small>(Check that your data is not being transmitted elsewhere on the network tab when you inspect your navigator)</small></p>
                    
                    <router-link class="button is-dark" to="new-category">
                        <span class="icon">
                            <i class="fa-solid fa-key"></i>
                        </span>
                        <span>Setup your code here</span>
                    </router-link>

                    <h5 class="mb-1 mt-5">🤔 Why vault, and why should i use it ?</h5>
                    <p class="m-0">Vault is an app that i have created in order to discover <b>Vue 3</b> with <b>Typescript</b> and for personal use.</p>
                    <p class="m-0">I created this app since i don't trust other apps, you can be like me and don't trust/use this app. 😊</p>
                    <p>But if you want to use it ⚠️ <b>use it at your own risk</b> ⚠️</p>

                    <h5 class="mb-1 mt-5">🙄 Quite interested in the source code ?</h5>
                    <p class="m-0">You can find the source code here: <a href="https://github.com/you97ssef/vault">https://github.com/you97ssef/vault</a></p>
                    <p class="m-0">
                        For any question or suggestion, contact me on the following socials. 
                        <div class="buttons is-justify-content-center m-2">
                            <a href="mailto:you97ssef@gmail.com" class="button is-link">
                                <span class="icon">
                                    <i class="fa-solid fa-lg fa-at"></i>
                                </span>
                            </a>
                            <a href="https://youssefb.netlify.app/#contact" class="button is-link">
                                <span class="icon">
                                    <i class="fa-regular fa-lg fa-message"></i>
                                </span>
                            </a>
                            <a href="https://github.com/you97ssef" class="button is-link">
                                <span class="icon">
                                    <i class="fa-brands fa-lg fa-github"></i>
                                </span>
                            </a>
                            <a href="https://www.instagram.com/yusefbahi/" class="button is-link">
                                <span class="icon">
                                    <i class="fa-brands fa-lg fa-instagram"></i>
                                </span>
                            </a>
                        </div>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {

}
</script>

<style scoped>
.top-space {
    margin-top: 3em;
}
</style>