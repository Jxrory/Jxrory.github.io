# iOS 应用程序开发：使用苹果官方模版制作应用图标

软件: Sketch + Xcode

使用到的文件:

- [Template-AppIcons-iOS-P3.sketch](./Template-AppIcons-iOS-P3.sketch)
- [Demo Icon](./Demo%20Icon.svg)
- [Contents.json](./Contents.json)

## 将图标导入 Sketch

从 Sketch 左侧的页码中，找到名为 Symbols 的这一页，将准备好的图标拖入上方巨大的空白方块「App Icon」中。此时 Sketch 会自动更新每一个所需图标大小。

## 取消圆角矩形蒙版

苹果官方模版中添加了圆角矩形的蒙版以供你设计参考，但实际导出时，你需要因此此模版涂层并导出正矩形的图标。从左侧列表中找到「App Icon Mask」并隐藏。

## 将图标导出到 Xcode 项目中

此时图标已经准备完成，这一步中我们直接将生成的图标导出到 Xcode 项目的图标库中。点击导出，并将图标导出到「Demo Xcode Project - Demo Xcode Project - Assets.xcassets - AppIcon.appiconset」文件夹中即可。

## 更新 Json 文件已保证图标自动链接

此时，我们所有的图标已经到出到 Xcode 的项目中了，但是 Xcode 自身提供的 Json 文件中并没有我们这些图标的相关数据。因此我制作了一个修改版的 Json 以便自动填充。仍在刚刚的到处文件夹 AppIcon.appiconset 中，将我提供的 Contents.json 覆盖原有 Json 文件即可。

### 参考

- [https://sspai.com/post/46955](https://sspai.com/post/46955)
