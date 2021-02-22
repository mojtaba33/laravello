import './bootstrap';
import Vue from 'vue';
import Board from './view/Board';
import apolloProvider from './apollo'

window.Vue = Vue;

const app = new Vue({
    el: '#app',
    apolloProvider,
    components:{
        Board,
    },
});
