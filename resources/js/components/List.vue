<template>
    <div class="bg-gray-200 p-2 rounded-sm shadow-md mr-3 list">
        <div class="flex justify-between items-baseline w-full ">
            <h3 class="text-black font-bold text-sm cursor-default">{{ list.title }}</h3>
            <span class="text-gray-500 font-bold text-md hover:text-black p-1 cursor-pointer">x</span>
        </div>

        <CardItem v-for="card in list.cards" :key="`card-${card.id}`" :card="card" @card-deleted="$emit('card-deleted',{...$event,list_id:list.id})"></CardItem>

        <div v-if="!showCardEditor" @click="showCardEditor = true;" class="w-auto p-1 mt-2 rounded-sm bg-transparent text-gray-600 text-left text-sm hover:text-gray-900 cursor-pointer">
            Add new card
        </div>
        <div v-if="showCardEditor">
            <CardEditor :list="list" @close-editor="showCardEditor = false"  @card-added="$emit('card-added',{...$event,list_id:list.id})"></CardEditor>
        </div>

    </div>
</template>

<script>
import CardItem from './CardItem';
import CardEditor from './CardEditor';

export default {
    props:{
        list:Object,
    },
    data:()=>({
        showCardEditor : false,
    }),
    components:{
        CardItem,CardEditor
    },
}
</script>

<style scoped>
    .list{
        min-width: 250px;
        width: 250px;
    }
</style>
