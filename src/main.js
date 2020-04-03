import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import Vue from 'vue'
import store from "./store";
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  components: { App },
  render: h => h(App),
}).$mount('#app')
