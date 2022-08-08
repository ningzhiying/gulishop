// vuex管理的home模块

import {deleteBatchDeleteCart, deleteCart, getCartLis, getCheckCart, postBatchCheckCart} from "@/api";

const state = {
    cartList: null
};

const mutations = {
    GET_CART_LIST(state, info) {
        state.cartList = info
    }
};
const actions = {
    // 获取购物车列表
    async get_cart_list({commit}) {
        try {
            const result = await getCartLis()
            commit("GET_CART_LIST", result.data[0])
        } catch (err) {
            return Promise.reject(err)
        }
    },
    // 切换商品选中状态
    async get_check_cart(context, {id, isChecked}) {
        try {
            await getCheckCart(id, isChecked)

        } catch (err) {
            return Promise.reject(err)
        }
    },
    //批量选择购物车
    async post_batch_check_cart(context, {isChecked, arr}) {
        try {
            await postBatchCheckCart(isChecked, arr)

        } catch (err) {
            return Promise.reject(err)
        }
    },
    //批量删除
    async delete_batch_delete_cart(context, skuIdList) {
        try {
            await deleteBatchDeleteCart(skuIdList)

        } catch (err) {
            return Promise.reject(err)
        }
    },
    // 删除单个
    async delete_cart(context, skuId) {
        try {
            await deleteCart(skuId)
        } catch (err) {
            return Promise.reject(err)
        }
    },
};
const getters = {
    cartInfoList(){
        if (state.cartList){
            return state.cartList.cartInfoList || []
        }else {
            return []
        }
    }
};
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
