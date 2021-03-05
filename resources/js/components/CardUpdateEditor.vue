<template>
    <div>
        <div v-if="!loading">
            <CardEditor v-model="title" @save="updateCard" @cancel="closeEditor" label="Save Card"></CardEditor>
        </div>
        <div v-else>
            <loading class="w-5 h-5 mt-2 mx-auto"></loading>
        </div>
    </div>
</template>
<script>
import CardEditor from './CardEditor';
import UpdateCard from './../graphql/UpdateCard.gql';
import {CARD_UPDATED_EVENT} from './../query-events'
export default {
    props:{
        card:Object
    },
    components:{
        CardEditor
    },
    mounted() {
        this.title = this.card.title
    },
    data:()=>({
        title : null,
        loading : false
    }),
    methods:{
        async updateCard()
        {
            try {
                this.loading = true;
                await this.$apollo.mutate({
                    mutation: UpdateCard,
                    variables:{
                        id: this.card.id,
                        title: this.title
                    },
                    update: (store , { data : { updateCard } }) => {
                        this.$emit("card-updated",{
                            card:updateCard,
                            store,
                            type: CARD_UPDATED_EVENT
                        });
                    }
                });
                this.closeEditor();
                this.title = null;
                this.loading = false;
            } catch (error) {

            }

        },
        closeEditor()
        {
            this.$emit('close-editor');
        }
    }
}
</script>
