<template>
	<nav class="bottom-border has-background-link-light p-5">
		<div class="is-flex is-justify-content-center">
			<router-link class="title is-1" to="/">V A U L T</router-link>
		</div>
		<div
			class="is-flex is-justify-content-space-evenly mt-3"
			v-if="codeIsSet"
		>
			<router-link
				class="button is-small is-rounded is-dark m-1"
				to="/secrets"
			>
				<span class="icon"><i class="fa-solid fa-lock"></i></span>
				<span>My Secrets</span>
			</router-link>
			<div class="is-flex is-justify-content-center">
				<div class="m-1">
					<div class="card is-rounded px-2">
						<span>Key : </span>
						<span v-if="codeVisible">{{ code }}</span>
						<span v-if="!codeVisible">
							⁕⁕⁕⁕⁕⁕⁕⁕⁕⁕⁕
						</span>
					</div>
				</div>
				<button
					class="button is-rounded has-background-success-dark is-dark is-small m-1"
					@click="changeVisibility()"
				>
					<span class="icon">
						<i v-if="!codeVisible" class="fa-solid fa-eye"></i>
						<i v-if="codeVisible" class="fa-solid fa-eye-slash"></i>
					</span>
				</button>
				<button
					class="button is-rounded has-background-danger-dark is-dark is-small m-1"
					@click="unsetCode()"
				>
					<span class="icon"
						><i class="fa-solid fa-arrow-right-from-bracket"></i
					></span>
				</button>
			</div>
		</div>
	</nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {
			codeVisible: false,
			code: this.$store.getters.GET_CODE
		}
	},
	methods: {
		unsetCode() {
			this.$store.commit("SET_CODE", null);
			this.$router.push("/setup");
		},
		changeVisibility() {
			this.codeVisible = !this.codeVisible;
		}
	},
	computed: {
		codeIsSet() {
			return this.$store.getters.GET_CODE;
		}
	}
});
</script>

<style scoped>
.card {
	border: 0.15em black solid;
}

.bottom-border {
	border-bottom: 0.2em black solid;
}
</style>
