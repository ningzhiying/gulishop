<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container" >
            <div
                class="nav-left"
                @mouseenter="isShow=true"
                @mouseleave="hideCategorys"
            >
                <h2 class="all">全部商品分类</h2>
                <transition name="sort">
                    <div class="sort" v-if="isShow" @click="toSearch">
                        <div class="all-sort-list2">
                            <div
                                v-for="(category,index) in baseCategoryList"
                                :key="category.categoryId"
                                :class="{'item-on':index === currentIndex}"
                                @mouseenter="showCategorys(index)"
                                class="item">
                                <h3>
                                    <a
                                        href="javaScript:;"
                                        :data-category1Id="category.categoryId"
                                        :data-categoryName="category.categoryName"
                                    >{{ category.categoryName }}</a>
                                </h3>
                                <div class="item-list clearfix">
                                    <div class="subitem">
                                        <dl
                                            v-for="category2 in category.categoryChild"
                                            :key="category2.categoryId"
                                            class="fore"
                                        >
                                            <dt>
                                                <a
                                                    href="javaScript:;"
                                                    :data-category2Id="category2.categoryId"
                                                    :data-categoryName="category2.categoryName"
                                                >{{ category2.categoryName }}</a>
                                            </dt>
                                            <dd>
                                                <em
                                                    v-for="category3 in category2.categoryChild"
                                                    :key="category3.categoryId"
                                                >
                                                    <a
                                                        href="javaScript:;"
                                                        :data-category3Id="category3.categoryId"
                                                        :data-categoryName="category3.categoryName"
                                                    >{{ category3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex"
import throttle from "lodash/throttle.js"

export default {
    name: "TypeNav",
    data() {
        return {
            currentIndex: -1,
            isShow: false
        }
    },
    beforeMount() {
        this.isShow = this.$route.path === "/home"
    },
    methods: {
        showCategorys: throttle(function (index) {
            this.currentIndex = index
        }, 50, {"trailing": false}),

        hideCategorys() {
            this.currentIndex = -1
            if (this.$route.path !== "/home") {
                this.isShow = false
            }
        },
        toSearch(event) {
            const {
                categoryname,
                category3id,
                category1id,
                category2id
            } = event.target.dataset
            if (categoryname) {
                const query = {categoryName: categoryname}
                category1id ? query.category1id = category1id : ""
                category2id ? query.category2id = category2id : ""
                category3id ? query.category3id = category3id : ""

                let location = {name: "search", query}
                if (this.$route.params) {
                    location.params = this.$route.params
                }
                console.log(location)
                if(this.$route.path ==="/home"){
                    this.$router.push(location)
                }else {
                    this.$router.replace(location)
                }

            }
        }
    },
    computed: {
        ...mapState({
            baseCategoryList: state => state.home.baseCategoryList
        })
    },
}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                width: 100%;
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: cadetblue;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        box-sizing: border-box;
                        width: 100%;
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                            width: 100%;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &.item-on {
                        background: #7a6e6e;

                        .item-list {
                            display: block;
                        }
                    }

                }
            }
        }

        .sort-enter {
            height: 0;
            opacity: 0;
        }

        .sort-enter-to {
            height: 461px;
            opacity: 1;
        }

        .sort-enter-active {
            transition: all 1s;
        }
    }
}


</style>