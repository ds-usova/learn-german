import {createApp} from 'vue'
import App from './App.vue'
import BootstrapVueNext from 'bootstrap-vue-next'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faArrowLeft, faArrowRight, faCheck, faPaw, faSpinner, faXmark, faTrash} from '@fortawesome/free-solid-svg-icons'
import {faPenToSquare, faKeyboard} from '@fortawesome/free-regular-svg-icons'
import router from './router/router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/css/main.css'
import {createPinia} from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

library.add(faArrowRight, faArrowLeft, faCheck, faXmark, faSpinner, faPaw, faPenToSquare, faTrash, faKeyboard)

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedState)
app.use(pinia)
app.use(router)
app.use(BootstrapVueNext)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
