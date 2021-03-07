<template>
        <div>
            <button class="header-btn" @click.prevent="show = !show">Boards</button>
            <transition name="fade">
                <div v-if="show" v-on-clickaway="close" class="px-2 w-64 absolute rounded-sm bg-gray-100 top-8 z-10 shadow-md overflow-y-auto">

                    <router-link :to="{name:'board',params:{id:board.id}}" active-class="border-2 border-gray-400" @click.native="show = false" v-for="(board,i) in userBoards" :key="`board-d-${i}`" :class="colorMap100[board.color]" class="text-gray-700 my-2 flex justify-start items-center rounded-sm cursor-pointer">
                        <div class="w-8 h-8 rounded-sm rounded-r-none" :class="colorMap200[board.color]"></div>
                        <div class="ml-2 text-xs font-bold">{{ board.title }}</div>
                    </router-link>

                </div>
            </transition>
        </div>
</template>
<script>
import userBoards from './../graphql/userBoards.gql';
import {mapState} from 'vuex';
import {colorMap100,colorMap200} from './../utility';
import { directive as onClickaway } from 'vue-clickaway';
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
    data:()=>({
        show:false,
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
            this.show = false;
        }
    },
}
</script>
