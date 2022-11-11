<template>
	<div class="has-text-centered top-space">
		<img src="@/assets/images/secret.svg" alt="empty" width="200" />
		<form class="box mt-5" @submit.prevent="setSecret()">
			<h3 class="title is-3">Setup your secret code</h3>
			<h6 class="subtitle is-6">
				The code that will be used to hash your secrets.
			</h6>
			<div class="field">
				<div class="control">
					<input
						class="input"
						type="password"
						v-model="code"
						placeholder="********"
						required
					/>
				</div>
			</div>

			<button class="button is-dark">
				<span class="icon"><i class="fa-solid fa-key"></i></span>
				<span>Setup Key</span>
			</button>
		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	methods: {
		setSecret() {
			this.$store.commit("SET_CODE", this.code);
			if (!this.$store.getters.DATA_EXISTS)
				this.$store.commit("SET_DATA", true);
			this.$router.push("/categories");
		}
	},
	data() {
		return {
			code: null
		};
	}
});
</script>

<style scoped>
.top-space {
	margin-top: 3em;
}

.input {
	width: 15em;
}
</style>
