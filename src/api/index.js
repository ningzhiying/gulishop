import ajax from './ajax'
import mockAjax from "@/api/mockAjax";
//获取商品的三级分类
export  const getBaseCategoryList = ()=>ajax.get("/product/getBaseCategoryList")
//搜索商品
export const postCommodityList = (searchParams)=>ajax.post('/list',searchParams)
//商品详情
export const getGoodsDetailList = (id)=>ajax.get("/item/"+id)




// 模拟数据
export const getHomeList = ()=>mockAjax({
        url:"/home",
        method:"get"
    })
export const getHomeBannerList = ()=>mockAjax({
    url:"/bannerList",
    method:"get"
})
export const getHomeFloorList = ()=>mockAjax({
    url:"/floorList",
    method:"get"
})