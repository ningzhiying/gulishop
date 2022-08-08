// vuex管理的home模块

import {getOrderAuthTrade} from "@/api";

const state = {

};

const mutations = {

};
const actions = {
   async get_order_auth_trade(){
        try{
        const result =await getOrderAuthTrade()
            console.log(result)
        }catch (err){
            return Promise.reject(err)
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
