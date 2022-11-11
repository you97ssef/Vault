<template>
	<nav class="bottom-border has-background-link-light p-5">
		<div class="is-flex is-justify-content-center">
			<router-link class="title is-1" to="/">V A U L T</router-link>
		</div>
		<div
			class="is-flex is-justify-content-center buttons mt-2"
			v-if="codeIsSet"
		>
			<router-link
				class="button is-rounded is-dark is-small"
				to="/categories"
			>
				<span class="icon ml-1"
					><i class="fa-solid fa-layer-group fa-lg"></i
				></span>
				<span>Categories</span>
			</router-link>
			<button
				class="button is-rounded is-light is-danger is-small"
				@click="unsetCode()"
			>
				<span class="icon ml-1"
					><i class="fa-solid fa-arrow-right-from-bracket fa-lg"></i
				></span>
				<span>Unset the code</span>
			</button>
		</div>
	</nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	methods: {
		unsetCode() {
			this.$store.commit("SET_CODE", null);
			this.$router.push("/setup");
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
.bottom-border {
	border-bottom: 0.2em black solid;
}
</style>
