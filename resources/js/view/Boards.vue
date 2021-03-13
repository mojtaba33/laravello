<template>
    <div class="opacity-100">
        <NavBar></NavBar>
        <div class="md:w-3/4 w-full m-auto my-10">
            <div>
                <h1 class="md:text-2xl text-lg text-gray-700 font-bold ml-2">Boards : </h1>
                <div class="flex justify-start items-stretch flex-wrap mt-5">
                    <div class="lg:w-1/5 lg:h-36 md:w-1/3 md:h-28 w-1/2 h-24 flex justify-center items-center" v-for="n in 15" :key="n">
                        <div class="w-11/12 h-5/6 bg-indigo-500 flex justify-center items-center shadow-md rounded-sm relative" id="title-holder">
                            <div class="absolute right-2 top-2 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 title">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <div class="title">Board Name</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from './../components/Nav';
import BodyClass from './../mixins/class';
export default {
    mixins:[BodyClass],
    components:{
        NavBar
    },
    data:() => ({
        className: ["bg-gray-100"],
        navClass: ['bg-blue-600','shadow-lg'],
    }),
    mounted()
    {
        document.querySelector('#nav-bar').classList.remove('header');
        document.querySelector('#nav-bar').classList.add(...this.navClass);
    },
    destroyed() {
        document.querySelector('#nav-bar').classList.add('header');
        document.querySelector('#nav-bar').classList.remove(...this.navClass);
    },
}
</script>

<style scoped>
.title{
    color: rgba(255, 255, 255, 0.7);
}
#title-holder:hover > .title{
    color: ;color: rgba(255, 255, 255, 0.9);
}
</style>
