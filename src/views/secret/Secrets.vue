<template>
	<main>
		<div class="is-flex is-justify-content-space-between mb-5">
			<div>
				<h1 class="title">Secrets</h1>
				<h2 class="subtitle">
					Your secrets.
				</h2>
			</div>
			<div class="buttons">
				<router-link
					class="button is-dark"
					to="/new-secret"
				>
					<span class="icon">
						<i class="fa-solid fa-lg fa-plus"></i>
					</span>
				</router-link>
				<router-link class="button is-black is-light" to="/secrets">
					<span class="icon">
						<i class="fa-solid fa-lg fa-arrow-left-long"></i>
					</span>
				</router-link>
			</div>
		</div>

		<div v-if="selectedTags.length > 0">
			<div class="field is-grouped is-justify-content-center my-5"> 
				<div class="control" v-for="(t, i) in selectedTags" :key="i">
					<button type="button" class="button is-rounded is-small is-link" @click="deleteTag(i)">
						<span>{{ t }}</span>
						<span class="icon">
							<i class="fa-solid fa-xmark"></i>
						</span>
					</button>
				</div>
			</div>
		</div>

		<div class="has-text-centered top-space" v-if="secrets.length == 0">
			<img src="@/assets/images/empty.svg" alt="empty" width="200" />
			<h4 class="title is-4 m-2">No Secrets available!!</h4>
			<router-link
				class="button is-dark"
				to="/new-secret"
			>
				<span class="icon">
					<i class="fa-solid fa-lg fa-plus"></i>
				</span>
				<span>
					Create a new secret
				</span>
			</router-link>
		</div>
		<div class="columns is-multiline is-mobile is-3">
			<div
				class="column is-half-tablet is-one-third-desktop is-full-mobile"
				v-for="secret of selectedSecrets"
				v-bind:key="secret.id"
			>
				<Secret :secret="secret" @tag="selectTag" :selectedTags="selectedTags"></Secret>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Secret from "@/components/Secret.vue";

export default defineComponent({
	data() {
		return {
			secrets: [] as any[],
			selectedSecrets: [] as any[],
			selectedTags: [] as string[]
		};
	},
	created() {
		this.secrets = this.$secretRepo.all();
		this.setSelectedSecrets()
	},
	methods: {
        selectTag(tag: string) {
			if (this.selectedTags.indexOf(tag) == -1) {
				this.selectedTags.push(tag)
				this.setSelectedSecrets()
			}
		},
		deleteTag(i: number) {
			this.selectedTags.splice(i, 1)
			this.setSelectedSecrets()
		},
		setSelectedSecrets() {
			this.selectedSecrets = []
			if (this.selectedTags.length == 0) {
				this.selectedSecrets = this.secrets
			} else {
				for (const s of this.secrets) {
					for (const t of this.selectedTags) {
						if (s.tags.indexOf(t) != -1) {
							this.selectedSecrets.push(s);
							break;
						}
					}
				}
			}
		}
	},
	components: { Secret }
});
</script>

<style scoped>
.top-space {
	margin-top: 6em;
}
</style>
