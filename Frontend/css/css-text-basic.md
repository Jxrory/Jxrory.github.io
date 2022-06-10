# css 基础 - 文本相关

## 常用

### 单行溢出隐藏

```scss
// 单行溢出隐藏
@mixin overflow-hide-single-line {
  // 溢出隐藏
  overflow: hidden;
  // 溢出省略
  text-overflow: ellipsis;
  // 不换行
  white-space: nowrap;
}
```

### 多行溢出隐藏

```scss
@mixin overflow-hide-multi-line {
  overflow: hidden;
  text-overflow: ellipsis;
  /* 将对象作为弹性伸缩盒子模型显示  */
  display: -webkit-box;
  /* 一个块元素显示的文本的行数 */
  -webkit-line-clamp: 5;
  /* 设置或检索伸缩盒对象的子元素的排列方式 */
  -webkit-box-orient: vertical;
}
```

## 参考

- [CSS 单行文本溢出显示省略号](https://www.cnblogs.com/jyybeam/p/6564453.html)
