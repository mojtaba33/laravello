<template>
    <nav class="flex justify-between text-white py-1 header">
        <div class="ml-3 w-1/3 flex justify-start items-center">
            <div class="relative">
                <BoardDropdown v-if="isLoggedIn"></BoardDropdown>
            </div>
        </div>
        <div class="w-1/3 opacity-70 hover:opacity-100 cursor-pointer flex items-center justify-center"
        @click="$route.name != 'home' ? $router.push({name:'home'}) : ''">Laravello</div>
        <div class="w-1/3 mr-3 flex justify-end items-center text-right">
            <ProfileDropdown v-if="isLoggedIn"></ProfileDropdown>
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
import BoardDropdown from './BoardDropdown';
import ProfileDropdown from './ProfileDropdown';
export default {
    components:{
        BoardDropdown,ProfileDropdown
    },
    computed:{
        ...mapState({
            isLoggedIn:state => state.auth.isLoggedIn,
            name:state => state.auth.user.name
        })
    }
}
</script>
<style scoped>
.header{
    background-color: rgba(0,0,0,0.2);
}
</style>
