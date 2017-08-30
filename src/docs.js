import Vue from 'vue'
import Buefy from 'buefy'
Vue.use(Buefy)
import App from './app'
import router from './router'

import './styles/app.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
