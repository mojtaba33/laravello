<template>
    <div class="group bg-white hover:text-black text-gray-900 p-2 mt-2 rounded-sm shadow-sm text-sm
    w-full cursor-default hover:shadow-md flex justify-between transition-all ease-out duration-500">
        {{ card.title }}
        <div class="flex justify-end opacity-0 group-hover:opacity-100 transition-all ease-out duration-500">
            <div class="mr-1 font-bold text-gray-400 cursor-pointer hover:text-yellow-500">U</div>
            <div class="font-bold text-gray-400 cursor-pointer hover:text-red-500" @click="deleteCard">D</div>
        </div>
    </div>
</template>
<script>
import { CARD_DELETED_EVENT } from '../query-events';
import deleteCardQuery from './../graphql/DeleteCard.gql'
export default {
    props:{
        card:Object
    },
    methods: {
        deleteCard()
        {
            this.$apollo.mutate({
                mutation: deleteCardQuery,
                variables: {
                    id: this.card.id
                },
                update:(store,{data:{deleteCard}})=>{
                    this.$emit('card-deleted',{
                        card : deleteCard,
                        store,
                        type:CARD_DELETED_EVENT
                    });
                }
            });
        }
    },
}
</script>
