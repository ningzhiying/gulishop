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
//退出登录/api/user/passport/logout
export const getPassportLogout = () => ajax.get("/user/passport/logout")
//获取验证码/api/user/passport/sendCode/{phone}
export const getSendCode = (phone) => ajax.get(`/user/passport/sendCode/${phone}`)
//注册 /api/user/passport/register
export const postRegister = (params) => ajax.post(`/user/passport/register`, params)
///user/passport/auth/getUserInfo
export const getUserInfo = () => ajax.get("/user/passport/auth/getUserInfo")
//提交订单/api/order/auth/submitOrder?tradeNo={tradeNo}
export const postSubmitOrder = (data) => ajax.post(`/order/auth/submitOrder?tradeNo=${data.tradeNo}`, data.params)
// 获取订单支付信息/api/payment/weixin/createNative/{orderId}
export const getCreateNative = (orderId) => ajax({
    method: "get",
    url: `/payment/weixin/createNative/${orderId}`
})
//获取订单列表/api/order/auth/{page}/{limit}
export const getOrderList = (page,limit) => ajax.get(`/order/auth/${page}/${limit}`)
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