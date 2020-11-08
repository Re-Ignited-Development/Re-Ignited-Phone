import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueTimeago from './TimeAgo'
import PhoneAPI from './PhoneAPI'
import Notification from './Notification'

import AutoFocus from './directives/autofocus'

// Fontawesome
import fontawesome from '@fortawesome/fontawesome'
import fa from '@fortawesome/fontawesome-free-regular'
import fas from '@fortawesome/fontawesome-free-solid'
import fab from '@fortawesome/fontawesome-free-brands'

fontawesome.library.add(fa, fas, fab)

Vue.use(VueTimeago)
Vue.use(Notification)
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
Vue.prototype.$phoneAPI = PhoneAPI

window.VueTimeago = VueTimeago
window.Vue = Vue
window.store = store

Vue.directive('autofocus', AutoFocus)

/* eslint-disable no-new */
window.APP = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
