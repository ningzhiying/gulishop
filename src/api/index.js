import ajax from '../utils/ajax'
import mockAjax from "@/utils/mockAjax";
//获取商品的三级分类
export const getBaseCategoryList = () => ajax.get("/product/getBaseCategoryList")
//搜索商品
export const postCommodityList = (searchParams) => ajax.post('/list', searchParams)
//商品详情
export const getGoodsDetailList = (id) => ajax.get("/item/" + id)
//加入购物车/api/cart/addToCart/{ skuId }/{ skuNum }
export const postAddToCart = (skuId, skuNum) => ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)
// 获取购物车列表/api/cart/cartList
export const getCartLis = () => ajax.get("/cart/cartList")
// 切换商品选中状态/api/cart/checkCart/{skuID}/{isChecked}
export const getCheckCart = (skuID, isChecked) => ajax.get(`/cart/checkCart/${skuID}/${isChecked}`)
//批量选择购物车	post  /api/cart/batchCheckCart/{isChecked}
export const postBatchCheckCart = (isChecked, arr) => ajax.post(`/cart/batchCheckCart/${isChecked}`, arr)
//批量删除DELETE /api/cart/batchDeleteCart
export const deleteBatchDeleteCart = (skuIdList) => ajax.delete("/cart/batchDeleteCart", [...skuIdList])
//删除单个/api/cart/deleteCart/{skuId}
export const deleteCart = (skuId) => ajax.delete(`/cart/deleteCart/${skuId}`)
// 获取订单交易页信息/api/order/auth/trade
export const getOrderAuthTrade = () => ajax({
    method: "get",
    url: "/order/auth/trade",
})
//登录/api/user/passport/login
export const postLogin = (user) => ajax.post("/user/passport/login", user)
// 模拟数据
export const getHomeList = () => mockAjax({
    url: "/home",
    method: "get"
})
export const getHomeBannerList = () => mockAjax({
    url: "/bannerList",
    method: "get"
})
export const getHomeFloorList = () => mockAjax({
    url: "/floorList",
    method: "get"
})