<template>
    <div>
        <div class="text-red-400 text-sm" v-for="(error,i) in errors" :key="`err-${i}`">{{ error }}</div>
    </div>
</template>
<script>
export default {
    props:{
        errors:{
            Array,
            default:function () {
                return [];
            }
        }
    }
}
</script>
