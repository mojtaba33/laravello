<template>
    <div>
        <div v-if="!showEditor" class="group bg-white hover:text-black text-gray-900 p-2 mt-2 rounded-sm shadow-card text-sm
        w-full cursor-default hover:shadow-md flex justify-between transition-all ease-out duration-500"
        @drop='onDrop($event)' @dragover.prevent @dragenter.prevent
        draggable @dragstart='startDrag($event, card)'>
            {{ card.title }}
            <div v-if="card.owner.id == userId" class="flex justify-end opacity-0 group-hover:opacity-100 transition-all ease-out duration-500">
                <div @click="showEditor = true" class="mr-1 font-bold text-gray-400 cursor-pointer hover:text-yellow-500 flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </div>
                <div class="font-bold text-gray-400 cursor-pointer hover:text-red-500 flex justify-center items-center" @click="deleteCard">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
            </div>
        </div>
        <CardUpdateEditor
            v-if="showEditor" @close-editor="showEditor = false" :card="card"
            @card-updated="$emit('card-updated')"
        ></CardUpdateEditor>
    </div>
</template>
<script>
import { CARD_DELETED_EVENT,CARD_ORDER_EVENT } from '../query-events';
import deleteCardQuery from './../graphql/DeleteCard.gql';
import changeCardOrder from './../graphql/ChangeCardOrder.gql';
import CardUpdateEditor from './CardUpdateEditor';
import {mapState} from 'vuex';
import { gqlError } from '../utility';
export default {
    props:{
        card:Object
    },
    data:() => ({
        showEditor:false,
    }),
    components:{
        CardUpdateEditor
    },
    computed: {
       ...mapState({
           userId : state => state.auth.user.id,
       })
    },
    methods: {
        async deleteCard()
        {
            try {
                await this.$apollo.mutate({
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
            } catch (error) {

            }
        },
        startDrag: (evt, card) => {
            evt.dataTransfer.dropEffect = 'move';
            evt.dataTransfer.effectAllowed = 'move';
            evt.dataTransfer.setData('dragedCard', JSON.stringify(card));
        },
        onDrop (evt) {
            const dragedCard = JSON.parse(evt.dataTransfer.getData('dragedCard'));
            if(dragedCard.list.id == this.card.list.id)
            {
                this.updateCardOrder(this.card,dragedCard.order);
                this.updateCardOrder(dragedCard,this.card.order);
            }
        },
        async updateCardOrder(card,newOrder)
        {
            try {
                this.$apollo.mutate({
                    mutation: changeCardOrder,
                    variables: {
                        id: card.id,
                        order: newOrder
                    },
                    update:(store,{data:{changeCardOrder}})=>{
                        this.$emit('card-order',{
                            card : changeCardOrder,
                            store,
                            type:CARD_ORDER_EVENT
                        });
                    },
                    optimisticResponse: {
                        __typename: 'Mutation',
                        changeCardOrder: {
                            __typename: 'Card',
                            id: card.id,
                            title: card.title,
                            order: newOrder
                        },
                    },
                });
            } catch (error) {
                gqlError(error);
            }

        }
    },
}
</script>
