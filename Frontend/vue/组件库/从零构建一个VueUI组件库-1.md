# 从零构建一个 Vue UI 组件库(一)

## 初始化项目

```sh
npm create vite olam-ui --template vue
```

## 添加插件 markdown 插件

### 安装依赖

```sh
npm i -D @types/node

npm i marked
```

### 插件代码

```ts
import path from "path";
import fs from "fs";
import marked from "marked";

const mdToJs = (str) => {
  const content = JSON.stringify(marked(str));
  return `export default ${content}`;
};

export function md() {
  return {
    configureServer: [
      // 用于开发
      async ({ app }) => {
        app.use(async (ctx, next) => {
          // koa
          if (ctx.path.endsWith(".md")) {
            ctx.type = "js";
            const filePath = path.join(process.cwd(), ctx.path);
            ctx.body = mdToJs(fs.readFileSync(filePath).toString());
          } else {
            await next();
          }
        });
      },
    ],
    transforms: [
      {
        // 用于 rollup // 插件
        test: (context) => context.path.endsWith(".md"),
        transform: ({ code }) => mdToJs(code),
      },
    ],
  };
}
```

## 参考

- [https://www.jianshu.com/p/1719670e9c0e](https://www.jianshu.com/p/1719670e9c0e)
