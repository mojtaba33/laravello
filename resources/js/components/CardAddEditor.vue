<template>
    <div>
        <div v-if="!loading">
            <CardEditor v-model="title" @save="addCard" @cancel="closeEditor" label="Add Card"></CardEditor>
        </div>
        <div v-else>
            <loading class="w-5 h-5 mt-2 mx-auto"></loading>
        </div>
    </div>
</template>
<script>
import CardEditor from './CardEditor';
import addCard from './../graphql/AddCard.gql';
import {CARD_ADDED_EVENT} from './../query-events';
import {mapState} from 'vuex';
export default {
    props:{
        list:Object,
    },
    components:{
        CardEditor
    },
    data:()=>({
        title:null,
        loading:false
    }),
    computed: {
        ...mapState({
            userId : state => state.auth.user.id,
        })
    },
    methods:{
        async addCard()
        {
            this.loading = true;
            try {
                await this.$apollo.mutate({
                    mutation: addCard,
                    variables:{
                        title: this.title,
                        list_id: this.list.id,
                        owner_id: this.userId,
                        order: this.list.cards.length + 1
                    },
                    update: (store , { data : { addCard } }) => {
                        this.$emit("card-added",{
                            addCard,store,type: CARD_ADDED_EVENT
                        });
                    }
                });
            } catch (error) {

            }
            this.closeEditor();
            this.title = null;
            this.loading = false;
        },
        closeEditor()
        {
            this.$emit('close-editor');
        }
    }
}
</script>
