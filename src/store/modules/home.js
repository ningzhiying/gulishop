 // vuex管理的home模块

import {getBaseCategoryList, getHomeBannerList, getHomeFloorList, getHomeList} from "@/api";

const state = {
    baseCategoryList: [],
    homeList: {},
    bannerList: [],
    floorList: []
}
const mutations = {
    RECEIVE_BASE_CATEGORY_LIST(state, list) {
        state.baseCategoryList = list
    },
    GET_HOME_LIST(state, info) {
        state.homeList = info
    },
    GET_BANNER_LIST(state, info) {
        state.bannerList = info
    },
    GET_FLOOR_LIST(state, info) {
        state.floorList = info
    }
}
const actions = {
    async get_base_category_list({commit}) {
        try {
            const result = await getBaseCategoryList();

            if (result.code === 200) {
                commit("RECEIVE_BASE_CATEGORY_LIST", result.data)
            }
        } catch (error) {
            console.log(error)
            alert("获取数据失败")
        }
    },
    async get_home_list({commit}) {
        const result = await getHomeList()
        console.log(result)
        commit("GET_HOME_LIST", result.data)
    },
    async get_banner_list({commit}) {
        const result = await getHomeBannerList()
        commit("GET_BANNER_LIST", result.data)
    },
    async get_floor_list({commit}) {
        const result = await getHomeFloorList()
        console.log(result)
        commit("GET_FLOOR_LIST", result.data)
    },

}


const getters = {
    hotSale(state) {
        return state.homeList.hotSale
    },
    recommend(state) {
        return state.homeList.recommend
    },
    like(state) {
        return state.homeList.like
    },
}
export default {
    state,
    mutations,
    actions,
    getters
}
