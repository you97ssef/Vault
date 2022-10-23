import { createApp } from "vue";
import App from "./App.vue";
import type { Config } from "./models/config";
import router from "./router";
import { CategoryRepo } from "./data/category-repo";

import "./assets/style.sass";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import { SecretRepo } from "./data/secret-repo";

const app = createApp(App);

app.use(router);

const config: Config = { pass: "Secret", pin: null };
app.config.globalProperties.config = config;
app.config.globalProperties.categoryRepo = new CategoryRepo();
app.config.globalProperties.secretRepo = new SecretRepo();


app.mount("#app");
