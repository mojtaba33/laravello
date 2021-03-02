<template>
    <div class="flex justify-center items-start">
        <div class="sm:w-96 w-72 sm:mt-24 mt-5 text-center">
            <h1 class="uppercase font-bold text-2xl text-purple-600 cursor-default">laravello</h1>
            <div class="border-gray-200 border-2 rounded-sm py-8 px-4 mt-5">
                <div class="font-bold text-base text-gray-500">Register at Laravello</div>
                <div class="mt-6 w-full">
                    <input type="text"
                        class="py-1 px-3 text-sm outline-none focus:outline-none rounded-sm border-gray-200 border-b-2 focus:border-purple-300 transition-colors duration-300 w-5/6 sm:w-3/4"
                        placeholder="Enter full name">
                </div>
                <div class="mt-6 w-full">
                    <input type="text"
                        class="py-1 px-3 text-sm outline-none focus:outline-none rounded-sm border-gray-200 border-b-2 focus:border-purple-300 transition-colors duration-300 w-5/6 sm:w-3/4"
                        placeholder="Enter email">
                </div>
                <div class="mt-6 w-full">
                    <input type="password"
                        class="py-1 px-3 text-sm outline-none focus:outline-none rounded-sm border-gray-200 border-b-2 focus:border-purple-300 transition-colors duration-300 w-5/6 sm:w-3/4"
                        placeholder="Enter password">
                </div>
                <div class="mt-6 w-full">
                    <input type="password"
                        class="py-1 px-3 text-sm outline-none focus:outline-none rounded-sm border-gray-200 border-b-2 focus:border-purple-300 transition-colors duration-300 w-5/6 sm:w-3/4"
                        placeholder="Repeat password">
                </div>
                <div class="mt-8 w-full">
                    <button type="submit"
                        class="py-1 px-3 text-white font-bold text-sm outline-none focus:outline-none rounded-sm bg-indigo-600 hover:bg-indigo-500 transition-colors duration-300 w-5/6 sm:w-3/4 disabled:opacity-30"
                        placeholder="Enter password">Register</button>
                </div>
                <div class="mt-8 w-full">
                    <router-link :to="{name:'login'}" class="text-blue-700 hover:text-blue-900 hover:underline text-sm">already have an account? Login</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    beforeCreate()
    {
        document.querySelector('body').style.backgroundColor = "#FFF";
    }
}
</script>

