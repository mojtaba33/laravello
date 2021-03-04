export default {
    namespaced: true,
    state: () => ({
        isLoggedIn:false
    }),
    mutations: {
        setLogin(state,payload)
        {
            state.isLoggedIn = payload;
        }
    },
    actions:{
        setLogin({commit},payload)
        {
            const status = Boolean(payload);
            commit("setLogin",status);
            localStorage.setItem('isLoggedIn',status)
        }
    }
}
