// vuex管理的home模块
import {postCommodityList} from "@/api";
const state = {
    productList:{}
};

const mutations = {
    ASSIGN_PRODUCTS_LIST(state,data){
        state.productList = data
    }
};
const actions = {
    // 获取信息列表
    async inquire_about_products_handler({commit},searchParams){
       try{
           const result = await postCommodityList(searchParams)
           if (result.code===200){
               commit("ASSIGN_PRODUCTS_LIST",result.data)
           }
       }catch (err){
           return Promise.reject(err)
        }

    }
};
const getters = {
    attrsList(state){
        return state.productList.attrsList || []
    } ,
    goodsList(state){
        return state.productList.goodsList || []
    } ,
    trademarkList(state){
        return state.productList.trademarkList || []
    },
    pages(state){
      return{
          total:state.productList.total  || 0,
          totalPages:state.productList.totalPages || 0,
          pageSize:state.productList.pageSize || 0,
          pageNo:state.productList.pageNo ||0
      }
    }
};
export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}
