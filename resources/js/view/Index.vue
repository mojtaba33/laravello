<template>
    <div>
        <NavBar></NavBar>
        <div class="h-screen flex justify-center items-center">
            <h1 class="sm:text-7xl text-3xl font-bold text-white title-shadow">Laravello</h1>
        </div>
    </div>
</template>
<script>
import NavBar from './../components/Nav';
export default {
    components:{
        NavBar
    },
    beforeCreate()
    {
        document.querySelector('body').style.backgroundImage = '';
        document.querySelector('body').style.backgroundColor = '';
        document.querySelector('body').className = "bg-gradient-to-b from-purple-600 to-blue-300";
        document.querySelector('body').style.overflow = 'hidden';
    }
}
</script>
<style scoped>
.title-shadow{
    text-shadow: -1px 1px #4B5563;
}
</style>
