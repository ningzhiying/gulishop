// 收集所有Vuex 管理模块
import home from "@/store/modules/home";
import search from "@/store/modules/search"
import detail from "@/store/modules/detail";
import shopcart from "@/store/modules/shopcart";
import addcart from "@/store/modules/addcart";
import trade from "@/store/modules/trade";
import login from "@/store/modules/login";
//向外暴露所有vuex管理模块的对象
export  default {
    home,
    search,
    detail,
    shopcart,
    addcart,
    trade,
    login
}