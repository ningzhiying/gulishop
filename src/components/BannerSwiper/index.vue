<template>
    <div
        class="swiper-container" ref="refName">
        <div class="swiper-wrapper">
            <div
                class="swiper-slide"
                v-for="banner in List"
                :key="banner.id"
            >
                <img :src="banner.imgUrl"/>
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from "swiper/swiper-bundle.min";
import "swiper/swiper-bundle.min.css"
export default {
    name:"BannerSwiper",
    props:{
        List:{
            type:Array,
            required:true
        },
        refName:{
            type:String,
            default:"mySwiper"
        }
    },
    methods:{
        bannerSwiper(){
             new Swiper(this.$refs.refName, {
                // autoplay: true, //可选选项，自动滑动
                autoplay: {
                    delay: 2000, // 时间间隔
                    pauseOnMouseEnter: true, // 鼠标移入暂停,移出继续
                    disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay。默认为true：停止。如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay。操作包括触碰(touch)，拖动，点击pagination等。
                },
                loop: true, // 循环模式选项
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                },
                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            })
        }
    },
    watch:{
        List:{
            handler(newVal){
                if(newVal && newVal.length){
                    this.$nextTick(()=>{
                        this.bannerSwiper()
                    })
                }
            },
            immediate:true
        }
    }
}

</script>

<style scoped>

</style>