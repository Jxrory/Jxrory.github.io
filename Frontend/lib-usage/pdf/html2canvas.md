# html 转换为 canvas

## 安装

```bash
npm i html2canvas
```

## 使用

```ts
// 需要转换的 DOM 元素
const targetElement = document.getElementById("html-content-id");
// 目标 canvas
const canvasBoard = document.getElementById("canvas-wrapper");
if (targetElement) {
  html2canvas(targetElement).then((canvas) => {
    // 将canvas插入到页面
    canvasBoard?.appendChild(canvas);
  });
}
```

## 完整代码

```vue
<template>
  <div class="test-body">
    <!-- 起始元素 -->
    <div id="html-content-id" class="html-content">
      <div class="btn">测试</div>
    </div>

    <!-- canvas元素 -->
    <div id="canvas-wrapper"></div>
  </div>
</template>

<script setup lang="ts">
import html2canvas from "html2canvas";
import { onMounted } from "vue";

onMounted(() => {
  // element 是 dom元素
  const e = document.getElementById("html-content-id");
  const canvasCon = document.getElementById("canvas-wrapper");
  if (e) {
    html2canvas(e).then((canvas) => {
      // canvas元素
      // 将canvas插入到页面
      canvasCon?.appendChild(canvas);
    });
  }
});
</script>

<script lang="ts">
export default {
  name: "TestIndex",
};
</script>

<style lang="scss" scoped>
.test-body {
  width: 100vw;
  height: 100vh;

  .html-content {
    width: 500rpx;
    height: 500rpx;
    background: #eee;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .btn {
      width: 147rpx;
      height: 53rpx;
      background: #ffec03;
      border-radius: 27rpx;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  #canvas-wrapper {
    margin-top: 30rpx;
    width: 500rpx;
    height: 700rpx;

    background: rgb(181, 66, 66);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
```

## 参考

- [https://zhusiqing.github.io/2018/08/22/html%E8%BD%ACcanvas-canvas%E8%BD%ACpdf/](https://zhusiqing.github.io/2018/08/22/html%E8%BD%ACcanvas-canvas%E8%BD%ACpdf/)
