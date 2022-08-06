import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCart from "@/pages/AddCart";
import Cart from "@/pages/Cart";

Vue.use(VueRouter);

const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originPush.call(this, location).catch(() => {
    })
};
const originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originReplace.call(this, location).catch(() => {
    })
}
export default new VueRouter({
    routes: [{
        path: "/home",
        component: Home
    }, {
        path: "/login",
        component: Login,
        meta: {
            isHideFooter: true
        }
    }, {
        name: "search",
        path: "/search/:keyword?",
        component: Search,
        props(route) {
            return {
                categoryName: route.query.categoryName,
                category1id: route.query.category1id,
                category2id: route.query.category2id,
                category3id: route.query.category3id,
            }
        }
    }, {
        path: "/register",
        component: Register,
        meta: {
            isHideFooter: true
        }
    }, {
        path: "/detail/:id",
        component: Detail
    }, {
        name: "addCartSuccess",
        path: "/addCartSuccess/:skuNum",
        component: AddCart,
    },{
        path:"/shopcart",
        component:Cart
    }, {
        path: "/",
        redirect: "/home"
    },]
})