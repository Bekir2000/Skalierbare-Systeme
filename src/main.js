import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.css'
import 'bootstrap-datepicker'
import './style.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
