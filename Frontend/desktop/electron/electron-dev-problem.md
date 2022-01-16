# electron 开发中遇到的一些问题

## 打包后存在跨域问题

electron 可以设置不做跨域校验问题, 配置方法如下:

```js
// Create the browser window.
const win = new BrowserWindow({
  width: 1600,
  height: 1200,
  webPreferences: {
    nodeIntegration: true, // 是否集成node
    webSecurity: false, // 是否禁用同源策略
  },
});
```

## 参考

[electron 配置允许跨域（前端解决方案）](https://juejin.cn/post/6871148192629850125)
