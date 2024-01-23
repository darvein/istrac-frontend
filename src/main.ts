import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Ensure this is the correct path

createApp(App).use(store).use(router).mount('#app');
