<template>
    <modal v-if="show" @closed="$emit('closed')">
        <div class="2xl:w-1/4 md:w-1/3 w-1/2 bg-transparent">
            <div class="flex justify-start items-stretch lg:flex-row flex-col">
                <div class="p-5 bg-red-500 rounded-sm lg:w-2/3 m-1">
                    <input type="text" class="bg-input w-full placeholder-white text-sm rounded-sm px-2 py-1 focus:outline-none" placeholder="Enter board title">
                </div>
                <div class="m-1 flex flex-wrap justify-start items-center lg:w-1/3">
                    <div class="bg-pink-500 w-8 h-8 mr-1 mb-1 rounded-sm" v-for="n in 9" :key="n"></div>
                </div>
            </div>
            <div class="m-1">
                <button class="bg-purple-600 text-white focus:outline-none px-2 py-1 text-sm rounded-sm hover:bg-purple-500">Create</button>
            </div>
        </div>
    </modal>
</template>

<script>
export default {
    props:{
        show:{
            Boolean
        }
    }
}
</script>

<style scoped>
.bg-input{
    background-color: rgba(255,255,255,0.1);
}
.bg-input:hover,.bg-input:focus{
    background-color: rgba(255,255,255,0.2);
}
</style>
