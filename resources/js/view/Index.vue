<template>
    <div>
        <NavBar></NavBar>
        <div class="w-full absolute top-1/2 text-center">
            <h1 class="sm:text-7xl text-3xl mx-auto font-bold text-white title-shadow">Laravello</h1>
        </div>
    </div>
</template>
<script>
import NavBar from './../components/Nav';
import bodyClassMixin from './../mixins/class';
export default {
    mixins:[bodyClassMixin],
    components:{
        NavBar
    },
    data:()=>({
        className: ["bg-gradient-to-b", "from-purple-600", "to-blue-300", "h-screen"]
    }),

}
</script>
<style scoped>
.title-shadow{
    text-shadow: -1px 1px #4B5563;
}
</style>
