<template>
	<div class="card has-background-link-light">
		<div class="card-content">
			<p class="title is-2 has-text-centered mb-5">{{ secret.topic }}</p>
			<div v-for="(v, i) in secret.values" :key="i">
				<p class="has-text-centered mb-2">
					<b>{{ v.label }} :</b>
					{{
						visibleValues[i]
							? show(v.value)
								? show(v.value)
								: "The code you set up is maybe wrong!"
							: "************************"
					}}
				</p>
				<div class="buttons is-justify-content-center are-small">
					<button
						class="button is-rounded is-black"
						@click="showHideValue(i)"
					>
						<i class="fa-solid fa-eye" v-if="!visibleValues[i]"></i>
						<i class="fa-solid fa-eye-slash" v-if="visibleValues[i]"></i>
					</button>
					<button
						class="button is-rounded is-dark"
						@click="copy(show(v.value))"
					>
						<i class="fa-solid fa-copy"></i>
					</button>
				</div>
			</div>

			<div class="field is-grouped is-justify-content-center mt-5">
                <div v-if="secret.tags.length == 0">No tags available</div> 
                <div class="control" v-for="(t, i) in secret.tags" :key="i">
                    <button 
						type="button" 
						class="button is-small is-link"
						:class="selectedTags.indexOf(t) == -1 ? 'is-outlined' : ''"
						@click="selectTag(t)"
					>
                        <span>{{ t }}</span>
                    </button>
                </div>
            </div>

			<div class="is-flex is-justify-content-end">
				<router-link
					:to="{
						name: 'edit-secret',
						params: {
							secretId: secret.id
						}
					}"
					class="button is-warning is-light"
				>
					<span class="icon">
						<i class="fa-solid fa-lg fa-pen-to-square"></i>
					</span>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import type { Secret } from "@/models/secret";
import { SecretService } from "@/services/secret-service";
import { defineComponent, type PropType } from "vue";

export default defineComponent({
    props: {
        secret: {
            type: Object as PropType<Secret>,
            required: true
        },
		selectedTags: {
			type: Array,
			required: true
		}
    },
    data() {
        return {
            secretService: new SecretService(this.$store.getters.GET_CODE),
            visibleValues: [] as boolean[] 
        };
    },
    methods: {
        show(secret: string){
            return this.secretService.decrypt(secret)
        },
        showHideValue(i: number) {
            this.visibleValues[i] = ! this.visibleValues[i]
        },
        copy(string: string) {
            navigator.clipboard.writeText(string);
            console.log('copied successfully!')
        },
		selectTag(tag: string) {
			this.$emit("tag", tag)
		}
    },
	created() {
		this.visibleValues = this.secret.values.map(() => { return false });
	}
});
</script>

<style scoped>
.card {
	border: 0.2em black solid;
}
</style>
