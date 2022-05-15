# 使用 [docsify](https://docsify.js.org/#/zh-cn/) 快速构建博客站点

> [docsify](https://docsify.js.org/#/zh-cn/) 可以快速帮你生成文档网站。不同于 GitBook、Hexo 的地方是它不会生成静态的 `.html` 文件，所有转换工作都是在运行时。如果你想要开始使用它，只需要创建一个 `index.html` 就可以开始编写文档并直接部署在 GitHub Pages。

## 目录结构

```text
.
├── Backend
│   ├── README.md       // Backend下的首页, 对应的路径 `/Backend/README`
│   ├── _sidebar.md     // 嵌套的侧边栏, 当url路径加载到Backend时, 会加载此文件(侧边栏)
├── README.md           // index.html 第一次进入会被加载
├── _coverpage.md       // 封面
├── _sidebar.md         // 可自定义侧边导航栏
└── index.html          // 首页: 会去装载当前目录下的 `README.md`
```

### 配置 `index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta charset="UTF-8" />

    <!-- 不同的样式可以挑一个自己喜欢的 -->
    <link
      rel="stylesheet"
      href="//cdn.jsdelivr.net/npm/docsify/themes/vue.css"
    />
    <!-- <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/themes/buble.css"> -->
    <!-- <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/themes/dark.css"> -->
    <!-- <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/themes/pure.css"> -->
    <!-- <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/themes/dolphin.css"> -->
  </head>

  <body>
    <div id="app">加载中</div>
    <script>
      window.$docsify = {
        // 侧边栏显示名字和logo, name和logo只能选择其一
        name: 'My Blog', // NOTE: 改成自己的Blog名字
        repo: 'https://github.com/Jxrory/jxrory.github.io/', // 左上角github挂件, NOTE: 改成自己的代码仓库

        // 定制封面, 内容在 `_coverpage.md` 中
        coverpage: true, // 显示封面
        onlyCover: true, // 单独将封面作为首页

        // 定制侧边栏
        loadSidebar: true, // 开启侧边栏
        subMaxLevel: 2, // 开启文章二级标题目录
      }
    </script>

    <script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
  </body>
</html>
```

### 配置封面 `_coverpage.md`

```markdown
<!-- _coverpage.md -->

<!-- 修改logo -->

![logo](https://jxrory.github.io/_media/notebook.svg)

<!-- 修改网站名字 -->

# My Blog

<!-- 修改github仓库地址 -->

[GitHub](https://github.com/jxrory/)
[Started](/README) <!-- 不需要修改 -->
```

### 配置侧边栏 `_sidebar.md`

```markdown
<!-- _sidebar.md -->

<!-- docsify-ignore 在侧边栏中忽略Home标题 -->

# Home <!-- {docsify-ignore} -->

- [Backend](/Backend/README.md)
  - [Java](/Backend/java/README.md) <!-- 参考自己的文档路径, 下同 -->
  - [Mysql](/Backend/mysql/README.md)
  - [Redis](/Backend/redis/README.md)
  - [Biz](/Backend/biz/README.md)
  - [分布式](/Backend/distributed/README.md)
```

### 首页内容 `README.md`

```markdown
# My Blog <!-- {docsify-ignore-all} -->

## Backend

### ![](/_media/icon/sql-23.svg) SQL

- [事务隔离级别](/Backend/mysql/事务隔离级别.md)

### ![](/_media/icon/redis-23.svg) Redis

- [过期删除策略和内存淘汰策略](/Backend/redis/过期删除策略和内存淘汰策略.md)
- [缓存穿透-击穿-雪崩](/Backend/redis/缓存穿透-击穿-雪崩.md)
```

## 使用的注意点

1. 文档可以使用全路径名.
2. 图片需要使用相对路径名.

## 参考

- [docsify 中文官方文档](https://docsify.js.org/#/zh-cn/quickstart)
