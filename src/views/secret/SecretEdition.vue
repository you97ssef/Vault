<template>
    <div>
        <div class="is-flex is-justify-content-space-between mb-5">
            <div>
                <h1 class="title">{{ setting.title }} Secret</h1>
                <h2 class="subtitle">{{ setting.subtitle }}</h2>
            </div>
            <div class="m-2 buttons" v-if="setting.edition">
                <router-link to="/secrets" class="button is-black is-dark">
                    <span class="icon">
                        <i class="fa-solid fa-lg fa-ban"></i>
                    </span>
                </router-link>
            </div>
        </div>
        <form class="top-space" @submit.prevent="confirm()">
            <div class="field my-5">
                <label class="label">Topic</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Secret topic ..." v-model="secret.topic" required>
                </div>
            </div>

            <label class="label is-small mt-5">Tags</label>
            <div class="field is-grouped">
                <div class="control is-expanded">
                    <input 
                        class="input is-small" 
                        type="text" 
                        placeholder="Secret..." 
                        v-model="tag"
                    >
                </div>
                <div class="control">
                    <button type="button" class="button is-dark is-small" @click="addTag()">
                        <div class="icon">
                            <i class="fa-solid fa-lg fa-add"></i>
                        </div>
                    </button>
                </div>
                
            </div>
            
            <div class="field is-grouped is-justify-content-center mb-5">
                <div v-if="secret.tags.length == 0">No tags available</div> 
                <div class="control" v-for="(t, i) in secret.tags" :key="i">
                    <button type="button" class="button is-small is-rounded is-light" @click="deleteTag(i)">
                        <span>{{ t }}</span>
                        <span class="icon">
                            <i class="fa-solid fa-xmark"></i>
                        </span>
                    </button>
                </div>
            </div>

            <div class="my-5" v-for="(v, i) in secret.values" :key="i">
                <label class="label">Value</label>
                <div class="field is-grouped is-flex-wrap-wrap">
                    <div class="control mt-1">
                        <input 
                            class="input" 
                            type="text"
                            placeholder="Label..." 
                            v-model="v.label"
                            required
                        >
                    </div>
                    <div class="control mt-1 is-expanded">
                        <input 
                            class="input" 
                            :type="secretsVisibility[i] ? 'text' : 'password'" 
                            placeholder="Secret..." 
                            v-model="v.value"
                            required
                        >
                    </div>
                    <div class="control mt-1">
                        <button type="button" class="button is-dark" @click="toggleVisibility(i)">
                            <div class="icon">
                                <i class="fa-solid fa-lg fa-eye" v-if="!secretsVisibility[i]"></i>
                                <i class="fa-solid fa-lg fa-eye-slash" v-if="secretsVisibility[i]"></i>
                            </div>
                        </button>
                    </div>
                    <div class="control mt-1">
                        <button type="button" class="button is-dark" @click="copy(v)">
                            <div class="icon">
                                <i class="fa-solid fa-lg fa-copy"></i>
                            </div>
                        </button>
                    </div>
                    <div class="control mt-1" v-if="secret.values.length > 1">
                        <button type="button" class="button is-danger is-light" @click="deleteValue(i)">
                            <div class="icon">
                                <i class="fa-regular fa-lg fa-trash-can"></i>
                            </div>
                        </button>
                    </div>
                </div>
                <SecretGenerator :i="i" @secret="secretGenerated"></SecretGenerator>
            </div>

            <div class="field is-grouped is-justify-content-center my-5">
                <div class="control">
                    <button type="button" class="button is-rounded is-primary is-light" @click="addNewValue()">
                        <span class="icon">
                            <i class="fa-solid fa-lg fa-plus"></i>
                        </span>
                        <span>Add value</span>
                    </button>
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
                    <button class="button is-danger is-light" type="button" @click="deleteSecret()">
                        <span class="icon">
                            <i class="fa-regular fa-trash-can"></i>
                        </span>
                        <span>Delete</span>
                    </button>
                </div>
                <div class="control">
                    <router-link to="/secrets" class="button is-light">
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
import { defineComponent } from "vue";
import type { Secret } from '@/models/secret';
import type { SecretValue } from '@/models/secret-value';
import { SecretService } from '@/services/secret-service';
import SecretGenerator from '@/components/SecretGenerator.vue';
import Modal from '@/components/Modal.vue';
import type { ModalState } from "@/models/modal-state";

export default defineComponent({
    async created() {
        // setting page settings depending on the route
        if (this.$route.name == "new-secret") {
            this.setting.title = "New";
            this.setting.subtitle = "Add a new secret of your secrets.";
            this.setting.edition = false;
            this.addNewValue();
        }
        else {
            this.setting.title = "Edit";
            this.setting.subtitle = "Edit/Delete your secret.";
            let secret: Secret | undefined = await this.$secretRepo.get(this.$route.params.secretId);
            if (secret != undefined) {
                this.secret = secret;
                for (const v of secret.values) {
                    v.value = this.secretService.decrypt(v.value);
                }
            }
            else
                this.$router.push("/404");
        }
    },
    data() {
        let secret: Secret = {
            id: null,
            topic: "",
            values: [],
            tags: []
        };
        return {
            tag: "",
            secretService: new SecretService(this.$store.getters.GET_CODE),
            setting: {
                title: "",
                subtitle: "",
                edition: true
            },
            secret: secret,
            secretsVisibility: [] as any[],
            indexToDelete: 0 as number,
            modal: {
                active: "",
                title: "",
                button: ""
            } as ModalState
        };
    },
    methods: {
        deleteSecret() {
            this.toggleModal(true, "Delete secret", "Delete");
        },
        async submit(type: string) {
            if(type == "Delete") {
                if (this.modal.title == "Delete value") {
                    this.secret.values.splice(this.indexToDelete, 1)
                    this.toggleModal(false, '', '')
                } else {
                    await this.$secretRepo.delete(this.secret.id);
                    this.$router.push("/secrets");
                }
            } else {
                this.secret.values = this.secret.values.map((v: SecretValue) => {
                    v.value = this.secretService.encrypt(v.value);
                    return v;
                })
                await this.$secretRepo.save(this.secret);
                this.$router.push("/secrets");
            }
        },
        confirm() {
            this.toggleModal(true, this.setting.edition ? "Update secret" : "New secret", this.setting.edition ? "Update" : "Add")
        },
        secretGenerated(secret: any) {
            this.secret.values[secret.i].value = secret.value
        },
        toggleVisibility(i: number) {
            this.secretsVisibility[i] = !this.secretsVisibility[i]
        },
        copy(v: SecretValue) {
            navigator.clipboard.writeText(v.value);
            console.log('copied successfully!')
        },
        toggleModal(active: boolean, title: string, button: string) {
            this.modal.active = active ? "is-active" : "";
            this.modal.title = title;
            this.modal.button = button
        },
        addNewValue() {
            this.secret.values.push({ label: "", value: "" })
            this.secretsVisibility.push(false)
        },
        deleteValue(i: number) {
            this.indexToDelete = i
            this.toggleModal(true, "Delete value", "Delete");
        },
        addTag() {
            if (this.tag.length > 0 && this.secret.tags.indexOf(this.tag) == -1) {
                this.secret.tags.push(this.tag)
                this.tag = ""
            }
        },
        deleteTag(i: number) {
            this.secret.tags.splice(i, 1)
        }
    },
    components: { SecretGenerator, Modal }
})
</script>

<style>
.top-space {
    margin-top: 3em;
}
</style>