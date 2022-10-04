// const { defineConfig } = require('@vue/cli-service')




const path = require('path');//引入path模块
function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}



module.exports = {
  transpileDependencies: true,

  chainWebpack:(config)=>{
    config.resolve.alias
    .set('@',resolve('./src'))
    .set('interface!',resolve('./src/components/interface'))
    .set('vuex!',resolve('./src/components/vuex'))
 
    //set第一个参数：设置的别名，第二个参数：设置的路径
},


  devServer: {
   host: 'localhost',
   
   port: 300,//本地运行的端口
   open: true, //配置自动启动浏览器 
  //  hotOnly:false,
   //接口代理
     proxy: {
       
       '/api': {
         target: 'http://localhost:87',//设置要代理访问的接口----这是我自己的接口
         changeOrigin: true,
         pathRewrite: {
           '^/api': ''  //重写访问地址，在请求时可以省略target的地址，直接以/api开头
         }
       }
     }
  },

}




