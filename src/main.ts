import { createApp } from "vue";
import App from "./App.vue";
import type { Config } from "./models/config";
import router from "./router";
import { CategoryService } from "./data/category-service";

import "./assets/style.sass";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";

const app = createApp(App);

app.use(router);

const config: Config = { pass: "Secret", pin: null };
app.config.globalProperties.config = config;
app.config.globalProperties.categoryService = new CategoryService();


app.mount("#app");
