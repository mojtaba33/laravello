<template>
        <div>
            <button class="header-btn" @click.prevent="show = !show">Boards</button>
            <transition name="fade">
                <div v-if="show" class="px-2 w-64 absolute rounded-sm bg-gray-100 top-8 z-10 shadow-md">

                    <div v-for="n in 5" :key="n" class="text-gray-700 my-2 flex justify-start items-center rounded-sm bg-purple-200 cursor-pointer">
                        <div class="w-8 h-8 bg-purple-400 rounded-sm rounded-r-none"></div>
                        <div class="ml-1 text-xs font-bold">borad item</div>
                    </div>

                </div>
            </transition>
        </div>
</template>
<script>
export default {
    data:()=>({
        show:false,
    })
}
</script>
