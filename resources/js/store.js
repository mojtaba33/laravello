import Vue from 'vue';
import Vuex from 'vuex';
import auth from './vuex madules/auth';

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        auth
    },
    actions:{
        addBodyClass(context,payload)
        {
            document.querySelector('body').classList.add(...payload.class);
        },
        removeBodyClass(context,payload)
        {
            document.querySelector('body').classList.remove(...payload.class);
        },
    }
});
