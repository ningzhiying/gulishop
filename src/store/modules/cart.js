// vuex管理的home模块

import {getCartLis} from "@/api";

const state = {
    cartList:{}
};

const mutations = {
    GET_CART_LIST(state,info){
        state.cartList=info
    }
};
const actions = {
   async get_cart_list({commit}){
      const result = await getCartLis()
       commit("GET_CART_LIST",result.data[0])
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
