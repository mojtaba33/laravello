<template>
    <div v-on-clickaway="cancel">
        <textarea ref="editor"
            @input="$emit('input',$event.target.value)" :value="value"
            @keyup.esc="cancel"
            @keydown.enter="save"
            class="bg-white hover:text-black text-gray-900 p-2 mt-2 border-none resize-none outline-none rounded-md shadow-sm text-sm w-full focus:shadow-md transition-all"
            placeholder="Enter a title"
            ></textarea>
        <div class="flex justify-start items-center">
            <button @click.prevent="save" class="bg-indigo-800 hover:bg-indigo-700 text-white py-1 px-2 mt-1 rounded-sm border-none outline-none focus:outline-none">{{ label }}</button>
            <span @click="cancel" class="bg-transparent hover:text-gray-600 mt-1 ml-1 text-gray-500 cursor-pointer rounded-sm p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </span>
        </div>
    </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
export default {
    props:['value','label'],
    mounted() {
        this.$refs.editor.focus();
    },
    methods: {
        save()
        {
            this.$emit('save');
        },
        cancel()
        {
            this.$emit('cancel');
        }
    },
    directives: {
        onClickaway: onClickaway,
    },
}
</script>
