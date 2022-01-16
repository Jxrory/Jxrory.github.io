# 使用 element 开发遇到的一些问题

## element 表格自定义表头数据不更新的问题

element 官网上 slot=“header”，这种写法，template 内的变量，打印出来的一直是初始值，将 slot=“header” 改成#header ，就可以了, why?

![element-head-flash-problem](/Frontend/vue/element/_images/element-head-flash-fix.jpg)
