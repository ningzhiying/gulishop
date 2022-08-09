<template>
    <div>
        <TypeNav></TypeNav>
        <div class="main">
            <div class="py-container">
                <!--bread-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a href="#">全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i
                            @click="deleteCategoryName">×</i></li>
                        <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }} <i
                            @click="deleteKeyword">×</i></li>
                        <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(":")[1] }}<i
                            @click="deleteTrademark">×</i></li>
                        <li class="with-x" v-for="(item,index ) in searchParams.props " :key="index">
                            {{ item.split(":")[1] }}<i
                            @click="deleteParameter(index)">×</i></li>
                    </ul>
                </div>
                <!--selector-->
                <SearchSelector
                    @addPropsHandler="addProps"
                    @changeTrademarkHandler="changeTrademark"
                />
                <!--details-->
                <div class="details clearfix">
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
                            <ul class="sui-nav">
                                <li :class="{active:!Show}">
                                    <a @click=" synthesizeSort">
                                        综合
                                        <i v-if="!Show"
                                           :class="{'iconfont':true,
                                               'icon-jiantou_xiangxia ': synthesize==='desc',
                                               'icon-jiantou_xiangshang ': synthesize==='asc'}"></i>
                                    </a>
                                </li>
                                <li :class="{active:Show}">
                                    <a @click="priceSort">
                                        价格
                                        <i v-if="Show"
                                           :class="{'iconfont':true,
                                            'icon-jiantou_xiangxia ': price==='desc',
                                            'icon-jiantou_xiangshang ': price==='asc'}"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="goods-list">
                        <ul class="yui3-g">
                            <li
                                class="yui3-u-1-5"
                                v-for="goods in goodsList"
                                :key="goods.id"
                            >
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <a @click="JumpToDetail(goods.id)" target="_blank">
                                            <img :src="goods.defaultImg"/>
                                        </a>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥ </em>
                                            <i>{{ goods.price.toFixed(2) }} &nbsp;</i>
                                        </strong>
                                    </div>
                                    <div class="attr">
                                        <a
                                            @click="JumpToDetail(goods.id)"
                                            title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                                        >{{ goods.title }}</a>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有<span>2000</span>人评价</i>
                                    </div>
                                    <div class="operate">
                                        <a href="success-cart.html" target="_blank"
                                           class="sui-btn btn-bordered btn-danger">加入购物车</a>
                                        <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                                    </div>
                                </div>
                            </li>

                        </ul>
                    </div>
                    <div class="fr page">
                        <PaginationCom
                            :total="pages.total"
                            :pageSize="searchParams.pageSize"
                            :pageNo="searchParams.pageNo"
                            :pageCount=5
                            @formFeed="formFeed"
                        ></PaginationCom>
                    </div>
                </div>
                <!--hotsale-->
                <div class="clearfix hot-sale">
                    <h4 class="title">热卖商品</h4>
                    <div class="hot-list">
                        <ul class="yui3-g">
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img
                                            src="http://47.93.148.192:8080/group1/M00/00/01/rBHu8l-rfvmAcbl2AAFopp2WGBQ404.jpg"/>
                                    </div>
                                    <div class="attr">
                                        <em>Apple苹果iPhone 6s (A1699)</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>4088.00</i>
                                        </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有700人评价</i>
                                    </div>
                                </div>
                            </li>
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img
                                            src="http://47.93.148.192:8080/group1/M00/00/01/rBHu8l-rfvmAcbl2AAFopp2WGBQ404.jpg"/>
                                    </div>
                                    <div class="attr">
                                        <em>Apple苹果iPhone 6s (A1699)</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>4088.00</i>
                                        </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有700人评价</i>
                                    </div>
                                </div>
                            </li>
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img
                                            src="http://47.93.148.192:8080/group1/M00/00/01/rBHu8l-rfvmAcbl2AAFopp2WGBQ404.jpg"/>
                                    </div>
                                    <div class="attr">
                                        <em>Apple苹果iPhone 6s (A1699)</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>4088.00</i>
                                        </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有700人评价</i>
                                    </div>
                                </div>
                            </li>
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img
                                            src="http://47.93.148.192:8080/group1/M00/00/01/rBHu8l-rfvmAcbl2AAFopp2WGBQ404.jpg"/>
                                    </div>
                                    <div class="attr">
                                        <em>Apple苹果iPhone 6s (A1699)</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>4088.00</i>
                                        </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有700人评价</i>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import SearchSelector from "@/pages/Search/SearchSelector";

