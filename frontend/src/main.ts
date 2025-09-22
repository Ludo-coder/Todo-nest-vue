import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App);
app.use(router);
app.use(Vue3Toastify, {
  global: {
    position: "bottom-right",
    duration: 5000,
    draggable: true,
    stopOnFocus: true,
    theme: "dark",
    offset: {
      y: 100,
    },
  } as ToastContainerOptions,
});
app.mount("#app");
