<template>
	<div class="has-text-centered top-space">
		<img src="@/assets/images/not-found.svg" alt="empty" width="300" />
		<h3 class="title is-3">Page not found</h3>
		<h5 class="subtitle is-5">We are sorry, this page is not found!</h5>
		<router-link class="button is-light" to="/secrets">
			<span class="icon">
				<i class="fa-solid fa-lg fa-arrow-left"></i>
			</span>
			<span>
				Back to the app
			</span>
		</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.top-space {
	margin-top: 6em;
}
</style>
