<template>
    <transition name="fade">
        <div class="fixed top-0 left-0 h-full w-full z-30 modal-bg" @click.self="close">
            <div class="w-full h-full flex justify-center items-center bg-transparent" @click.self="close">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    methods: {
        close()
        {
            this.$emit('closed');
        }
    },
}
</script>

<style scoped>
    .modal-bg{
        background-color: rgba(0,0,0,0.7);
    }
</style>
