import { createApp } from 'vue'
import {createPinia} from "pinia";
import './main.css'
import App from './App.vue'
import router from "./router/Router.js";
import components from './components/UI/ui.js'
import VFocus from "./directives/VFocus.js";
import LottieAnimation from "lottie-web-vue";

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component)
})

app.directive('focus', VFocus)

app
    .use(createPinia())
    .use(router)
    .use(LottieAnimation)
    .mount('#app')
