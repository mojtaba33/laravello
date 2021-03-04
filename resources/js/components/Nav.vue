<template>
    <nav class="flex justify-between bg-purple-600 text-white py-1">
        <div class="ml-3 w-1/3 flex justify-start items-center">x</div>
        <div class="w-1/3 opacity-70 hover:opacity-100 cursor-pointer flex items-center justify-center" @click="$router.push({name:'home'})">Laravello</div>
        <div class="w-1/3 mr-3 flex justify-end items-center">
            <div v-if="isLoggedIn">
                <span class="mr-1 text-sm opacity-90">{{ name }}</span>
                <button class="header-btn" @click="logout">Logout</button>
            </div>
            <div v-else>
                <button class="header-btn" @click="$router.push({name:'login'})">Login</button>
                <button class="header-btn" @click="$router.push({name:'register'})">Register</button>
            </div>
        </div>
    </nav>
</template>
<script>
import {mapState} from 'vuex';
import logoutQuery from './../graphql/logout.gql';
export default {
    computed:{
        ...mapState({
            isLoggedIn:state => state.auth.isLoggedIn,
            name:state => state.auth.user.name
        })
    },
    methods: {
        async logout()
        {
            try {
                await this.$apollo.mutate({
                    mutation: logoutQuery,
                });
                this.$store.dispatch("auth/logout");
            } catch (error) {
                this.$store.dispatch("auth/logout");
            }
        }
    },
}
</script>
<style >

</style>
