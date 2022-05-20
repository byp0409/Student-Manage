const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  // 配置代理服务器
  devServer: {
    host: 'localhost',
    port: '8080', // 设置端口号
    proxy: {
      '/api': {
        target: 'http://8.130.23.181:8090', //API服务器的地址
        ws: true, //代理websockets
        changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
        pathRewrite: {
          // '^/api'是一个正则表达式，重写路径
          '^/api': '/api',
        },
      },
    },
  },
});
