<template>
	<div
		class="footer bottom-top has-background-link-light is-justify-content-center"
	>
		<div class="columns m-0">
			<div class="column is-mobile has-text-centered" v-if="!dataExists">
				<h6 class="title is-6 m-0">
					Already have exported your data ?
				</h6>
				<p>
					<small
						>If you used the app before and exported your data you
						can import data</small
					>
				</p>
				<label class="button is-rounded is-dark my-2">
					<input
						class="file-input"
						type="file"
						name="resume"
						@change="importData"
					/>
					<span class="file-icon ml-1">
						<i class="fas fa-upload fa-lg"></i>
					</span>
					<span class="file-label">
						Import data
					</span>
				</label>
			</div>
			<div class="column is-mobile has-text-centered" v-if="dataExists">
				<h6 class="title is-6 m-0">Export your data into a file</h6>
				<p>
					<small
						>You can export your data and use it in another device
						or delete all your data.</small
					>
				</p>
				<div class="buttons is-justify-content-center">
					<button
						class="button is-rounded is-dark my-2"
						@click="exportData()"
					>
						<span class="file-icon ml-1">
							<i class="fas fa-download fa-lg"></i>
						</span>
						<span>
							Export data
						</span>
					</button>
					<button
						class="button is-rounded is-danger my-2"
						@click="
							toggleModal(
								true,
								'Delete my data',
								'Delete',
								'⚠️ ⚠️ ⚠️ Be aware that you will lose all your data, you can export it before you delete everything. ⚠️ ⚠️ ⚠️'
							)
						"
					>
						<span class="file-icon ml-1">
							<i class="fas fa-trash fa-lg"></i>
						</span>
						<span>
							Delete my data
						</span>
					</button>
				</div>
			</div>
			<div class="column is-multiline is-mobile has-text-centered">
				<div class="buttons is-justify-content-center mt-2 m-0">
					<a
						href="mailto:you97ssef@gmail.com"
						class="button is-dark"
						target="_blank"
					>
						<span class="icon">
							<i class="fa-solid fa-lg fa-at"></i>
						</span>
					</a>
					<a
						href="https://youssefb.netlify.app/#contact"
						class="button is-dark"
						target="_blank"
					>
						<span class="icon">
							<i class="fa-regular fa-lg fa-message"></i>
						</span>
					</a>
					<a
						href="https://github.com/you97ssef"
						class="button is-dark"
						target="_blank"
					>
						<span class="icon">
							<i class="fa-brands fa-lg fa-github"></i>
						</span>
					</a>
					<a
						href="https://www.instagram.com/yusefbahi/"
						class="button is-dark"
						target="_blank"
					>
						<span class="icon">
							<i class="fa-brands fa-lg fa-instagram"></i>
						</span>
					</a>
				</div>
				<h6 class="title is-6">Contact me</h6>
				<p>
					<small class="m-1">Check out the secret generator and file encryptor</small>
				</p>
				<router-link
					class="button is-rounded is-link is-small m-1"
					to="/generator"
				>
					<span class="icon ml-1"><i class="fa-solid fa-rotate fa-lg"></i></span>
					<span>Secret generator</span>
				</router-link>
				<router-link
					class="button is-rounded is-success is-small m-1"
					to="/file-crypto"
				>
					<span class="icon ml-1"><i class="fa-solid fa-file-shield fa-lg"></i></span>
					<span>File crypto</span>
				</router-link>
			</div>
		</div>
		<div class="has-text-centered mb-5">
			<h3 class="title is-3 m-0">V A U L T</h3>
			<small class="m-0"
				>by
				<a href="https://youssefb.netlify.app/" target="_blank"
					>Youssef BAHI</a
				>
				- © 2022</small
			>
			<p></p>
		</div>

		<Modal
			:state="modal"
			@submit="clearData"
			@close="toggleModal(false, '', '')"
		></Modal>
	</div>
</template>

<script lang="ts">
import type { ModalState } from '@/models/modal-state';
import { defineComponent } from 'vue';
import Modal from '@/components/Modal.vue';

export default defineComponent({
    components: {
        Modal
    },
    data() {
        return {
            modal: {
                active: "",
                title: "",
                button: "",
                alert: null
            } as ModalState
        }
    },
    methods: {
        async exportData() {
            await this.$dataService.export();
        },
        importData(event: any) {
            this.$dataService.import(event.target.files[0]);
        },
        async clearData() {
            if (confirm("Are you sure you want to delete all your data?")) {
                await this.$dataService.clear();
                this.$store.commit("SET_CODE", null);
                this.$store.commit("SET_DATA", false);
                this.$router.push("/setup");
            }
            this.toggleModal(false, '', '');
        },
        toggleModal(active: boolean, title: string, button: string, alert: any = null) {
            this.modal.active = active ? "is-active" : "";
            this.modal.title = title;
            this.modal.button = button;
            this.modal.alert = alert;
        }
    },
    computed: {
        dataExists() {
            return this.$store.getters.DATA_EXISTS;
        },
    },
})
</script>

<style scoped>
.bottom-top {
	border-top: 0.2em black solid;
	padding: 1rem;
}
</style>
