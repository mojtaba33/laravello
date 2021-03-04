import Vue from 'vue';
import VueRouter from 'vue-router';
import Board from './view/Board';
import Login from './view/Login';
import Register from './view/Register';
import Index from './view/Index';
Vue.use(VueRouter)

const routes = [
    { path: '/' , name: 'home' , component:Index},
    { path: '/boards/:id', component: Board },
    { path: '/login', name:'login' ,component: Login },
    { path: '/register', name:'register' ,component: Register },
];

export const router = new VueRouter({
    routes,
    mode:'history'
});
