<template>
    <modal v-if="show" @closed="close">
        <loading v-if="loading" class="w-10 h-10 "></loading>
        <div v-else class="2xl:w-1/4 md:w-1/3 w-1/2 bg-transparent">
            <div class="flex lg:justify-start lg:items-stretch lg:flex-row flex-col justify-start items-start">
                <div class="p-5 rounded-sm w-full lg:w-2/3 m-1" :class="[colors[bgColor]]">
                    <input type="text" @input="$emit('input-title',$event.target.value)" :value="title" @keyup.enter="save" @keyup.esc="close" class="bg-input w-full text-white placeholder-white text-sm rounded-sm px-2 py-1 focus:outline-none" placeholder="Enter board title">
                    <div v-for="(err,i) in titleErrors" :key="`err-${i}`" class="text-xs mt-1 opacity-75 text-white">{{ err }}</div>
                    <div v-for="(err,i) in colorErrors" :key="`err-${i}`" class="text-xs mt-1 opacity-75 text-white">{{ err }}</div>
                </div>
                <div class="m-1 flex flex-wrap justify-start items-center w-full lg:w-1/3">
                    <div class="w-8 h-8 mr-1 mb-1 rounded-sm relative" :class="[className]" v-for="(className,color) in colors" :key="`color-${color}`">
                        <input type="radio" :value="color" :checked="bgColor == color" @input="$emit('input-bgColor',$event.target.value)" class="bg-transparent absolute opacity-0 top-0 left-0 h-8 w-8 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8 text-white" v-if="color == bgColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="m-1">
                <button :class="[colors[bgColor]]" @click.prevent="save" class="text-white focus:outline-none px-2 py-1 text-sm rounded-sm hover:opacity-80">{{ label }}</button>
            </div>
        </div>
    </modal>
</template>

<script>
import {colorMap500} from './../utility';
export default {
    props:{
        show:Boolean,
        title: String,
        bgColor: String,
        titleErrors:{
            type: [Array,Object,String,Boolean],
            default:false,
        },
        colorErrors:{
            type: [Array,Object,String,Boolean],
            default:false,
        },
        loading:{
            Boolean,
            default : false,
        },
        label:String,
    },
    data:() => ({
        colors : colorMap500,
    }),
    methods: {
        save()
        {
            this.$emit("save");
        },
        close()
        {
            this.$emit('closed');
        }
    },
}
</script>

<style scoped>
.bg-input{
    background-color: rgba(255,255,255,0.1);
}
.bg-input:hover,.bg-input:focus{
    background-color: rgba(255,255,255,0.2);
}
</style>
