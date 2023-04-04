# cz-git 配置

## 安装

```bash
# 全局安装命令 `cz` 或 `git cz`
npm install -g commitizen

# 下载依赖
npm install -D cz-git
```

## 配置

### 修改 `package.json` 添加 `config` 指定使用的适配器

```json
{
  "scripts": {
    // ...
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```

### 添加自定义配置(可选，使用默认)

NOTICE: 后面配置 `commitlint` 再处理;

(推荐) `cz-git` 与 `commitlint` 进行联动给予校验信息，所以可以编写于 `commitlint` 配置文件之中。

```js
// .commitlintrc.js
/** @type {import('cz-git').UserConfig} */
module.exports = {
  rule: {
    ...
  },
  prompt: {
    useEmoji: true
    //option...
  }
}
```
