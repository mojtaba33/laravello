<template>
    <nav class="flex justify-between bg-purple-600 text-white py-1">
        <div class="ml-3 w-1/3 flex justify-start">x</div>
        <div class="w-1/3 opacity-70 hover:opacity-100 cursor-pointer flex justify-center" @click="$router.push({name:'home'})">Laravello</div>
        <div class="w-1/3 mr-3 flex justify-end">
            <div v-if="isLoggedIn">
                <span class="mr-1 text-sm opacity-90">{{ name }}</span>
                <button class="header-btn">Logout</button>
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
export default {
    computed:{
        ...mapState({
            isLoggedIn:state => state.auth.isLoggedIn,
            name:state => state.auth.user.name
        })
    }
}
</script>
<style >

</style>