export default {
    name: "SearchCom",
    components: {SearchSelector},
    data() {
        return {
            searchParams: {
                categoryName: '',
                category3Id: "",
                order: "1:desc",
                pageNo: 1,
                pageSize: 5,
                props: [],
                keyword: "",
                trademark: undefined
            },
            Show: false,
            isShow1: false,
            isShow2: false,
            price: "asc",
            synthesize: "desc",
            recordPageNo: 1
        }
    },
    methods: {
        // 获取信息列表
        ...mapActions("search", ['inquire_about_products_handler']),
        //请求参数
        handlerSearchParams() {
            const {categoryName, category1Id, category2Id, category3Id} = this.$route.query
            this.searchParams = {
                ...this.searchParams,
                categoryName,
                category1Id,
                category2Id,
                category3Id
            }
        },
        inquire_about_products(){
          if (this.recordPageNo ===this.searchParams.pageNo){
              this.searchParams.pageNo=1
          }
            this.inquire_about_products_handler(this.searchParams)
            this.recordPageNo = this.searchParams.pageNo;
        },
        //添加配置参数
        addProps(attrs, attrValue) {
            console.log(attrs, attrValue)
            let text = `${attrs.attrId}:${attrValue}:${attrs.attrName}`
            if (!this.searchParams.props.includes(text)) {
                this.searchParams.props.push(text)
            }
        },
        //选择品牌
        changeTrademark(id, name) {
            this.searchParams.trademark = `${id}:${name}`
        },
        //删除三级导航
        deleteCategoryName() {
            this.$router.replace({
                name: "search",
                params: this.$route.params
            })
        },
        //删除下搜索参数
        deleteKeyword() {
            this.$router.replace({
                name: "search",
                query: this.$route.query
            })
            this.$bus.$emit("deleteKeyword")
        },
        //删除品牌参数
        deleteTrademark() {
            this.trademark = null
            this.searchParams.trademark = undefined
        },
        //删除配置参数
        deleteParameter(index) {
            this.searchParams.props.splice(index, 1)
        },
        //综合排序
        priceSort() {
            this.Show = true; //默认综合属性高亮
            this.isShow1 = false //默认降序
            if (this.isShow2) {
                this.isShow2 = false
                this.price = "asc"
            } else {
                this.price = "desc"
                this.isShow2 = true
            }
            this.searchParams.order = `2:${this.price}`
        },
        //价格排序
        synthesizeSort() {
            this.Show = false;
            this.isShow2 = false
            if (this.isShow1) {
                this.isShow1 = false
                this.synthesize = "asc"
            } else {
                this.synthesize = "desc"
                this.isShow1 = true
            }
            this.searchParams.order = `1:${this.synthesize}`
        },
        //换页
        formFeed(val) {
            if (val === this.searchParams.pageNo) {
                return
            }
            this.searchParams.pageNo=val
        },
        //详情
        JumpToDetail(id) {
            this.$router.push("/detail/" + id)
        }
    },
    computed: {
        ...mapGetters("search", ["goodsList", "pages"]),
    },
    watch: {
        //监听路由
        $route: {
            handler() {
                this.searchParams.keyword = this.$route.params.keyword
                this.handlerSearchParams()
            },
            immediate: true,
            deep: true
        },
        //监听参数，请求数据
        searchParams: {
            handler() {
                this.inquire_about_products(this.searchParams.pageNo)
            },
            immediate: true,
            deep: true
        }
    }
}
</script>

