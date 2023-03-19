module.exports = {
  devServer:{
    open:true,
    host:'localhost',
    // host:'10.163.192.249',
    // 代理,跨域
    proxy:{
      '/api':{
        target:'http://1.116.64.64:5004/api2',
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
}