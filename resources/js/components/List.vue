<template>
    <div class="bg-gray-200 p-2 rounded-sm shadow-md mr-3 list">
        <div class="flex justify-between items-baseline w-full ">
            <h3 class="text-black font-bold text-sm">Card Title</h3>
            <span class="text-gray-500 font-bold text-md hover:text-black p-1 cursor-pointer">x</span>
        </div>

            <CardItem></CardItem>
            <CardItem></CardItem>
            <CardItem></CardItem>
            <CardItem></CardItem>
            <CardItem></CardItem>

        <div class="w-auto p-1 mt-2 rounded-sm bg-transparent text-gray-600 text-left text-sm hover:text-gray-900 cursor-pointer">
            Add new card
        </div>
    </div>
</template>

<script>
import CardItem from './CardItem'
export default {
    components:{
        CardItem
    }
}
</script>

<style scoped>
    .list{
        min-width: 250px;
        width: 250px;
    }
</style>
