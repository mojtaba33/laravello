<template>
    <div>
        <div v-if="!loading">
            <CardEditor v-model="title" @save="addCard" @cancel="closeEditor"></CardEditor>
        </div>
        <div v-else>
            <loading class="w-5 h-5 mt-2"></loading>
        </div>
    </div>
</template>
<script>
import CardEditor from './CardEditor';
import addCard from './../graphql/AddCard.gql';
import {CARD_ADDED_EVENT} from './../query-events'
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
    methods:{
        async addCard()
        {
            this.loading = true;
            await this.$apollo.mutate({
                mutation: addCard,
                variables:{
                    title: this.title,
                    list_id: this.list.id,
                    owner_id: 1,
                    order: this.list.cards.length + 1
                },
                update: (store , { data : { addCard } }) => {
                    this.$emit("card-added",{
                        addCard,store,type: CARD_ADDED_EVENT
                    });
                }
            });
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
