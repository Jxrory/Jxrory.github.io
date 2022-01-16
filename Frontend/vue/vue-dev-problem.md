# 开发 vue 程序中碰到的一些问题

## vue 开发中配置跨域问题

在 `vue.config.js` 下配置

```js
devServer: {
    // 下面为需要跨域的
    proxy: {  // 配置跨域
      '/kai-api': {
        target: 'http://localhost:8080',  // 这里后台的地址模拟的;应该填写你们真实的后台接口
        secure: false,           //如果是https接口，需要配置这个参数
        changOrigin: true,  // 允许跨域
        pathRewrite: {
          '^/kai-api': ''  // 请求的时候使用这个api就可以
        }
      }
    }
  }
```

## 参考

[vue.config.js 解决跨域问题](https://www.cnblogs.com/whoamimy/p/11945474.html)
[vue 解决 axios 请求出现前端跨域问题](https://www.cnblogs.com/maoqian/p/15450336.html)
