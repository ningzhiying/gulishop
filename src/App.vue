<template>
    <div id="app">
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
    name: "App",
    components: {
        Header,
        Footer
    },
    mounted(){
        this.$store.dispatch("get_base_category_list")
    }

}
</script>

<style scoped>

</style>