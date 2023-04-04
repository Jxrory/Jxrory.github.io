# Vue 前端开发规范 - Vscode

## 涉及的工具

```json
{
  "recommendations": [
    // vue 开发插件
    "vue.volar",
    // vue typescript 开发插件
    "vue.vscode-typescript-vue-plugin",

    // 编辑器配置
    "editorconfig.editorconfig",
    // prettier: 代码格式化
    "esbenp.prettier-vscode",
    // eslint: 代码规范检查
    "dbaeumer.vscode-eslint",
    // stylelint
    "stylelint.vscode-stylelint",
    // 单词拼写错误标识
    "streetsidesoftware.code-spell-checker",
    // sass
    "syler.sass-indented"
  ]
}
```

## editor config

`.editorconfig` 配置:

```conf
# @see: http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
end_of_line = lf # 控制换行类型(lf | cr | crlf)
insert_final_newline = true # 始终在文件末尾插入一个新行
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
max_line_length = 130 # 最大行长度

[*.md] # 表示仅对 md 文件适用以下规则
max_line_length = off # 关闭最大行长度限制
trim_trailing_whitespace = false # 关闭末尾空格修剪

```
