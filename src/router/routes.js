import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import MyOrder from "@/pages/Order/MyOrder";
import GroupOrder from "@/pages/Order/GroupOrder";
import Order from "@/pages/Order";

export default [
    {
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
        component: AddCartSuccess,
    }, {
        path: "/shopcart",
        component: ShopCart
    }, {
        path: "/trade",
        component: Trade
    }, {
        name: "pay",
        path: "/pay",
        component: Pay,
        props(route) {
            return {
                orderId: route.query.orderId
            };
        }
    }, {
        path: "/center",
        component: Order,
        children: [
            {
                path: "myOrder",
                component: MyOrder
            }, {
                path: "groupOrder",
                component: GroupOrder
            }, {
                path: "",
                redirect:"myOrder"
            }
        ]
    }, {
        path: "/",
        redirect: "/home"
    },]