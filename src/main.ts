import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import type { Store } from "vuex";

import "./assets/css/style.sass";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";

import { SecretRepo } from "./data/secret-repo";

import { DataService } from "./services/data-service";

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

app.config.globalProperties.$dataService = new DataService();
app.config.globalProperties.$secretRepo = new SecretRepo();

app.mount("#app");
