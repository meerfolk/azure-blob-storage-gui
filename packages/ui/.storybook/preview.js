import Vue from 'vue';
import Vuex from 'vuex';
import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(BootstrapVueIcons);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}