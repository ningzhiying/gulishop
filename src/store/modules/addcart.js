// vuex管理的home模块

import {postAddToCart} from "@/api";

const state = {};
const mutations = {};
const actions = {
    async add_cart(context, {skuId, skuNum}) {
        try {
            await postAddToCart(skuId, skuNum)
        } catch (err) {
            return Promise.reject(err)
        }
    },

};
const getters = {};
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
