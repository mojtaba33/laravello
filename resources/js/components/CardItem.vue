<template>
    <div class="bg-white hover:text-black text-gray-900 p-2 mt-2 rounded-sm shadow-sm text-sm w-full cursor-default hover:shadow-md transition-all">{{ card.title }}</div>
</template>
<script>
export default {
    props:{
        card:Object
    }
}
</script>
