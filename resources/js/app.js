import './bootstrap';
import Vue from 'vue';
import {apolloProvider} from './apollo';
import {router} from './routes';
import {store} from './store';
import Loading from './components/global/Loading';
import ValidationErr from './components/global/ValidationErr';
import showError from './components/global/showError';

window.Vue = Vue;
Vue.component("loading",Loading);
Vue.component("validation-err",ValidationErr);
Vue.component("show-error",showError);

const app = new Vue({
    el: '#app',
    apolloProvider,
    router,
    store,
    components:{},
    beforeCreate()
    {
        this.$store.dispatch("auth/setLogin",localStorage.getItem("isLoggedIn") === "true");
        this.$store.dispatch("auth/fetchUser");
    }
});
