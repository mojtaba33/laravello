<template>
    <div>
        <loading class="w-4 h-4" v-if="loading"></loading>
        <svg @click="deleteBoard" v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 cursor-pointer  text-gray-200 hover:text-white">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </div>
</template>
<script>
import deleteBoard from './../graphql/DeleteBoard.gql';
import {BOARD_DELETED_EVENT} from './../query-events';
export default {
    props:['id'],
    data:() => ({
        loading: false,
    }),
    methods: {
        async deleteBoard()
        {
            this.loading = true;
            try {
                await this.$apollo.mutate({
                    mutation : deleteBoard,
                    variables : {
                        id : Number(this.id),
                    },
                    update: (store,{data:{deleteBoard}}) =>
                    {
                        this.$emit('deleted',{
                            store,
                            type : BOARD_DELETED_EVENT,
                            board:deleteBoard,
                        });
                    }
                });
            } catch (error) {

            }
            this.loading = false;
        }
    },
}
</script>
