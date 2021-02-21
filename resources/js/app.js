import './bootstrap';
import Vue from 'vue';
import Board from './view/Board'

const app = new Vue({
    el: '#app',
    components:{
        Board,
    },
});
