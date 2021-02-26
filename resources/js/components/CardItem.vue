<template>
    <div class="group bg-white hover:text-black text-gray-900 p-2 mt-2 rounded-sm shadow-sm text-sm
    w-full cursor-default hover:shadow-md flex justify-between transition-all ease-out duration-500">
        {{ card.title }}
        <div class="flex justify-end opacity-0 group-hover:opacity-100 transition-all ease-out duration-500">
            <div class="mr-1 font-bold text-gray-400 cursor-pointer hover:text-yellow-500">U</div>
            <div class="font-bold text-gray-400 cursor-pointer hover:text-red-500">D</div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        card:Object
    }
}
</script>
