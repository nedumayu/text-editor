import { createApp } from 'vue'
import {createPinia} from "pinia";
import './main.css'
import App from './App.vue'
import router from "./router/Router.js";
import components from './components/UI/ui.js'

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component)
})

app
    .use(router)
    .use(createPinia())
    .mount('#app')
