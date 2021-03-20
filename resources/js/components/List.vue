<template>
    <div class="list">
        <loading v-if="loading" class="w-5 h-5 m-auto"></loading>
        <div v-else class="bg-gray-200 p-2 rounded-sm shadow-md mr-3 ">
            <div class="flex justify-between items-center w-full ">
                <h3 class="text-black font-bold text-sm cursor-default">{{ list.title }}</h3>
                <span @click="deleteList" v-if="isBoardOwner" class="text-gray-400 font-bold text-md hover:text-gray-500 p-1 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>
            </div>

            <CardItem v-for="card in orderCards" :key="`card-${card.id}`" :card="card"
                @card-updated="$emit('card-updated',{...$event,list_id:list.id})"
                @card-deleted="$emit('card-deleted',{...$event,list_id:list.id})"
                @card-order="$emit('card-order',{...$event,list_id:list.id})"
            ></CardItem>

            <div v-if="!showCardEditor && isBoardOwner" @click="showCardEditor = true;" class="w-auto p-1 flex justify-start items-center mt-2 rounded-sm bg-transparent text-gray-600 text-left text-sm hover:text-gray-900 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add new card</span>
            </div>
            <div v-if="showCardEditor">
                <CardAddEditor :list="list" :highestOrder="highestOrder" @close-editor="showCardEditor = false"  @card-added="$emit('card-added',{...$event,list_id:list.id})"></CardAddEditor>
            </div>

        </div>
    </div>
</template>

<script>
import CardItem from './CardItem';
import CardAddEditor from './CardAddEditor';
import {mapState} from 'vuex';
import deleteList from './../graphql/deleteList.gql';
import {LIST_DELETED_EVENT} from './../query-events';
export default {
    props:{
        list:Object,
    },
    data:()=>({
        showCardEditor : false,
        loading:false,
    }),
    computed: {
        ...mapState({
            isBoardOwner (state) {
                return state.auth.user.id == this.list.board.owner.id;
            }
        }),
        orderCards()
        {
            return this.list.cards.sort( (a,b) => a.order - b.order );
        },
        highestOrder()
        {
            return this.list.cards.reduce( (a, b) => a.order > b.order ? a.order : b.order );
        }
    },
    components:{
        CardItem,CardAddEditor
    },
    methods: {
        async deleteList()
        {
            this.loading = true;
            try {
                await this.$apollo.mutate({
                    mutation: deleteList,
                    variables:{
                        id: this.list.id
                    },
                    update:(store,{data:{deleteList}}) => {
                        this.$emit('list-deleted',{
                            store,
                            type: LIST_DELETED_EVENT,
                            list: deleteList
                        });
                    }
                });
            } catch (error) {

            }
            this.loading = false;
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
