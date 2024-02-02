import { createApp } from 'vue'
import App from './App.vue'
import BootstrapVueNext from 'bootstrap-vue-next'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import router from './router/router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import '@fortawesome/fontawesome-free/css/all.css'

library.add(faArrowRight, faArrowLeft)
const app = createApp(App)
app.use(router)
app.use(BootstrapVueNext)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
