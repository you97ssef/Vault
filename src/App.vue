<template>
	<div
		class="full is-flex is-flex-direction-column is-justify-content-space-between"
	>
		<div class="down-space">
			<Navbar></Navbar>
			<section class="section">
				<div class="container">
					<RouterView />
				</div>
			</section>
		</div>
		<Footer></Footer>
	</div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<style scoped>
.full {
	min-height: 100svh;
}

.down-space {
	margin-bottom: 3em;
}
</style>
