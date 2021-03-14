import {apolloProvider} from './../apollo';
import meQuery from './../graphql/Me.gql';
import {router} from './../routes'
export default {
    namespaced: true,
    state: () => ({
        isLoggedIn:false,
        user:{
            id:null,
            name:null,
            email:null
        },
    }),
    mutations: {
        setLogin(state,payload)
        {
            state.isLoggedIn = payload;
        },
        setUser(state,payload)
        {
            state.user = payload;
        }
    },
    actions:{
        setLogin({commit},payload)
        {
            const status = Boolean(payload);
            commit("setLogin",status);
            localStorage.setItem('isLoggedIn',status)
        },
        logout({dispatch,commit})
        {
            dispatch("setLogin",false);
            commit("setUser",{
                id:null,
                name:null,
                email:null
            });
            router.push({name:'login'});
        },
        async fetchUser({state,dispatch,commit})
        {
            if(state.isLoggedIn)
            {
                const response = await apolloProvider.defaultClient.query({
                    query: meQuery,
                    fetchPolicy: 'no-cache',
                });

                const user = response.data.me;

                if(user)
                {
                    dispatch("setLogin",true);
                    commit("setUser",user);
                }else{
                    dispatch("logout");
                }
            }
        }
    }
}
