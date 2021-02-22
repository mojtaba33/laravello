import './bootstrap';
import Vue from 'vue';
import Board from './view/Board';
import {apolloProvider} from './apollo';
import {router} from './routes';

window.Vue = Vue;

const app = new Vue({
    el: '#app',
    apolloProvider,
    router,
    components:{
        Board,
    },
});
