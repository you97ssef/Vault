import { createApp } from "vue";
import App from "./App.vue";
import type { Config } from "./models/config";
import router from "./router";

const app = createApp(App);

app.use(router);

const config: Config = { pass: "Secret", pin: null };
app.config.globalProperties.config = config;

app.mount("#app");
