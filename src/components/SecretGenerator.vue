<template>
  <div class="help is-flex is-justify-content-end is-flex-wrap-wrap">
        <div class="field">
            <div class="control has-icons-left">
                <input class="length input is-small" type="number" placeholder="Normal" v-model="length">
                <span class="icon is-small is-left">
                    <i class="fas fa-ruler-vertical"></i>
                </span>
            </div>
        </div>
           
        <span
            class="button tag is-rounded mx-1 mb-1"
            @click="toggle('upper')"
            :class="upper ? 'is-dark' : 'is-light'"
        >
            Upper cases
        </span>
        <span
            class="button tag is-rounded mx-1 mb-1"
            @click="toggle('numbers')"
            :class="numbers ? 'is-dark' : 'is-light'"
        >
            Numbers
        </span>
        <span
            class="button tag is-rounded mx-1 mb-1"
            @click="toggle('specials')"
            :class="specials ? 'is-dark' : 'is-light'"
        >
            Special characters
        </span>
        <button class="button tag is-link is-light is-rounded mx-1 mb-1" type="button" @click="generateSecret()">Generate</button>
    </div>
</template>

<script lang="ts">
import { SecretService } from '@/services/secret-service';
export default {
    data() {
        return {
            secretService: new SecretService(this.config),
            upper: true,
            numbers: true,
            specials: false,
            length: 32
        };
    },
    methods: {  
        toggle(type: string) {
            if(type == 'upper') this.upper = !this.upper
            if(type == 'numbers') this.numbers = !this.numbers
            if(type == 'specials') this.specials = !this.specials
        },
        generateSecret() {
            this.$emit('secret', this.secretService.generateSecret(this.length, this.upper, this.numbers, this.specials))
        }
    },
}
</script>

<style scoped>
.length {
    width: 7em;
}
</style>