<template>
    <div class="flex justify-center items-start">
        <div class="sm:w-96 w-72 sm:mt-20 mt-5 text-center">
            <h1 @click="$router.push({name:'home'})" class="uppercase font-bold text-2xl text-purple-600 cursor-pointer">laravello</h1>
            <div class="border-gray-200 border-2 rounded-sm py-8 px-4 mt-5">
                <div class="font-bold text-base text-gray-500">Register at Laravello</div>
                <form @submit.prevent="register">
                    <div class="mt-6 w-full">
                        <input v-model="name" type="text"
                            class="py-1 px-3 text-sm outline-none focus:outline-none rounded-sm border-gray-200 border-b-2 focus:border-purple-300 transition-colors duration-300 w-5/6 sm:w-3/4"
                            placeholder="Enter full name" :class="{'border-red-300': inputHasErr('name') }">
                            <validation-err class="text-left w-5/6 sm:w-3/4 mx-auto" v-if="validationErr" :error="validationErr.name"></validation-err>
                    </div>
                    <div class="mt-4 w-full">
                        <input v-model="email"  type="text"
                            class="py-1 px-3 text-sm outline-none focus:outline-none rounded-sm border-gray-200 border-b-2 focus:border-purple-300 transition-colors duration-300 w-5/6 sm:w-3/4"
                            placeholder="Enter email" :class="{'border-red-300': inputHasErr('email') }">
                            <validation-err class="text-left w-5/6 sm:w-3/4 mx-auto" v-if="validationErr" :error="validationErr.email"></validation-err>
                    </div>
                    <div class="mt-4 w-full">
                        <input v-model="password"  type="password"
                            class="py-1 px-3 text-sm outline-none focus:outline-none rounded-sm border-gray-200 border-b-2 focus:border-purple-300 transition-colors duration-300 w-5/6 sm:w-3/4"
                            placeholder="Enter password" :class="{'border-red-300': inputHasErr('password') }">
                            <validation-err class="text-left w-5/6 sm:w-3/4 mx-auto" v-if="validationErr" :error="validationErr.password"></validation-err>
                    </div>
                    <div class="mt-4 w-full">
                        <input v-model="password_confirmation"
                            type="password"
                            class="py-1 px-3 text-sm outline-none focus:outline-none rounded-sm border-gray-200 border-b-2 focus:border-purple-300 transition-colors duration-300 w-5/6 sm:w-3/4"
                            placeholder="Repeat password">
                    </div>
                    <div class="mt-8 w-full">
                        <button type="submit"
                            class="py-1 px-3 text-white font-bold text-sm outline-none focus:outline-none rounded-sm bg-indigo-600 hover:bg-indigo-500 transition-colors duration-300 w-5/6 sm:w-3/4 disabled:opacity-30"
                            placeholder="Enter password" :disabled="disabled">Register</button>
                    </div>
                </form>
                <div class="mt-8 w-full">
                    <router-link :to="{name:'login'}" class="text-blue-700 hover:text-blue-900 hover:underline text-sm">already have an account? Login</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {gqlError} from './../utility.js';
import registerQuery from "./../graphql/Register.gql";
import errorMixin from './../mixins/errors';

export default {
    mixins:[errorMixin],
    data:() => ({
        name:null,
        email:null,
        password:null,
        password_confirmation:null,
        disabled:false,
    }),
    methods: {
        async register()
        {
            this.validationErr = null;
            this.errors = null;
            this.disabled = true;

            try {
                await this.$apollo.mutate({
                    mutation : registerQuery,
                    variables:{
                        name:this.name,
                        email:this.email,
                        password:this.password,
                        password_confirmation:this.password_confirmation,
                    }
                });
                this.$store.dispatch("auth/setLogin",true);
                this.$store.dispatch("auth/fetchUser");
                this.$router.push({name:'home'});
            } catch (error) {
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

