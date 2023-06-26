import Vue from 'vue'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo';
import {gqlError} from './utility';

Vue.use(VueApollo)

const {origin} = window.location

const apolloClient = new ApolloClient({
    uri: `${origin}/graphql`,
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
