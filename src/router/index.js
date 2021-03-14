import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Order from '../views/Order.vue';
import Rooms from '../views/Rooms.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Order',
    name: 'Order',
    component: Order,
  },
  {
    path: '/Rooms',
    name: 'Rooms',
    component: Rooms,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
