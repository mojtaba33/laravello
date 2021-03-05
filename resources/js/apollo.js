import Vue from 'vue'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo';
import {gqlError} from './utility';

Vue.use(VueApollo)

const apolloClient = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
    },
    credentials:'include',
    onError: (error) => {
        gqlError(error);
    }
})

export const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})
