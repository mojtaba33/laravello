import './bootstrap';
import Vue from 'vue';
import {apolloProvider} from './apollo';
import {router} from './routes';
import Loading from './components/global/Loading'

window.Vue = Vue;
Vue.component("loading",Loading);

const app = new Vue({
    el: '#app',
    apolloProvider,
    router,
    components:{},
});
