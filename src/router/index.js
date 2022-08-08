import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes";

Vue.use(VueRouter);
// 解决$router.push()两次同一个位置报错
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
    //配置路由
    routes,
    // eslint-disable-next-line no-unused-vars
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }

    }
})