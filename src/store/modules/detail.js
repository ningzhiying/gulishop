// vuex管理的home模块

import {getGoodsDetailList} from "@/api";

const state = {
    detailList: {}
};

const mutations = {
    CHANGE_THE_DATA(state, data) {
        state.detailList = data

    }
};
const actions = {
    async get_goods_detail_list({commit}, id) {
        try {
            const result = await getGoodsDetailList(id)
            commit("CHANGE_THE_DATA", result.data)
        } catch (err) {
            return Promise.reject(err)
        }
    }
};
const getters = {
    categoryView() {
       return  state.detailList.categoryView  || {}
    },
    skuInfo() {
       return  state.detailList.skuInfo || {}
    },
    price() {
       return  state.detailList.price || 0
    },
    spuSaleAttrList() {
       return  state.detailList.spuSaleAttrList || []
    },
};
export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}
