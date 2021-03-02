<template>
    <div>
        <div class="text-sm text-red-400" v-for="(err,i) in error" :key="`valid-err-${i}`">{{ err }}</div>
    </div>
</template>
<script>
export default {
    props:{
        error:{
            Array,
            default:function () {
                return [];
            }
        }
    }
}
</script>
