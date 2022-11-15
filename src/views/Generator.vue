<template>
    <div class="has-text-centered">
        <img src="@/assets/images/password.svg" alt="empty" width="200" />
		<h3 class="title is-3">Generate secret/password</h3>
		<h5 class="subtitle is-5">Generate your secret in a secure way, using special characters, small/big cases and numbers!</h5>
        <div class="card has-background-link-light mb-5">
		    <div class="card-content is-flex is-justify-content-space-between">
                <p class="subtitle m-2">
                    {{ secret }}
                </p>
                <div class="buttons">
                    <button class="button is-link" @click="generateSecret()">
                        <div class="icon">
                            <i class="fa-solid fa-lg fa-rotate"></i>
                        </div>
                    </button>
                    <button class="button is-dark" @click="copySecret()">
                        <div class="icon">
                            <i class="fa-solid fa-lg fa-copy"></i>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        
        <div class="card has-background-link-light">
		    <div class="card-content">
                <h4 class="title is-4">Setup your secret/password</h4>
                <h6 class="subtitle is-6">Change the settings of your secret by enabling/disabling the options bellow and changing the length of it.</h6>
                <div class="buttons is-justify-content-center m-0">
                    <button class="button"
                        :class="upper ? 'is-dark' : 'is-white'"
                        @click="toggle('upper')"
                    >
                        <div class="icon">
                            <i class="fa-solid fa-lg fa-a"></i>
                        </div>
                        <span>
                            Big cases
                        </span>
                    </button>
                    <button class="button"
                        :class="numbers ? 'is-dark' : 'is-white'"
                        @click="toggle('numbers')"
                    >
                        <div class="icon">
                            <i class="fa-solid fa-lg fa-1"></i>
                        </div>
                        <span>
                            Numbers
                        </span>
                    </button>
                    <button class="button"
                        :class="specials ? 'is-dark' : 'is-white'"
                        @click="toggle('specials')"
                    >
                        <div class="icon">
                            <i class="fa-solid fa-lg fa-hashtag"></i>
                        </div>
                        <span>
                            Special characters
                        </span>
                    </button>
                </div>
                <div class="field space-bottom">
                    <div class="control">
                        <div class="value">{{ rangeValue }}</div>
                        <input class="range" type="range" min="6" max="255" step="1" v-model="rangeValue" @input="generateSecret">
                    </div>
                </div>
                <div class="buttons are-medium is-justify-content-center">
                    <button class="button is-link" @click="generateSecret()">
                        <div class="icon">
                            <i class="fa-solid fa-rotate"></i>
                        </div>
                        <span>
                            Generate secret
                        </span>
                    </button>
                    <button class="button is-dark" @click="copySecret()">
                        <div class="icon">
                            <i class="fa-solid fa-lg fa-copy"></i>
                        </div>
                        <span>
                            Copy secret
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { SecretService } from "@/services/secret-service";
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            rangeValue: 32,
			secretService: new SecretService(this.$store.getters.GET_CODE),
			upper: true,
			numbers: true,
			specials: false,
            secret: ''
        }
    },
    methods: {
        toggle(type: string) {
			if (type == "upper") this.upper = !this.upper;
			if (type == "numbers") this.numbers = !this.numbers;
			if (type == "specials") this.specials = !this.specials;
            this.generateSecret()
		},
        generateSecret() {
            this.secret = this.secretService.generateSecret(this.rangeValue, this.upper, this.numbers, this.specials)
        },
        copySecret() {
            navigator.clipboard.writeText(this.secret);
            console.log('copied successfully!')
        }
    },
    mounted() {
        this.generateSecret()
    },
});
</script>

<style scoped>
.card {
	border: 0.2em black solid;
}

.value {
    font-weight: bold;
    font-size: 4.5em;
    text-shadow: white 2px 2px 2px;
}

.range {
    -webkit-appearance: none;
    background-color: #bdc3c7;
    width: 250px;
    height: 5px;
    border-radius: 5px;
    margin: 0 auto;
    outline: 0;
}

.range::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: #3e56c4;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid white;
    cursor: pointer;
    transition: .3s ease-in-out;
}
​
.range::-webkit-slider-thumb:hover {
    background-color: white;
    border: 2px solid #3e56c4;
}

.range::-webkit-slider-thumb:active {
    transform: scale(1.2);
}

.space-bottom {
    margin-bottom: 2em;
}
</style>
