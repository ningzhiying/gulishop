<template>
    <div class="spec-preview">
        <img ref="mainImage" :src="mainImage.imgUrl"/>
        <div class="event"
             @mouseenter="isShow = true"
             @mouseleave="isShow = false"
             @mousemove="mouseMove"
             ref="eventRef"
        ></div>
        <div  class="big" v-show="isShow">
            <img ref="bigImg" :src="mainImage.imgUrl"/>
        </div>
        <div ref="maskRef" class="mask" v-show="isShow"></div>
    </div>
</template>

<script>
export default {
    name: "ZoomCom",
    props: {
        skuImageList: {
            type: Array,
            default: () => ([])
        }
    },
    data() {
        return {
            isShow: false
        }
    },
    mounted() {
        this.$bus.$on("switchPictures",this.switchPictures)
    },
    computed: {
        mainImage() {
            return this.skuImageList[0] || {}
        }
    },
    methods:{
        mouseMove(e){
            console.dir(this.$refs.maskRef.offsetWidth)
            let endX = e.offsetX - this.$refs.maskRef.clientWidth/2
            let endY = e.offsetY - this.$refs.maskRef.clientHeight/2

            if(endX<0){
                endX = 0;
            }else if(endX>this.$refs.eventRef.clientWidth/2){
                endX=this.$refs.eventRef.clientWidth/2
            }
            if(endY<0){
                endY = 0;
            }else if(endY>this.$refs.eventRef.clientHeight/2){
                endY=this.$refs.eventRef.clientHeight/2
            }
            this.$refs.maskRef.style.left = endX+"px"
            this.$refs.maskRef.style.top = endY+"px"
            this.$refs.bigImg.style.left =(-endX*2)+ "px"
            this.$refs.bigImg.style.top =(-endY*2)+ "px"
        },
        switchPictures(src){
            this.$refs.bigImg.src=src
            this.$refs.mainImage.src=src
        }
    }
}
</script>

<style lang="less">
.spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
        width: 100%;
        height: 100%;
    }

    .event {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 998;
    }

    .mask {
        width: 50%;
        height: 50%;
        background-color: rgba(0, 255, 0, 0.3);
        position: absolute;
        left: 0;
        top: 0;
    }

    .big {
        width: 100%;
        height: 100%;
        position: absolute;
        top: -1px;
        left: 100%;
        border: 1px solid #aaa;
        overflow: hidden;
        z-index: 998;
        background: white;
        img {
            width: 200%;
            max-width: 200%;
            height: 200%;
            position: absolute;
            left: 0;
            top: 0;
        }
    }
}
</style>