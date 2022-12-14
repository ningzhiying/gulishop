// vuex管理的home模块

import {getUserInfo, postLogin} from "@/api";

const state = {
    userList:{}
};

const mutations = {
    USER_LIST(state,userList){
        console.log(userList)
        state.userList=userList
    }
};
const actions = {
   async post_login({commit},user){
      try{
          const result =  await postLogin(user)
          if(result.code===200){
              localStorage.setItem("TOKEN_KEY",result.data.token)
              commit("USER_LIST",result.data)
              return true
          }
          return false
      }catch (err){
          return Promise.reject(err)
      }
    },
    async get_user_info({commit}){
       try {
           const result =await getUserInfo();
           commit("USER_LIST",result.data)
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
