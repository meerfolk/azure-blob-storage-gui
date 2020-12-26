import Vue from 'vue';
import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from 'bootstrap-vue';

import App from './App.vue';
import router from './router';
import store from './store';
import { ElectronEventHandler } from './infrastructure';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

new ElectronEventHandler(
  () => store.dispatch('settings/openDialog'),
).init();