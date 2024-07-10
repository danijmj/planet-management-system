import './assets/main.css'

import { createApp } from 'vue'
import { store } from '@/stores/index' // pinia

import App from './App.vue'
import router from './router'

const app = createApp(App)
// Use pinia
app.use(router)
app.use(store)

app.mount('#app')
