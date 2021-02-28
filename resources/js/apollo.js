import Vue from 'vue'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo)

const apolloClient = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
    },
    credentials:'include'
})

export const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})




