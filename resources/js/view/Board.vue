<template>
    <div class="h-screen bg-green-400 flex flex-col justify-start items-stretch">
        <nav class="flex justify-between bg-green-600 text-white py-1">
            <div class="ml-3">x</div>
            <div class="opacity-70 hover:opacity-100 cursor-pointer">Laravello</div>
            <div class="mr-3">x</div>
        </nav>
        <loading v-if="$apollo.queries.board.loading" class="mt-5"></loading>
        <section v-else class=" p-3 flex flex-col justify-start items-stretch pb-0 h-full overflow-y-auto">
            <h1 class="text-white font-bold text-lg mb-2 cursor-default">{{ board.title }}</h1>
            <div class="flex justify-start overflow-x-auto  items-start pb-5 h-full">

                <List v-for="list in board.lists" :key="`list-${list.id}`" :list="list"></List>

            </div>

        </section>
    </div>
</template>
<script>
import BoardQuery from './../graphql/BoardWithListsAndCards.gql';
import List from './../components/List';
export default {
    apollo:{
        board:{
            query:BoardQuery,
            variables(){
                return {
                    id: this.$route.params.id
                }
            }
        }
    },
    components:{
        List
    }
}
</script>
