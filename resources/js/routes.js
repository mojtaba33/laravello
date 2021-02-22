import Vue from 'vue';
import VueRouter from 'vue-router';
import Board from './view/Board';

Vue.use(VueRouter)

const routes = [
    { path: '/boards/:id', component: Board },
];

export const router = new VueRouter({
    routes,
    mode:'history'
});
