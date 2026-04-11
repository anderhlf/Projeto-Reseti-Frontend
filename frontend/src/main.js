import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // <--- 1. Importa as configurações de rotas

const app = createApp(App)

app.use(router) // <--- 2. ESSA É A LINHA MÁGICA QUE FALTA!

app.mount('#app')