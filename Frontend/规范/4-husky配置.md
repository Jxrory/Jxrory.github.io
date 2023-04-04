# lint-staged & husky 配置

## 安装

### 安装 lint-staged

检测文件插件: 只检测 `git add .` 中暂存区的文件，对过滤出的文件执行脚本

```bash
# 安装 lint-staged
npm install lint-staged -D
# 向 package.json 中添加 scripts `"lint:lint-staged": "lint-staged",`
npm pkg set scripts.lint:lint-staged="lint-staged"

```

### 安装 husky

```bash
# 安装 husky
npm install husky -D
# 向 package.json 中添加 scripts `"prepare": "husky install",`
npm pkg set scripts.prepare="husky install"
# 运行 prepare script, 会在项目根目录中生成 `.husky` 文件夹和一些初始化脚本
npm run prepare
```

## 配置

## 配置 lint-staged

### `lint-staged.config.js`

```js
module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": [
    "prettier --write--parser json",
  ],
  "package.json": ["prettier --write"],
  "*.vue": ["eslint --fix", "prettier --write", "stylelint --fix"],
  "*.{scss,less,styl,html}": ["stylelint --fix", "prettier --write"],
  "*.md": ["prettier --write"],
};
```

## 配置 husky

```bash
npx husky add .husky/pre-commit "npm run lint:lint-staged"
```