<style lang="less" scoped>

.main {
    margin: 10px 0;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .bread {
            margin-bottom: 5px;
            overflow: hidden;

            .sui-breadcrumb {
                padding: 3px 15px;
                margin: 0;
                font-weight: 400;
                border-radius: 3px;
                float: left;

                li {
                    display: inline-block;
                    line-height: 18px;

                    a {
                        color: #666;
                        text-decoration: none;

                        &:hover {
                            color: #4cb9fc;
                        }
                    }
                }
            }

            .sui-tag {
                margin-top: -5px;
                list-style: none;
                font-size: 0;
                line-height: 0;
                padding: 5px 0 0;
                margin-bottom: 18px;
                float: left;

                .with-x {
                    font-size: 12px;
                    margin: 0 5px 5px 0;
                    display: inline-block;
                    overflow: hidden;
                    color: #000;
                    background: #f7f7f7;
                    padding: 0 7px;
                    height: 20px;
                    line-height: 20px;
                    border: 1px solid #dedede;
                    white-space: nowrap;
                    transition: color 400ms;
                    cursor: pointer;

                    i {
                        margin-left: 10px;
                        cursor: pointer;
                        font: 400 14px tahoma;
                        display: inline-block;
                        height: 100%;
                        vertical-align: middle;
                    }

                    &:hover {
                        color: #28a3ef;
                    }
                }
            }
        }

        .selector {
            border: 1px solid #ddd;
            margin-bottom: 5px;
            overflow: hidden;

            .logo {
                border-top: 0;
                margin: 0;
                position: relative;
                overflow: hidden;

                .key {
                    padding-bottom: 87px !important;
                }
            }

            .type-wrap {
                margin: 0;
                position: relative;
                border-top: 1px solid #ddd;
                overflow: hidden;

                .key {
                    width: 100px;
                    background: #f1f1f1;
                    line-height: 26px;
                    text-align: right;
                    padding: 10px 10px 0 15px;
                    float: left;
                }

                .value {
                    overflow: hidden;
                    padding: 10px 0 0 15px;
                    color: #333;
                    margin-left: 120px;
                    padding-right: 90px;

                    .logo-list {
                        li {
                            float: left;
                            border: 1px solid #e4e4e4;
                            margin: -1px -1px 0 0;
                            width: 105px;
                            height: 52px;
                            text-align: center;
                            line-height: 52px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            font-weight: 700;
                            color: #e1251b;
                            font-style: italic;
                            font-size: 14px;

                            img {
                                max-width: 100%;
                                vertical-align: middle;
                            }
                        }
                    }

                    .type-list {
                        li {
                            float: left;
                            display: block;
                            margin-right: 30px;
                            line-height: 26px;

                            a {
                                text-decoration: none;
                                color: #666;
                            }
                        }
                    }
                }

                .ext {
                    position: absolute;
                    top: 10px;
                    right: 10px;

                    .sui-btn {
                        display: inline-block;
                        padding: 2px 14px;
                        box-sizing: border-box;
                        margin-bottom: 0;
                        font-size: 12px;
                        line-height: 18px;
                        text-align: center;
                        vertical-align: middle;
                        cursor: pointer;
                        padding: 0 10px;
                        background: #fff;
                        border: 1px solid #d5d5d5;
                    }

                    a {
                        color: #666;
                    }
                }
            }
        }

        .details {
            margin-bottom: 5px;

            .sui-navbar {
                overflow: visible;
                margin-bottom: 0;

                .filter {
                    min-height: 40px;
                    padding-right: 20px;
                    background: #fbfbfb;
                    border: 1px solid #e2e2e2;
                    padding-left: 0;
                    border-radius: 0;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

                    .sui-nav {
                        position: relative;
                        left: 0;
                        display: block;
                        float: left;
                        margin: 0 10px 0 0;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                display: block;
                                cursor: pointer;
                                padding: 11px 15px;
                                color: #777;
                                text-decoration: none;
                            }

                            &.active {
                                a {
                                    background: #e1251b;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }

            .goods-list {
                margin: 20px 0;

                ul {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        height: 100%;
                        width: 20%;
                        margin-top: 10px;
                        line-height: 28px;

                        .list-wrap {
                            .p-img {
                                padding-left: 15px;
                                width: 215px;
                                height: 255px;

                                a {
                                    color: #666;

                                    img {
                                        max-width: 100%;
                                        height: auto;
                                        vertical-align: middle;
                                    }
                                }
                            }

                            .price {
                                padding-left: 15px;
                                font-size: 18px;
                                color: #c81623;

                                strong {
                                    font-weight: 700;

                                    i {
                                        margin-left: -5px;
                                    }
                                }
                            }

                            .attr {
                                padding-left: 15px;
                                width: 85%;
                                overflow: hidden;
                                margin-bottom: 8px;
                                min-height: 38px;
                                cursor: pointer;
                                line-height: 1.8;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;

                                a {
                                    color: #333;
                                    text-decoration: none;
                                }
                            }

                            .commit {
                                padding-left: 15px;
                                height: 22px;
                                font-size: 13px;
                                color: #a7a7a7;

                                span {
                                    font-weight: 700;
                                    color: #646fb0;
                                }
                            }

                            .operate {
                                padding: 12px 15px;

                                .sui-btn {
                                    display: inline-block;
                                    padding: 2px 14px;
                                    box-sizing: border-box;
                                    margin-bottom: 0;
                                    font-size: 12px;
                                    line-height: 18px;
                                    text-align: center;
                                    vertical-align: middle;
                                    cursor: pointer;
                                    border-radius: 0;
                                    background-color: transparent;
                                    margin-right: 15px;
                                }

                                .btn-bordered {
                                    min-width: 85px;
                                    background-color: transparent;
                                    border: 1px solid #8c8c8c;
                                    color: #8c8c8c;

                                    &:hover {
                                        border: 1px solid #666;
                                        color: #fff !important;
                                        background-color: #666;
                                        text-decoration: none;
                                    }
                                }

                                .btn-danger {
                                    border: 1px solid #e1251b;
                                    color: #e1251b;

                                    &:hover {
                                        border: 1px solid #e1251b;
                                        background-color: #e1251b;
                                        color: white !important;
                                        text-decoration: none;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .page {
                width: 733px;
                height: 66px;
                overflow: hidden;
                float: left;


            }
        }

        .hot-sale {
            margin-bottom: 5px;
            border: 1px solid #ddd;

            .title {
                font-weight: 700;
                font-size: 14px;
                line-height: 21px;
                border-bottom: 1px solid #ddd;
                background: #f1f1f1;
                color: #333;
                margin: 0;
                padding: 5px 0 5px 15px;
            }

            .hot-list {
                padding: 15px;

                ul {
                    display: flex;

                    li {
                        width: 25%;
                        height: 100%;

                        .list-wrap {
                            .p-img, .price, .attr, .commit {
                                padding-left: 15px;
                            }

                            .p-img {
                                img {
                                    max-width: 100%;
                                    vertical-align: middle;
                                    border: 0;
                                }
                            }

                            .attr {
                                width: 85%;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                overflow: hidden;
                                margin-bottom: 8px;
                                min-height: 38px;
                                cursor: pointer;
                                line-height: 1.8;
                            }

                            .price {
                                font-size: 18px;
                                color: #c81623;

                                strong {
                                    font-weight: 700;

                                    i {
                                        margin-left: -5px;
                                    }
                                }
                            }

                            .commit {
                                height: 22px;
                                font-size: 13px;
                                color: #a7a7a7;
                            }
                        }
                    }
                }
            }
        }
    }
}

</style>