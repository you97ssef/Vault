<template>
	<router-link
		:to="
			edition
				? { name: 'edit-category', params: { id: category.id } }
				: { name: 'category', params: { id: category.id } }
		"
	>
		<div
			class="card"
			:class="{
				'has-background-link-light': !edition,
				'has-background-danger-light': edition
			}"
		>
			<div class="card-content">
				<p class="subtitle is-3 has-text-centered m-3">
					{{ category.name }}
				</p>
			</div>
		</div>
	</router-link>
</template>

<script lang="ts">
import type { Category } from "@/models/category";
import { defineComponent, type PropType } from "vue";

export default defineComponent({
    props: {
        category: {
            type: Object as PropType<Category>,
            required: true
        },
        edition: {
            type: Boolean,
            required: true
        }
    }
});
</script>

<style scoped>
.card {
	border: 0.2em black solid;
}
.card:hover {
	transform: scale(1.02);
	transition: all 0.3s ease;
	box-shadow: 0 0.125rem 0.75rem #000 !important;
	z-index: 3;
	border-color: #52616b !important;
}
</style>
