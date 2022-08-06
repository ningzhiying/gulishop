<template>
    <div class="box">
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <TodayRecommend></TodayRecommend>
        <Rank></Rank>
        <Like></Like>
        <Floor v-for=" floor in floorList" :key="floor.id" :floor="floor"></Floor>
        <Brand></Brand>
    </div>
</template>

<script>


import ListContainer from "@/pages/Home/components/ListContainer";
import TodayRecommend from "@/pages/Home/components/TodayRecommend";
import Rank from "@/pages/Home/components/Rank";
import Like from "@/pages/Home/components/Like";
import Floor from "@/pages/Home/components/Floor";
import Brand from "@/pages/Home/components/Brand";
import {v4 as uuidv4} from "uuid"
const str = uuidv4()
export default {
    name: "HomeCom",
    components: {
        ListContainer,
        TodayRecommend,
        Rank,
        Like,
        Floor,
        Brand
    },
    mounted() {
        this.$store.dispatch("get_home_list")
        this.$store.dispatch("get_banner_list")
        this.$store.dispatch("get_floor_list")

        if (!localStorage.getItem("USERTEMPID_KEY")){
            localStorage.setItem("USERTEMPID_KEY",str)
        }

    },
    computed: {
        floorList() {
            return this.$store.state.home.floorList
        }
    }
}
</script>

<style scoped></style>