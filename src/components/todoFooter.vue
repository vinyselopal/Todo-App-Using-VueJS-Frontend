<script>
export default {
    data () {
        return{}
    },
    methods: {
        clearAll() {
            this.$emit("clearAll")
        },
        clearDone() {
            this.$emit('clearDone')
        }
    }
}
</script>
<template>
<div class="footerDiv">
    <input type="button" value="clearAll" class="clearAll" @click="clearAll">
    <input type="button" value="clearDone" class="clearDone" @click="clearDone">
    </div>
</template>