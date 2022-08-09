// vuex管理的home模块

import {getCreateNative} from "@/api";

const state = {
    paymentInformation:{}
};

const mutations = {
    GET_PAYMENT_INFORMATION(state,data){
        state.paymentInformation=data
    }

};
const actions = {
   async get_payment_information({commit},orderId){
        try{
          const result =await  getCreateNative(orderId)
            commit("GET_PAYMENT_INFORMATION",result.data)
        }catch (err){
            console.log(err)
        }
    }
};
const getters = {

};
export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}
