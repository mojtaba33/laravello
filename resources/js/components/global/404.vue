<template>
    <div class="h-screen w-full flex justify-center items-center">
        <div class="text-center">
            <h1 class="text-9xl text-purple-500 font-bold">404</h1>
            <h3 class="mt-3 uppercase font-bold text-purple-500">not found</h3>
            <router-link :to="{name:'home'}" class="text-gray-400 hover:text-gray-500 hover:underline mt-3 block text-base">Take me to the home page</router-link>
        </div>
    </div>
</template>