<template>
    <div>
        <div v-if="!loading">
            <textarea ref="editor" v-model="title" @keyup.esc="closeEditor" @keydown.enter="addCard" class="bg-white hover:text-black text-gray-900 p-2 mt-2 border-none resize-none outline-none rounded-md shadow-sm text-sm w-full focus:shadow-md transition-all" placeholder="Enter a title for this card"></textarea>
            <button @click.prevent="addCard" class="bg-indigo-800 hover:bg-indigo-700 text-white py-1 px-2 mt-1 rounded-sm border-none outline-none focus:outline-none">Add Card</button>
            <span @click="closeEditor" class="bg-gray-300 hover:text-gray-600 text-gray-500 cursor-pointer px-3 rounded-sm shadow-sm font-bold py-1 text-lg">x</span>
        </div>
        <div v-else>
            <loading class="w-5 h-5 mt-2"></loading>
        </div>
    </div>
</template>

<script>
import addCard from './../graphql/AddCard.gql';
import boardQuery from './../graphql/BoardWithListsAndCards.gql';
export default {
    props:{
        list:Object,
    },
    data:()=>({
        title:null,
        loading:false
    }),
    mounted() {
        this.$refs.editor.focus();
    },
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
                    const data = store.readQuery({
                        query: boardQuery,
                        variables: {
                            id: this.$route.params.id,
                        },
                    });

                    data.board.lists.find( list => list.id == this.list.id ).cards.push(addCard);

                    store.writeQuery({ query: boardQuery , data });
                }
            });
            this.closeEditor();
            this.title = null;
            this.loading = false;
        },
        closeEditor()
        {
            this.$emit('close-editor');
        },
        focus()
        {
            this.$refs.editor.focus()
        }
    }
}
</script>
