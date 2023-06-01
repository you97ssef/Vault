import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import type { Store } from "vuex";

import "./assets/css/style.sass";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";

import { SecretRepo } from "./data/secret-repo";

import { DataService } from "./services/data-service";
import { Schema } from "./data/db";

const app = createApp(App);

app.use(router);
app.use(store);

declare module "vue" {
    interface ComponentCustomProperties {
        $dataService: DataService;
        $secretRepo: SecretRepo;
        $store: Store<any>;
    }
}

const db = new Schema("secrets-test", 1);

app.config.globalProperties.$dataService = new DataService();
app.config.globalProperties.$secretRepo = new SecretRepo(db);

app.mount("#app");
