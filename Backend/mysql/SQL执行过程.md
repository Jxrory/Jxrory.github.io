# SQL执行过程

![sql 架构图](./_images/sqlite-arch2.gif)

大致可以分成两类:

- 前端
  - tokenizer
  - parser
  - code generator

- 后端
  - virtual machine
  - B-tree
  - pager
  - os interface

<!-- ## 虚拟机(virtual machine)

虚拟机将前端生成的字节码作为指令。然后它可以对一个或多个表或索引执行操作，每个表或索引都存储在称为 B树的数据结构中。 VM 本质上是一个关于字节码指令类型的大 switch 语句。

## B-tree

每个 B 树由许多节点组成。每个节点的长度为一页。 B 树可以通过向寻呼机发出命令来从磁盘检索页面或将其保存回磁盘。 -->

## 参考

[Let's Build a Simple Database](https://cstack.github.io/db_tutorial/)
