const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      "/api":{
        target: "http://sph-h5-api.atguigu.cn",
        // pathRewrite:{"^/api":""}
      }
    }
  }
})
