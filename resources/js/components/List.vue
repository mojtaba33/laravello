<template>
    <div class="bg-gray-200 p-2 rounded-sm shadow-md mr-3 list">
        <div class="flex justify-between items-baseline w-full ">
            <h3 class="text-black font-bold text-sm cursor-default">{{ list.title }}</h3>
            <span class="text-gray-500 font-bold text-md hover:text-black p-1 cursor-pointer">x</span>
        </div>

            <CardItem v-for="card in list.cards" :key="`card-${card.id}`" :card="card"></CardItem>

        <div @click="addCard" class="w-auto p-1 mt-2 rounded-sm bg-transparent text-gray-600 text-left text-sm hover:text-gray-900 cursor-pointer">
            Add new card
        </div>
    </div>
</template>

<script>
import CardItem from './CardItem';
import addCard from './../graphql/AddCard.gql';
export default {
    props:{
        list:Object,
    },
    components:{
        CardItem
    },
    methods:{
        addCard()
        {
            this.$apollo.mutate({
                mutation: addCard,
                variables:{
                    title: 'my title',
                    list_id: this.list.id,
                    owner_id: 1,
                    order: 8
                }
            });
        }
    }
}
</script>

<style scoped>
    .list{
        min-width: 250px;
        width: 250px;
    }
</style>
