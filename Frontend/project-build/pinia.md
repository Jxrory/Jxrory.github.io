# Pinia

## 安装

```bash
npm install pinia
```

## 引入

在 `src/main.ts` 中添加

```ts
import { createPinia } from "pinia";
createApp(App).use(createPinia()).use(router).mount("#app");
```

## 定义

```ts
// 引入Store定义函数
import { defineStore } from "pinia";

// 定义Store实例并导出，useStore可以是任何东西，比如useUser, useCart
// 第一个参数，唯一不可重复，字符串类型，作为仓库ID 以区分仓库
// 第二个参数，以对象形式配置仓库的state,getters,actions
export const useStore = defineStore("main", {
  // state 推荐箭头函数，为了TS类型推断
  state: () => {
    return {
      counter: 0,
    };
  },
  getters: {},
  actions: {},
});
```

## 使用

```vue
<script setup lang="ts">
import router from "@/router";
import { useStore } from "@/stores";
// 使普通数据变响应式的函数
import { storeToRefs } from "pinia";

const store = useStore();
const { counter } = storeToRefs(store);

const toLoginPage = () => router.push("/login");

const counterPlus = () => {
  counter.value++;
};
</script>

<template>
  <div>
    Home page
    <div style="margin-top: 30px;">
      <div>{{ counter }}</div>
      <button @click="counterPlus">counter++</button>
    </div>
  </div>
</template>

<style scoped></style>
```

## 参考

- [Pinia 中文文档](https://pinia.web3doc.top/getting-started.html)
- [Pinia 快速入门-上手指南](https://juejin.cn/post/7103522231569317925)
