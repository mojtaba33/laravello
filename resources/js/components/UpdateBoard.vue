<template>
    <div>
        <svg @click="show = true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 cursor-pointer  text-gray-200 hover:text-white">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
        </svg>
        <BoardModal
            :show="show"
            @closed="show = false"
            @save="update"
            :title="title"
            @input-title="title = $event"
            :bgColor="bgColor"
            @input-bgColor="bgColor = $event"
            :errors="errors"

            :titleErrors = "titleErrors"
            :colorErrors = "colorErrors"
            :loading = "loading"
            label="save"
        ></BoardModal>
    </div>
</template>

<script>
import BoardModal from './BoardModal';
import updateBoardQuery from './../graphql/updateBoard.gql';
import {gqlError} from './../utility';
import {BOARD_UPDATED_EVENT} from './../query-events';
import error from './../mixins/errors';
export default {
    props:['id','boardTitle','boardColor'],
    mixins:[error],
    components:{
        BoardModal
    },
    data(){
        return{
            title: this.boardTitle,
            bgColor: this.boardColor,
            loading: false,
            show : false
        }
    },
    computed:{
        titleErrors(){
            return this.inputHasErr('input.title');
        },
        colorErrors(){
            return this.inputHasErr('input.color');
        }
    },
    methods: {
        async update()
        {
            this.errors = null;
            this.validationErr = null;
            this.loading = true;
            try {
                await this.$apollo.mutate({
                    mutation: updateBoardQuery,
                    variables: {
                        id: Number(this.id),
                        title: this.title,
                        color: this.bgColor,
                    },
                    update:(store,{data:{updateBoard}}) => {
                        this.$emit('board-updated',{
                            store,
                            type:BOARD_UPDATED_EVENT,
                            board:updateBoard
                        });
                    }
                });
                this.show = false;
            } catch (error) {
                this.errorHandler(gqlError(error));
            }
            this.loading = false;
        }
    },
}
</script>
