<template>
    <BannerSwiper :List="skuImageList" :options="options" >
        <template #default>
                <div class="swiper-wrapper">
                    <div class="swiper-slide"
                         v-for="(skuImg,index) in skuImageList"
                         :key="skuImg.id"
                    >
                        <img :src="skuImg.imgUrl" @click="getIndex(index)" />
                    </div>
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
        </template>
    </BannerSwiper>
</template>
<script>

export default {
    name: "ImageListCom",
    props: {
        skuImageList:{
            type:Array,
            required:true
        }
    },
    mounted() {
        console.log(this.skuImageList)
    },
    data() {
        return {
            options: {
                // 抽离出配置项
                slidesPerView: 2, // 每页显示几个 slide
                slidesPerGroup: 2, // 一次翻页翻几个 slide
                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            }
        }
    },
    methods:{
        getIndex(index){
            this.$bus.$emit("switchPictures",index)
        }
    }
}
</script>

<style lang="less" scoped>
.swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
        width: 56px;
        height: 56px;

        img {
            width: 100%;
            height: 100%;
            border: 1px solid #ccc;
            padding: 2px;
            width: 50px;
            height: 50px;
            display: block;

            &.active {
                border: 2px solid #f60;
                padding: 1px;
            }

            &:hover {
                border: 2px solid #f60;
                padding: 1px;
            }
        }
    }

    .swiper-button-next {
        left: auto;
        right: 0;
    }

    .swiper-button-prev {
        left: 0;
        right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
        box-sizing: border-box;
        width: 12px;
        height: 56px;
        background: rgb(235, 235, 235);
        border: 1px solid rgb(204, 204, 204);
        top: 0;
        margin-top: 0;
        &::after {
            font-size: 12px;
        }
    }
}
</style>