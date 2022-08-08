import Vue from "vue";
import BannerSwiper from "@/components/BannerSwiper";
import TypeNav from "@/components/TypeNav";
import Pagination from "@/components/Pagination";
Vue.component('PaginationCom',Pagination)
Vue.component(TypeNav.name,TypeNav)
Vue.component(BannerSwiper.name,BannerSwiper)