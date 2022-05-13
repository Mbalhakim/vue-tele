import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import setAuthHeader from "@/utils/setAuthHeaders";
import store from "@/store";
// import api from "./lib/api-platform";

if (localStorage.jwtToken) {
    setAuthHeader(localStorage.jwtToken);
} else {
    setAuthHeader ( false);
}

 createApp(App).use(router).use(store).mount('#app')

// app.config.globalProperties.$api = api