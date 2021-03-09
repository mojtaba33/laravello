<template>
    <div class="width">
        <loading v-if="loading" class="w-6 h-6 m-auto"></loading>
        <div @click="showEditor = true" v-if="!showEditor && !loading" class="text-white p-2 rounded-sm shadow-md box cursor-pointer flex justify-start items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add new list</span>
        </div>
        <CardEditor @save="createList" :value="title" @input="title = $event" label="Add list" v-if="showEditor && !loading" @cancel="showEditor = false" class="-mt-2 bg-gray-200 p-2 rounded-sm"></CardEditor>
    </div>
</template>

<script>
import CardEditor from './CardEditor';
import CreateListQuery from './../graphql/CreateList.gql';
import {LIST_ADDED_EVENT} from './../query-events';
export default {
    props:['boardId'],
    components:
    {
        CardEditor
    },
    data:() => ({
        showEditor: false,
        title: null,
        loading:false,
    }),
    methods: {
        async createList()
        {
            this.loading = true;
            try {
                await this.$apollo.mutate({
                    mutation : CreateListQuery,
                    variables:{
                        title: this.title,
                        board_id: Number(this.boardId)
                    },
                    update:(store,{data:{createList}}) => {
                        this.$emit('list-added',{
                            store,
                            type: LIST_ADDED_EVENT,
                            list: createList,
                        });
                    }
                });
                this.showEditor = false;
            } catch (error) {

            }
            this.loading = false;
            this.title = null;
        }
    },
}
</script>

<style scoped>
    .box{
        background-color: rgba(0, 0, 0, 0.3);
    }
    .box:hover{
        background-color: rgba(0, 0, 0, 0.2);
    }
    .width{
        min-width: 250px;
        width: 250px;
    }
</style>
