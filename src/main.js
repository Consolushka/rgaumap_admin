import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(VueAxios, axios);
export const eventBus = new Vue();
window.$ = window.jQuery = require('jquery');
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
