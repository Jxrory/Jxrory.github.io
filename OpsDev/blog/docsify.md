# docsify

## 初始化项目

初始化有两种方式: 使用 **命令行工具** `docsify-cli` 或者 **手动初始化**

### 命令行工具

#### 1. 安装

```bash
npm i docsify-cli -g
```

#### 2. 项目初始化

```bash
docsify init ./docs
```

#### 3. 初始化文档介绍

- `index.html` 入口文件
- `README.md` 会做为主页内容渲染
- `.nojekyll` 用于阻止 GitHub Pages 忽略掉下划线开头的文件

#### 4. 本地预览

通过运行 `docsify serve` 启动一个本地服务器，可以方便地实时预览效果。默认访问地址 [http://localhost:3000](http://localhost:3000) 。

```bash
docsify serve docs
```

### 手动初始化

手动创建 `index.html` 文件

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta charset="UTF-8" />
    <link
      rel="stylesheet"
      href="//cdn.jsdelivr.net/npm/docsify/themes/vue.css"
    />
  </head>
  <body>
    <div id="app"></div>
    <script>
      window.$docsify = {
        //...
      }
    </script>
    <script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
  </body>
</html>
```

启动服务器

```python
### python2
cd docs && python -m SimpleHTTPServer 3000

### python3
cd docs && python -m http.server 3000
```

## 多页文档

文档结构

```text
└── docs
    ├── README.md
    ├── guide.md
    └── zh-cn
        ├── README.md
        └── guide.md
```

对应的访问页面

```text
docs/README.md        => http://domain.com
docs/guide.md         => http://domain.com/guide
docs/zh-cn/README.md  => http://domain.com/zh-cn/
docs/zh-cn/guide.md   => http://domain.com/zh-cn/guide
```

### 定制侧边栏

首先配置 loadSidebar 选项

```html
<!-- index.html -->

<script>
  window.$docsify = {
    loadSidebar: true,
  }
</script>
<script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
```

接着创建 \_sidebar.md 文件，内容如下

```markdown
<!-- docs/_sidebar.md -->

- [首页](zh-cn/)
- [指南](zh-cn/guide)
```

### 显示目录

设置 subMaxLevel 配置项

```html
<!-- index.html -->

<script>
  window.$docsify = {
    loadSidebar: true,
    subMaxLevel: 2,
  }
</script>
<script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
```

### 忽略副标题

当设置了 `subMaxLevel` 时，默认情况下每个标题都会自动添加到目录中。如果你想忽略特定的标题，可以给它添加 `<!-- {docsify-ignore} -->`

```markdown
# Getting Started

## Header <!-- {docsify-ignore} -->

该标题不会出现在侧边栏的目录中。
```

要忽略特定页面上的所有标题，你可以在页面的第一个标题上使用 `<!-- {docsify-ignore-all} -->` 。

```markdown
# Getting Started <!-- {docsify-ignore-all} -->

## Header

该标题不会出现在侧边栏的目录中。
```

在使用时， `<!-- {docsify-ignore} -->` 和 `<!-- {docsify-ignore-all} -->` 都不会在页面上呈现。

## 封面

### 基本用法

在文档根目录创建 `_coverpage.md` 文件

```html
<!-- index.html -->

<script>
  window.$docsify = {
    coverpage: true,
  }
</script>
<script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
```

```markdown
<!-- _coverpage.md -->

![logo](_media/icon.svg)

# docsify <small>3.5</small>

> 一个神奇的文档网站生成器。

- 简单、轻便 (压缩后 ~21kB)
- 无需生成 html 文件
- 众多主题

[GitHub](https://github.com/docsifyjs/docsify/)
[Get Started](#docsify)
```

### 自定义背景

```markdown
<!-- _coverpage.md -->

# docsify <small>3.5</small>

[GitHub](https://github.com/docsifyjs/docsify/)
[Get Started](#quick-start)

<!-- 背景图片 -->

![](_media/bg.png)

<!-- 背景色 -->

![color](#f0f0f0)
```

## 参考

- [docsify docs](https://docsify.js.org/#/zh-cn/)
