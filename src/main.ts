import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'material-icons/iconfont/material-icons.css';
import "material-icons"

createApp(App).use(router).mount('#app')
