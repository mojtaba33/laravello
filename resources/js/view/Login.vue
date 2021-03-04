<template>
    <div class="flex justify-center items-start">
        <div class="sm:w-96 w-72 sm:mt-24 mt-5 text-center">
            <h1 class="uppercase font-bold text-2xl text-purple-600 cursor-default">laravello</h1>
            <div class="border-gray-200 border-2 rounded-sm py-8 px-4 mt-5">
                <div class="font-bold text-base text-gray-500">Log in to Laravello</div>
                <form @submit.prevent="login">
                    <show-error class="mt-2" v-if="errors" :errors="errors"></show-error>
                    <div class="mt-6 w-full">
                        <input v-model="email" type="text"
                            class="py-1 px-3 text-sm outline-none focus:outline-none rounded-sm border-gray-200 border-b-2 focus:border-purple-300 transition-colors duration-300 w-5/6 sm:w-3/4"
                            placeholder="Enter email" :class="{'border-red-300': inputHasErr('email') }">
                            <validation-err class="text-left w-5/6 sm:w-3/4 mx-auto" v-if="validationErr" :error="validationErr.email"></validation-err>
                    </div>
                    <div class="mt-6 w-full">
                        <input v-model="password" type="password"
                            class="py-1 px-3 text-sm outline-none focus:outline-none rounded-sm border-gray-200 border-b-2 focus:border-purple-300 transition-colors duration-300 w-5/6 sm:w-3/4"
                            placeholder="Enter password" :class="{'border-red-300': inputHasErr('password') }">
                            <validation-err class="text-left w-5/6 sm:w-3/4 mx-auto" v-if="validationErr" :error="validationErr.password"></validation-err>
                    </div>
                    <div class="mt-8 w-full">
                        <button type="submit"
                            class="py-1 px-3 text-white relative font-bold text-sm outline-none focus:outline-none rounded-sm bg-indigo-600 hover:bg-indigo-500 transition-colors duration-300 w-5/6 sm:w-3/4 disabled:opacity-30"
                            placeholder="Enter password"
                            :disabled="disabled"
                            >Login</button>

                    </div>
                </form>
                <div class="mt-8 w-full">
                    <router-link :to="{ name:'register' }" class="text-blue-700 hover:text-blue-900 hover:underline text-sm">Sign up for an account</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import loginQuery from './../graphql/Login.gql';
import {gqlError} from './../utility';
import mixinErr from './../mixins/errors';
export default {
    mixins:[mixinErr],
    data:() => ({
        email:null,
        password:null,
        disabled:false
    }),
    methods: {
        async login()
        {
            this.validationErr = null;
            this.errors = null;
            this.disabled = true;

            try{
                await this.$apollo.mutate({
                    mutation: loginQuery,
                    variables: {
                        email:this.email,
                        password:this.password
                    }
                });
                this.$store.dispatch("auth/setLogin",true);
                await this.$store.dispatch("auth/fetchUser");
                this.$router.push({name:'home'});
            }catch(error){
                this.errorHandler(gqlError(error));
            }
            this.disabled = false;
        }
    },
    beforeCreate()
    {
        document.querySelector('body').style.backgroundColor = "#FFF";
        document.querySelector('body').style.backgroundImage = "none";
    }
}
</script>
