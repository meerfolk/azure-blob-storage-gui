import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeComponent from '../components/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: HomeComponent,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
