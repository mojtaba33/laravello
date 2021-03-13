<template>
    <div>
        <NavBar></NavBar>
        <loading v-if="loading" class="m-auto mt-5 w-8 h-8"></loading>
        <div v-else class="md:w-3/4 w-full m-auto my-10">
            <div>
                <h1 class="md:text-2xl text-lg text-gray-700 font-bold ml-2">Boards : </h1>
                <div class="flex justify-start items-stretch flex-wrap mt-5">
                    <div class="lg:w-1/5 lg:h-36 md:w-1/3 md:h-28 w-1/2 h-24 flex justify-center items-center" v-for="(board,i) in userBoards" :key="i">
                        <div :class="[colorMap500[board.color]]" class="w-11/12 h-5/6 flex justify-center items-center shadow-md rounded-sm relative" id="title-holder">
                            <div class="absolute right-2 top-2 cursor-pointer z-10">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 title">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <router-link :to="{name:'board',params:{id:board.id}}" class="title block">{{ board.title }}</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from './../components/Nav';
import BodyClass from './../mixins/class';
import userBoards from './../graphql/userBoards.gql';
import { mapState } from 'vuex';
import {colorMap500} from './../utility';
export default {
    mixins:[BodyClass],
    apollo:{
        userBoards:{
            query:userBoards,
            variables(){
                return {
                    owner_id: Number(this.userId),
                }
            },
            error (error) {
                this.$route.name != 'not-found' ? this.$router.push({name:'not-found'}) : '';
            }
        }
    },
    components:{
        NavBar
    },
    computed:{
        ...mapState({
            userId: state => state.auth.user.id,
        }),
        loading(){
            return this.$apollo.queries.userBoards.loading;
        }
    },
    data:() => ({
        className: ["bg-gray-100"],
        navClass: ['bg-blue-600','shadow-lg'],
        colorMap500:colorMap500
    }),
    mounted()
    {
        document.querySelector('#nav-bar').classList.remove('header');
        document.querySelector('#nav-bar').classList.add(...this.navClass);
    },
    beforeDestroy() {
        document.querySelector('#nav-bar').classList.add('header');
        document.querySelector('#nav-bar').classList.remove(...this.navClass);
    }
}
</script>

<style scoped>
.title{
    color: rgba(255, 255, 255, 0.7);
}
#title-holder:hover > .title{
    color: rgba(255, 255, 255, 0.9);
}
</style>
