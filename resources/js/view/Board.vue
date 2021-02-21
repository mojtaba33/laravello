<template>
    <div class="h-screen bg-green-400 flex flex-col justify-start items-stretch">
        <nav class="flex justify-between bg-green-600 text-white py-1">
            <div class="ml-3">x</div>
            <div class="opacity-70 hover:opacity-100 cursor-pointer">Laravello</div>
            <div class="mr-3">x</div>
        </nav>
        <section class=" p-3 flex flex-col justify-start items-stretch pb-0 h-full overflow-y-auto">
            <h1 class="text-white font-bold text-lg mb-2">Board Title</h1>
            <div class="flex justify-start overflow-x-auto  items-start pb-5 h-full">

                <List></List>
                <List></List>
                <List></List>
                <List></List>
                <List></List>

            </div>

        </section>
    </div>
</template>
<script>
import List from './../components/List';
export default {
    components:{
        List
    }
}
</script>
