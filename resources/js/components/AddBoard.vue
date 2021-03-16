<template>
    <div>
        <BoardModal
            :show="show"
            @closed="close"
            @save="create"
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
import createBoardQuery from './../graphql/CreateBoard.gql';
import {gqlError} from './../utility';
import {BOARD_ADDED_EVENT} from './../query-events';
import error from './../mixins/errors';
export default {
    props:['show'],
    mixins:[error],
    components:{
        BoardModal
    },
    data:() => ({
        title:null,
        bgColor: "red",
        loading: false,
    }),
    computed:{
        titleErrors(){
            return this.inputHasErr('input.title');
        },
        colorErrors(){
            return this.inputHasErr('input.color');
        }
    },
    methods: {
        async create()
        {
            this.errors = null;
            this.validationErr = null;
            this.loading = true;
            try {
                await this.$apollo.mutate({
                    mutation: createBoardQuery,
                    variables: {
                        title: this.title,
                        color: this.bgColor,
                    },
                    update:(store,{data:{createBoard}}) => {
                        this.$emit('board-added',{
                            store,
                            type:BOARD_ADDED_EVENT,
                            board:createBoard
                        });
                    }
                });
                this.close();
            } catch (error) {
                this.errorHandler(gqlError(error));
            }
            this.loading = false;
            this.title = null;
        },
        close()
        {
            this.$emit('closed');
        }
    },
}
</script>
