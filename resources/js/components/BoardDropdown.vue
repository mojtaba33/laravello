<template>
        <div>
            <button class="header-btn" @click.prevent="showBoards = !showBoards">Boards</button>
            <transition name="fade">
                <div v-if="showBoards" v-on-clickaway="close" class="px-2 w-64 absolute rounded-sm bg-gray-100 top-8 z-10 shadow-md overflow-y-auto">

                    <router-link :to="{name:'board',params:{id:board.id}}" active-class="border-2 border-gray-300" @click.native="showBoards = false" v-for="(board,i) in userBoards" :key="`board-d-${i}`" :class="colorMap100[board.color]" class="text-gray-700 my-2 flex justify-start items-center rounded-sm cursor-pointer">
                        <div class="w-8 h-8 rounded-sm rounded-r-none" :class="colorMap200[board.color]"></div>
                        <div class="ml-2 text-xs font-bold">{{ board.title }}</div>
                    </router-link>

                    <div @click="showModal = true" class="text-gray-600 text-sm font-bold py-2 pl-2 my-2 cursor-pointer hover:underline hover:bg-gray-200">Create new board</div>

                </div>
            </transition>
            <BoardModal :show="showModal" @closed="showModal = false"></BoardModal>
        </div>
</template>
<script>
import userBoards from './../graphql/userBoards.gql';
import {mapState} from 'vuex';
import {colorMap100,colorMap200} from './../utility';
import { directive as onClickaway } from 'vue-clickaway';
import BoardModal from './BoardModal';
export default {
    apollo:{
        userBoards:{
            query: userBoards,
            variables(){
                return {
                    owner_id: Number(this.userId)
                }
            },
            skip(){
                return !this.userId;
            }
        }
    },
    components:{
        BoardModal
    },
    data:()=>({
        showBoards:false,
        showModal:false
    }),
    computed:{
        ...mapState({
            userId: state => state.auth.user.id,
        }),
        colorMap100:() => colorMap100,
        colorMap200:() => colorMap200,
    },
    directives: {
        onClickaway: onClickaway,
    },
    methods: {
        close(){
            this.showBoards = false;
        }
    },
}
</script>
