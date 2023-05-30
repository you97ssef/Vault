<template>
	<div class="help is-flex is-justify-content-end is-flex-wrap-wrap">
		<div class="field mx-1 mb-1">
			<div class="control has-icons-left">
				<input
					class="length input is-small"
					type="number"
					placeholder="Normal"
					v-model="length"
				/>
				<span class="icon is-small is-left">
					<i class="fas fa-ruler-vertical"></i>
				</span>
			</div>
		</div>
		<span
			class="button is-small is-rounded mx-1 mb-1"
			@click="toggle('upper')"
			:class="upper ? 'is-dark' : 'is-light'"
		>
			<i class="fa-solid fa-sm fa-a"></i>
		</span>
		<span
			class="button is-small is-rounded mx-1 mb-1"
			@click="toggle('numbers')"
			:class="numbers ? 'is-dark' : 'is-light'"
		>
			<i class="fa-solid fa-sm fa-1"></i>
		</span>
		<span
			class="button is-small is-rounded mx-1 mb-1"
			@click="toggle('specials')"
			:class="specials ? 'is-dark' : 'is-light'"
		>
			<i class="fa-solid fa-sm fa-hashtag"></i>
		</span>
		<button
			class="button is-small is-rounded is-link is-light mx-1 mb-1"
			type="button"
			@click="generateSecret()"
		>
			<div class="icon">
				<i class="fa-solid fa-rotate"></i>
			</div>
			<span>Generate</span>
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SecretService } from "@/services/secret-service";

export default defineComponent({
	props: {
		i: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			secretService: new SecretService(this.$store.getters.GET_CODE),
			upper: true,
			numbers: true,
			specials: false,
			length: 32
		};
	},
	methods: {
		toggle(type: string) {
			if (type == "upper") this.upper = !this.upper;
			if (type == "numbers") this.numbers = !this.numbers;
			if (type == "specials") this.specials = !this.specials;
		},
		generateSecret() {
			this.$emit(
				"secret", {
					value: this.secretService.generateSecret(
						this.length,
						this.upper,
						this.numbers,
						this.specials
					),
					i : this.i
				}
			);
		}
	}
});
</script>

<style scoped>
.length {
	width: 7em;
}
</style>
