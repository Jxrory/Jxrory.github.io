# 搭建管理后台项目

技术栈: `Vite` + `TS` + `Vue3`

路由: `vue-router`
状态管理: `Pinia`
网络请求: `axios`

## `vite` 新建项目

```bash
npm create vite@latest jxrory-manage-fe
```

**Run**:

```bash
cd jxrory-manage-fe

npm install

npm run dev
```

**Show**:

[http://localhost:3000/](http://localhost:3000/)

## 项目基础配置

### 项目 `@` 符配置

#### 安装依赖

`path` 需要 `@types/node` 依赖

```bash
npm install @types/node
```

#### vite.config.ts

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve } from "path";

function _resolve(dir: string) {
  return resolve(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": _resolve("src"),
    },
  },
});
```

#### 验证

修改 `App.vue` 的路径, 查看页面是否正常显示

```ts
import HelloWorld from "@/components/HelloWorld.vue";
```

现存问题: 点击 `@/components/HelloWorld.vue` 无法跳转

### 配置 `tsconfig.json`

修复点击 `@/components/HelloWorld.vue` 无法跳转的问题

在 `tsconfig.json` 中的 `compilerOptions` 配置项中添加 `paths` 配置, 使 `@/` 映射到 `src` 目录中

```ts
{
  "compilerOptions": {
    // ...
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  // ...
}
```

### 路由配置

#### 添加 `vue-router` 依赖

```bash
npm install vue-router
```

#### 声明路由

新建 `src/router/index.ts` 文件

添加如下内容:

```ts
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/Home/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login/index.vue"),
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
```

#### 注册路由

修改 `src/main.ts`

```ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index";

createApp(App).use(router).mount("#app");
```

#### 验证使用

修改 `App.vue`, 添加 `router-view`

```vue
<script setup lang="ts"></script>

<template>
  <router-view></router-view>
</template>

<style>
#app {
  font-size: 16px;
}
</style>
```

新建 `src/pages/Home/index.vue` 和 `src/pages/Login/index.vue`

`src/pages/Home/index.vue` 内容:

```vue
<script setup lang="ts">
import router from "@/router";

const toLoginPage = () => router.push("/login");
</script>

<template>
  <div>
    Home page
    <button @click="toLoginPage">登录</button>
  </div>
</template>

<style scoped></style>
```

`src/pages/Login/index.vue` 内容:

```vue
<script setup lang="ts"></script>

<template>
  <div>Login page</div>
</template>

<style scoped></style>
```

点击 Home 页面中的 button 跳转至 `Login page`

## Scss 支持

### install

```bash
npm install sass -D
```

### 使用

```vue
<style scoped lang="scss">
$root-font-size: 16px;

#app {
  font-size: $root-font-size;
}
</style>
```

### scss 引入成功验证

刷新页面, 无错误发生

## 网络请求

### `axios` 安装

```bash
npm install axios
```

### `axios` 封装
