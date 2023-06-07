<template>
	<nav class="bottom-border has-background-link-light p-5">
		<div class="is-flex is-justify-content-center">
			<router-link class="title is-2" to="/">V A U L T</router-link>
		</div>
	</nav>
	<div class="is-flex is-justify-content-center is-flex-wrap-wrap">
		<router-link
			class="nav-link mx-2 my-2 has-text-link"
			to="/secrets"
			v-if="code"
		>
			My secrets
		</router-link>
		<router-link
			class="nav-link mx-2 my-2 has-text-link"
			to="/setup"
			v-if="!code"
		>
			Setup app hash
		</router-link>
		<router-link
			class="nav-link mx-2 my-2 has-text-dark"
			to="/generator"
		>
			Secret generator
		</router-link>
		<router-link
			class="nav-link mx-2 my-2 has-text-dark"
			to="/file-encryptor"
		>
			File encryptor
		</router-link>
		<p class="mx-2 my-2 has-text-dark" v-if="code">
			<span v-if="codeVisible">{{ code }}</span>
			<span v-if="!codeVisible">⁕⁕⁕⁕⁕⁕⁕⁕⁕⁕</span>
		</p>
		<a class="nav-link mx-2 my-2 has-text-primary-dark" v-if="code" @click="changeVisibility()">
			<span v-if="!codeVisible">Show hash</span>
			<span v-if="codeVisible">Hide hash</span>
		</a>
		<a class="nav-link mx-2 my-2 has-text-danger-dark" v-if="code" @click="unsetCode()">Unset hash</a>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {
			codeVisible: false,
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
		code() {
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

.nav-link {
	text-decoration: underline;
}
</style>
