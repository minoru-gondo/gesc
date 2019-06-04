import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import { routes } from './routes';
import axios from 'axios'
import VueAxios from 'vue-axios'
import Select2 from 'v-select2-component';
import store from './assets/storages';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

Vue.component('Select2', Select2);


const router = new VueRouter({ 
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
