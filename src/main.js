import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "@/register";


Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  created(){
    Vue.prototype.$bus=this;
  },
  router,
  store,
  ElementUI
}).$mount('#app')

import "@/mock"
