<template>
    <div>
        <div class="is-flex is-justify-content-space-between mb-5">
            <div>
                <h1 class="title">{{ setting.title }} Category</h1>
                <h2 class="subtitle">{{ setting.subtitle }}</h2>
            </div>
            <div class="m-2 buttons" v-if="setting.edition">
                <router-link to="/categories" class="button is-black is-dark">
                    <span class="icon">
                        <i class="fa-solid fa-lg fa-ban"></i>
                    </span>
                </router-link>
            </div>
        </div>
        <form class="top-space" @submit.prevent="confirm()">
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Category name ..." v-model="category.name" required>
                </div>
            </div>
            <div class="field">
                <label class="label">Description</label>
                <div class="control">
                    <textarea class="textarea" placeholder="Category description ..." v-model="category.description"></textarea>
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button" 
                        :class="{ 
                            'is-dark': !setting.edition, 
                            'is-warning' : setting.edition 
                        }"
                    >
                        <span class="icon">
                            <i class="fa-regular fa-plus" v-if="!setting.edition"></i>
                            <i class="fa-solid fa-pen-to-square" v-if="setting.edition"></i>
                        </span>
                        <span>{{ setting.title }}</span>
                    </button>
                </div>
                <div class="control" v-if="setting.edition">
                    <button class="button is-danger is-light" type="button" @click="deleteCategory()">
                        <span class="icon">
                            <i class="fa-regular fa-trash-can"></i>
                        </span>
                        <span>Delete</span>
                    </button>
                </div>
                <div class="control">
                    <router-link to="/categories" class="button is-light">
                        <span class="icon">
                            <i class="fa-solid fa-lg fa-ban"></i>
                        </span>
                        <span>Cancel</span>
                    </router-link>
                </div>
            </div>
        </form>
        <Modal :state="modal" @submit="submit" @close="toggleModal(false, '', '')"></Modal>
    </div>
</template>

<script lang="ts">
import Modal from '@/components/Modal.vue';
import type { Category } from '@/models/category';

export default {
    created() {
        // setting page settings depending on the route
        if (this.$route.name == "new-category") {
            this.setting.title = "New";
            this.setting.subtitle = "Add a new category to regroup your secrets.";
            this.setting.edition = false;
        }
        else {
            this.setting.title = "Edit";
            this.setting.subtitle = "Edit/Delete your category that regroup your secrets.";
            let category = this.categoryRepo.get(this.$route.params.id);
            if (category)
                this.category = category;
            else
                this.$router.push("/404");
        }
    },
    data() {
        let category: Category = {
            id: null,
            name: "",
            description: "",
            secrets: 0
        };
        return {
            setting: {
                title: "",
                subtitle: "",
                edition: true
            },
            category: category,
            modal: {
                active: "",
                title: "",
                button: "",
                alert: null
            }
        };
    },
    methods: {
        deleteCategory() {
            let alertMessage = null;
            if (this.secretRepo.all(this.$route.params.id).length > 0) alertMessage = "This category still has secrets, beware before you delete it!";
            this.toggleModal(true, "Delete secret", "Delete", alertMessage);
        },
        submit(type: string) {
            if (type == "Delete")
                this.categoryRepo.delete(this.category.id);
            else
                this.categoryRepo.save(this.category);
            this.$router.push("/categories");
        },
        confirm() {
            this.toggleModal(true, this.setting.edition ? "Update category" : "New category", this.setting.edition ? "Update" : "Add");
        },
        toggleModal(active: boolean, title: string, button: string, alert: any = null) {
            this.modal.active = active ? "is-active" : "";
            this.modal.title = title;
            this.modal.button = button;
            this.modal.alert = alert;
        }
    },
    components: { Modal }
}
</script>

<style>
.top-space {
    margin-top: 3em;
}
</style>