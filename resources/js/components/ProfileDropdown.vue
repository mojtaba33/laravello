<template>
    <div class="relative">
        <button class="header-btn" @click="show = !show">Profile</button>
        <transition name="fade">
            <div v-if="show" v-on-clickaway="close" class="p-2 w-48 max-w-sm text-left text-gray-500 z-30 absolute rounded-sm bg-gray-100 top-8 right-0 z-10 shadow-md">
                <div class="text-xs mb-1 cursor-default text-gray-800 px-1 py-1">{{ userName }}</div>
                <router-link :to="{name:'my-boards'}" class="text-sm mb-1 block cursor-pointer hover:bg-gray-200 px-1 py-1 rounded-sm">Board management</router-link>
                <div class="h-px bg-gray-300 w-full"></div>
                <div @click="logout" class="text-sm mt-2 cursor-pointer hover:bg-gray-200 px-1 py-1 rounded-sm">Log out</div>
            </div>
        </transition>
    </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
import logoutQuery from './../graphql/logout.gql';
import { mapState } from 'vuex';
export default {
    data:()=>({
        show : false,
    }),
    directives: {
        onClickaway: onClickaway,
    },
    computed:{
        ...mapState({
            userName: state => state.auth.user.name,
        })
    },
    methods: {
        close()
        {
            this.show = false;
        },
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
            this.close;
        }
    }
}
</script>
