<template>
    <!-- 购物车列表 -->
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>
            <div class="cart-body">
                <ul
                    v-for="cartInfo in cartInfoList"
                    :key="cartInfo.id"
                    class="cart-list">
                    <li class="cart-list-con1">
                        <input
                            type="checkbox"
                            name="chk_list"
                            :checked="cartInfo.isChecked"
                            @change="changeCheckCart($event,cartInfo.skuId)">
                    </li>
                    <li class="cart-list-con2">
                        <img :src="cartInfo.imgUrl">
                        <div class="item-msg">{{ cartInfo.skuName }}</div>
                    </li>
                    <li class="cart-list-con4">
                        <span class="price">{{ cartInfo.skuPrice.toFixed(2) }}</span>
                    </li>
                    <li class="cart-list-con5">
                        <a class="mins" @click="addCart(cartInfo.skuId,-1)">-</a>
                        <input autocomplete="off"
                               type="text"
                               :value="cartInfo.skuNum"
                               :data-Id="cartInfo.skuId"
                               :data-Num="cartInfo.skuNum"
                               @change="changeCart" minnum="1" class="itxt">
                        <a class="plus" @click="addCart(cartInfo.skuId,1)">+</a>
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">{{ (cartInfo.skuPrice * cartInfo.skuNum).toFixed(2) }}</span>
                    </li>
                    <li class="cart-list-con7">
                        <a class="sindelet" @click.prevent="deleteCart(cartInfo.skuId)">删除</a>
                        <br>
                        <a href="#none">移到收藏</a>
                    </li>
                </ul>

            </div>
        </div>
        <div class="cart-tool">
            <div class="select-all">
                <input class="chooseAll" type="checkbox" :checked="isSelectAll" @change="selectAll(isSelectAll)">
                <span>全选</span>
            </div>
            <div class="option">
                <a @click.prevent="deleteAll">删除选中的商品</a>
                <a href="#none">移到我的关注</a>
                <a href="#none">清除下柜商品</a>
            </div>
            <div class="money-box">
                <div class="chosed">已选择
                    <span>{{ chosen }}</span>件商品
                </div>
                <div class="sumprice">
                    <em>总价（不含运费） ：</em>
                    <i class="summoney">{{ totalPrice.toFixed(2) }}</i>
                </div>
                <div class="sumbtn">
                    <router-link to="/trade" class="sum-btn" >结算</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "CartCom",
    data() {
        return {
            isSelectAll: false,
            chosen: 0
        }
    },
    methods: {
        ...mapActions("shopcart", ["get_cart_list", "get_check_cart", "post_batch_check_cart", "delete_batch_delete_cart", "delete_cart"]),
        ...mapActions("addcart", ["add_cart"]),
        //数量加减
        async addCart(skuId, skuNum) {
            alert("修改数量成功")
            await this.add_cart({skuId, skuNum})
            this.get_cart_list()
        },
        //输入数量
        async changeCart(e) {
            alert("修改数量成功")
            const {id, num} = e.target.dataset //修改前内容
            const nval = e.target.value  //输入框内容
            if (nval > 0) {
                await this.add_cart({skuId: id, skuNum: (nval - num)})
                this.get_cart_list()
            } else {
                e.target.value = 1
            }
        },
        // 是否选择
        async changeCheckCart($event, id) {
            if ($event.target.checked) {
                await this.get_check_cart({id, isChecked: 1})
            } else {
                await this.get_check_cart({id, isChecked: 0})
            }
            alert("修改所有商品选中状态成功")
            this.get_cart_list()
        },
        //是否全选
        async selectAll(selectAll) {
            if (selectAll) {
                console.log(this.idArr)
                await this.post_batch_check_cart({isChecked: 0, arr: this.idArr})
            } else {
                console.log(this.idArr)
                await this.post_batch_check_cart({isChecked: 1, arr: this.idArr})
            }
            alert("修改所有商品选中状态成功")
            this.get_cart_list()
        },
        //批量删除
        deleteAll() {
            this.delete_batch_delete_cart(this.selectAllArr)
        },
        //删除单个
        async deleteCart(skuId) {
            alert("删除成功成功")
            await this.delete_cart(skuId)
            this.get_cart_list()
        }
    },
    beforeMount() {
        this.get_cart_list()

    },
    computed: {
        ...mapGetters("shopcart", ["cartInfoList"]),
        idArr() {
            return this.cartInfoList.map(t => t.skuId)
        },
        isChecked() {
            return this.cartInfoList.every(t => t.isChecked === 1)
        },
        selectAllArr() {
            return this.cartInfoList.filter(item => item.isChecked === 1).map(item => item.skuId)
        },
        totalPrice() {
            if (this.cartInfoList.length){
                const PriceArr = this.cartInfoList.filter(item => item.isChecked === 1).map(item => item.skuNum * item.skuPrice)
                return PriceArr.reduce((prev, item) => prev + item, 0)
            }else {
                return 0
            }
        }
    },
    watch: {
        cartInfoList: {
            handler(v) {
                if(v){
                    this.isSelectAll = v.every(t => t.isChecked === 1)
                    this.chosen = v.reduce((prev, item) => prev + (item.isChecked === 1), 0)
                }
            },
            deep: true,
        }
    }
}
</script>

