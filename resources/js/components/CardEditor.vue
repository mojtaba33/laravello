<template>
    <div>
        <textarea ref="editor"
            @input="$emit('input',$event.target.value)" :value="value"
            @keyup.esc="cancel"
            @keydown.enter="save"
            class="bg-white hover:text-black text-gray-900 p-2 mt-2 border-none resize-none outline-none rounded-md shadow-sm text-sm w-full focus:shadow-md transition-all"
            placeholder="Enter a title for this card"
            ></textarea>
        <button @click.prevent="save" class="bg-indigo-800 hover:bg-indigo-700 text-white py-1 px-2 mt-1 rounded-sm border-none outline-none focus:outline-none">{{ label }}</button>
        <span @click="cancel" class="bg-gray-300 hover:text-gray-600 text-gray-500 cursor-pointer px-3 rounded-sm shadow-sm font-bold py-1 text-lg">x</span>
    </div>
</template>

<script>
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
}
</script>
