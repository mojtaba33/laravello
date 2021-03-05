<template>
    <div>
        <div v-if="!showEditor" class="group bg-white hover:text-black text-gray-900 p-2 mt-2 rounded-sm shadow-card text-sm
        w-full cursor-default hover:shadow-md flex justify-between transition-all ease-out duration-500">
            {{ card.title }}
            <div v-if="card.owner.id == userId" class="flex justify-end opacity-0 group-hover:opacity-100 transition-all ease-out duration-500">
                <div @click="showEditor = true" class="mr-1 font-bold text-gray-400 cursor-pointer hover:text-yellow-500">U</div>
                <div class="font-bold text-gray-400 cursor-pointer hover:text-red-500" @click="deleteCard">D</div>
            </div>
        </div>
        <CardUpdateEditor
            v-if="showEditor" @close-editor="showEditor = false" :card="card"
            @card-updated="$emit('card-updated')"
        ></CardUpdateEditor>
    </div>
</template>
<script>
import { CARD_DELETED_EVENT } from '../query-events';
import deleteCardQuery from './../graphql/DeleteCard.gql';
import CardUpdateEditor from './CardUpdateEditor';
import {mapState} from 'vuex';
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

        }
    },
}
</script>
