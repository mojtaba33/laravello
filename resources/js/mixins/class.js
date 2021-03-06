export default {
    data:() => ({
        className : "",
    }),
    created()
    {
        this.$store.dispatch("addBodyClass",{
            class : this.className
        });
    },
    destroyed() {
        this.$store.dispatch("removeBodyClass",{
            class : this.className
        });
    },
}
