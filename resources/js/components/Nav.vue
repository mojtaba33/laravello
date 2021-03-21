<template>
    <nav class="flex sm:justify-between flex-row flex-wrap justify-start text-white py-1 header" id="nav-bar">
        <div class="sm:w-1/3 w-1/2 pl-2 flex justify-start items-center order-2 sm:order-1">
            <div class="relative">
                <BoardDropdown v-if="isLoggedIn"></BoardDropdown>
                <button v-else class="header-btn" @click="$router.push({name:'login'})">Login</button>
            </div>
        </div>
        <div class="sm:w-1/3 w-full opacity-70 hover:opacity-100 cursor-pointer flex items-center justify-center order-1 sm:order-2"
        @click="$route.name != 'home' ? $router.push({name:'home'}) : ''">Laravello</div>
        <div class="sm:w-1/3 w-1/2 pr-2 flex justify-end items-center text-right order-3 ">
            <ProfileDropdown v-if="isLoggedIn"></ProfileDropdown>
            <div v-else>
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
