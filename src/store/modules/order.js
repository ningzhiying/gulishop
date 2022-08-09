// vuex管理的home模块

import {getOrderList} from "@/api";

const state = {
    orderInfo:{}
};

const mutations = {
    GET_MY_ORDER_INFO(state,data){
        state.orderInfo=data
    }

};
const actions = {
    async get_my_order_info({commit}, {page,limit}){
     try{
         const result = await  getOrderList(page,limit);
         commit('GET_MY_ORDER_INFO',result.data)
         console.log(result)
     }catch(err){
         return Promise.reject(err)
     }

    }
};
const getters = {
    records(){
        return state.orderInfo.records || []
    },
    total(){
        return state.orderInfo.total || 0
    }
};
export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}
