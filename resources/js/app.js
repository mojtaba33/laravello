import './bootstrap';
import Vue from 'vue';
import {apolloProvider} from './apollo';
import {router} from './routes';
import {store} from './store';
import Loading from './components/global/Loading';
import ValidationErr from './components/global/ValidationErr';
import showError from './components/global/showError';
import Modal from './components/global/Modal';
import NotFound from './components/global/404';

window.Vue = Vue;
Vue.component("loading",Loading);
Vue.component("validation-err",ValidationErr);
Vue.component("show-error",showError);
Vue.component("modal",Modal);
Vue.component("NotFound",NotFound);

const app = new Vue({
    el: '#app',
    apolloProvider,
    router,
    store,
    components:{},
    async beforeCreate()
    {
        this.$store.dispatch("auth/setLogin",localStorage.getItem("isLoggedIn") === "true");
        await this.$store.dispatch("auth/fetchUser");
    }
});
