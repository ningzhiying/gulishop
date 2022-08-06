// 收集所有Vuex 管理模块
import home from "@/store/modules/home";
import search from "@/store/modules/search"
import detail from "@/store/modules/detail";
import cart from "@/store/modules/cart";
//向外暴露所有vuex管理模块的对象
export  default {
    home,
    search,
    detail,
    cart
}