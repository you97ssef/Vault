import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store'

import "./assets/css/style.sass";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";

import { CategoryRepo } from "./data/category-repo";
import { SecretRepo } from "./data/secret-repo";

import { DataService } from "./services/data-service";

const app = createApp(App).use(store);

app.use(router);
app.use(store);

app.config.globalProperties.dataService = new DataService();
app.config.globalProperties.categoryRepo = new CategoryRepo();
app.config.globalProperties.secretRepo = new SecretRepo();

app.mount("#app");
