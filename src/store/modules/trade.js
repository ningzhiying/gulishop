// vuex管理的home模块

import {getOrderAuthTrade, postSubmitOrder} from "@/api";

const state = {
    orderData:{}
};

const mutations = {
    GET_ORDER_TRADE(state,data) {
        state.orderData = data
    }
};
const actions = {
   async get_order_auth_trade({commit}){
        try{
        const result =await getOrderAuthTrade()
            commit("GET_ORDER_TRADE",result.data)
        }catch (err){
            return Promise.reject(err)
        }
   },
    async post_submit_order(context, data){
        try{
            const result =await postSubmitOrder(data)
            alert(result.message)
            return result.data
        }catch (err){
            return Promise.reject(err)
        }
    }

};
const getters = {
    userAddressList(){
        return state.orderData.userAddressList || []
    },
    orderDetailVoList(){
        return state.orderData.orderDetailVoList || []
    },
    detailArrayList(){
        return state.orderData.detailArrayList || []
    },
    orderDetailList(){
        return state.orderData?.orderDetailVoList[0].orderDetailList || []
    }
};
export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}
