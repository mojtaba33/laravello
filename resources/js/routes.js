import Vue from 'vue';
import VueRouter from 'vue-router';
import Board from './view/Board';
import Login from './view/Login';

Vue.use(VueRouter)

const routes = [
    { path: '/boards/:id', component: Board },
    { path: '/login', name:'login' ,component: Login },
];

export const router = new VueRouter({
    routes,
    mode:'history'
});
