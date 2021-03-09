<template>
    <div class="width">
        <div @click="showEditor = true" v-if="!showEditor" class="text-white p-2 rounded-sm shadow-md box cursor-pointer flex justify-start items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add new list</span>
        </div>
        <CardEditor label="Add list" v-if="showEditor" @cancel="showEditor = false" class="-mt-2"></CardEditor>
    </div>
</template>

<script>
import CardEditor from './CardEditor';
export default {
    components:
    {
        CardEditor,
    },
    data:() => ({
        showEditor: false,
    })
}
</script>

<style scoped>
    .box{
        background-color: rgba(0, 0, 0, 0.3);
    }
    .box:hover{
        background-color: rgba(0, 0, 0, 0.2);
    }
    .width{
        min-width: 250px;
        width: 250px;
    }
</style>