<style lang="less" scoped>
.cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
    }

    .cart-main {
        .cart-th {
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            overflow: hidden;

            & > div {
                float: left;
            }

            .cart-th1 {
                width: 25%;

                input {
                    vertical-align: middle;
                }

                span {
                    vertical-align: middle;
                }
            }

            .cart-th2 {
                width: 25%;
            }

            .cart-th3,
            .cart-th4,
            .cart-th5,
            .cart-th6 {
                width: 12.5%;
            }
        }

        .cart-body {
            margin: 15px 0;
            border: 1px solid #ddd;

            .cart-list {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                overflow: hidden;

                & > li {
                    float: left;
                }

                .cart-list-con1 {
                    width: 15%;
                }

                .cart-list-con2 {
                    width: 35%;

                    img {
                        width: 82px;
                        height: 82px;
                        float: left;
                    }

                    .item-msg {
                        float: left;
                        width: 150px;
                        margin: 0 10px;
                        line-height: 18px;
                    }
                }

                .cart-list-con4 {
                    width: 10%;
                }

                .cart-list-con5 {
                    width: 17%;

                    .mins {
                        border: 1px solid #ddd;
                        border-right: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }

                    input {
                        border: 1px solid #ddd;
                        width: 40px;
                        height: 33px;
                        float: left;
                        text-align: center;
                        font-size: 14px;
                    }

                    .plus {
                        border: 1px solid #ddd;
                        border-left: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }
                }

                .cart-list-con6 {
                    width: 10%;

                    .sum {
                        font-size: 16px;
                    }
                }

                .cart-list-con7 {
                    width: 13%;

                    a {
                        color: #666;
                    }
                }
            }
        }
    }

    .cart-tool {
        overflow: hidden;
        border: 1px solid #ddd;

        .select-all {
            padding: 10px;
            overflow: hidden;
            float: left;

            span {
                vertical-align: middle;
            }

            input {
                vertical-align: middle;
            }
        }

        .option {
            padding: 10px;
            overflow: hidden;
            float: left;

            a {
                float: left;
                padding: 0 10px;
                color: #666;
            }
        }

        .money-box {
            float: right;

            .chosed {
                line-height: 26px;
                float: left;
                padding: 0 10px;
            }

            .sumprice {
                width: 200px;
                line-height: 22px;
                float: left;
                padding: 0 10px;

                .summoney {
                    color: #c81623;
                    font-size: 16px;
                }
            }


            .sumbtn {
                float: right;

                a {
                    display: block;
                    position: relative;
                    width: 96px;
                    height: 52px;
                    line-height: 52px;
                    color: #fff;
                    text-align: center;
                    font-size: 18px;
                    font-family: "Microsoft YaHei";
                    background: #e1251b;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>