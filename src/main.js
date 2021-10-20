import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { MdCoronavirus, PrSpinner, PrSort } from "oh-vue-icons/icons";
import "./assets/tailwind.css";

addIcons(MdCoronavirus, PrSpinner, PrSort);

const app = createApp(App);
app.use(router);
app.component("v-icon", OhVueIcon);
app.mount("#app");
