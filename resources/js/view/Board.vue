<template>
    <div class="h-screen flex flex-col justify-start items-stretch">
        <NavBar></NavBar>
        <loading v-if="$apollo.queries.board.loading" class="w-8 h-8 mt-5 mx-auto"></loading>
        <section v-else class=" p-3 flex flex-col justify-start items-stretch pb-0 h-full overflow-y-auto">
            <h1 class="text-white font-bold text-lg mb-2 cursor-default">{{ board.title }}</h1>
            <div class="flex justify-start overflow-x-auto  items-start pb-5 h-full">

                <List v-for="list in board.lists" :key="`list-${list.id}`" :list="list"
                    @card-added="updateQueryCache"
                    @card-deleted="updateQueryCache"
                ></List>

                <AddList :boardId="board.id" @list-added="updateQueryCache"></AddList>

            </div>

        </section>
    </div>
</template>
<script>
import BoardQuery from './../graphql/BoardWithListsAndCards.gql';
import List from './../components/List';
import AddList from './../components/AddList';
import { CARD_ADDED_EVENT, CARD_DELETED_EVENT, CARD_UPDATED_EVENT ,LIST_ADDED_EVENT} from '../query-events';
import NavBar from './../components/Nav';
import {colorMap500} from './../utility.js';
export default {
    apollo:{
        board:{
            query:BoardQuery,
            variables(){
                return {
                    id: Number(this.$route.params.id)
                }
            },
            result(ApolloQueryResult)
            {
                const boardColor = ApolloQueryResult.data.board.color;
                this.className = colorMap500[boardColor] || "bg-purple-500";
                this.$store.dispatch("addBodyClass",{
                    class : [this.className]
                });
            }
        }
    },
    data:() => ({
        board:null,
        className: "bg-purple-500",
    }),
    components:{
        List,NavBar,AddList
    },
    methods: {
        updateQueryCache(event)
        {
            const data = event.store.readQuery({
                query: BoardQuery,
                variables: {
                    id: Number(this.$route.params.id),
                },
            });

            const list = data.board.lists.find( list => list.id == event?.list_id );

            switch (event.type) {
                case CARD_ADDED_EVENT:
                    list.cards.push(event.addCard);
                    break;
                case CARD_DELETED_EVENT:
                    list.cards = list.cards.filter( card => card.id != event.card.id );
                    break;
                case CARD_UPDATED_EVENT:
                    let card = list.cards.find(card => card.id == event.card.id);
                    card.title = event.card.title;
                    break;
                case LIST_ADDED_EVENT:
                    data.board.lists.push(event.list);
                    break;
            }

            event.store.writeQuery({
                query: BoardQuery ,
                data,
                variables: {
                    id: Number(this.$route.params.id),
                },
            });
        }
    },
    destroyed() {
        this.$store.dispatch("removeBodyClass",{
            class : [this.className]
        });
    },
    beforeRouteUpdate (to, from, next) {
        this.$store.dispatch("removeBodyClass",{
            class : [this.className]
        });
        next();
    }
}
</script>
