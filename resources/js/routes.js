import Vue from 'vue';
import VueRouter from 'vue-router';
import Board from './view/Board';
import Login from './view/Login';
import Register from './view/Register';
import Index from './view/Index';
import Boards from './view/Boards';
import NotFound from './components/global/404';
import { store } from './store';
Vue.use(VueRouter)

const routes = [
    { path: '/' , name: 'home' , component:Index},
    { path: '/boards/:id', name: 'board', component: Board },
    { path: '/login', name:'login' ,component: Login },
    { path: '/register', name:'register' ,component: Register },
    { path: '/my-boards', name:'my-boards' ,component: Boards , meta:{auth:true}},
    { path: '/not-found', name:'not-found' ,component: NotFound },
    { path: '*',component: NotFound },
];

export const router = new VueRouter({
    routes,
    mode:'history'
});

router.beforeEach((to, from, next) => {
    if(to.meta?.auth)
    {
        if(store.state.auth.isLoggedIn)
        {
            next();
        }else{
            next({name:'login'});
        }
    }else{
        next();
    }
})
