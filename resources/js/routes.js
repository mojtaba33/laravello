import Vue from 'vue';
import VueRouter from 'vue-router';
import Board from './view/Board';
import Login from './view/Login';
import Register from './view/Register';
import Index from './view/Index';
import Boards from './view/Boards';
import NotFound from './components/global/404';
Vue.use(VueRouter)

const routes = [
    { path: '/' , name: 'home' , component:Index},
    { path: '/boards/:id', name: 'board', component: Board },
    { path: '/login', name:'login' ,component: Login },
    { path: '/register', name:'register' ,component: Register },
    { path: '/boards', name:'boards' ,component: Boards },
    { path: '/not-found', name:'not-found' ,component: NotFound },
    { path: '*',component: NotFound },
];

export const router = new VueRouter({
    routes,
    mode:'history'
});
