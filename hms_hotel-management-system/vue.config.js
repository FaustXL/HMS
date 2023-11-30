const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
 /*  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // 需要代理的后端接口
        secure: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/" // 重写匹配的字段。把/api 转为 /
        }
      }
    }
  } */
})
