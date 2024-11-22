# 搭建 Git 服务器

## 安装 git

```bash
# 查看是否存在git命令
git --version

# 安装git命令
yum install git -y
```

## 创建 git 用户

```bash
# 查询git用户是否存在
id git

# 创建git用户
adduser git
# 设置git用户的密码
passwd git
```

## 禁止 git 用户 ssh 登录服务器

为了安全，在服务器端创建的 git 用户不允许 ssh 登录服务器，编辑/etc/passwd，找到：

```conf
git:x::::/home/git:/bin/bash
```

修改为

```conf
git:x::::/home/git:/bin/git-shell
```

此时 git 用户可以正常通过 ssh 使用 git，但无法通过 ssh 登录系统。

## 服务器端创建 Git 仓库

```bash
# 创建 git 裸仓库
git init --bare /home/git/test.git

cd /home/git
# 修改权限
chown -R git:git test.git/
```

## 客户端 clone 远程仓库（密码连接）

从 Linux Git 服务器上 clone 项目：(`*.*.*.*` 出填写服务器端的 IP 地址)

```bash
git clone git@\*.\*.\*.\*:test.git
```

如果 SSH 用的不是默认的 22 端口，则需要使用以下的命令（假设 SSH 端口号是 7700）：

```bash
git clone ssh://git@\*.\*.\*.\*:7700test.git
```

## 客户端 clone 远程仓库（ssh 连接）

[SSH 使用秘钥登录服务器配置](../ssh/SSH秘钥登录服务器配置.md)

NOTICE: 需要将公钥配置到 `/home/git/authorized_keys` 中, 并修改权限

```bash
chown -R git:git /home/git
```

只要将仓库地址中替换成新建的 host 别名，通过下述命令即可免密从 Linux Git 服务器上 clone 项目

```bash
git clone git-server:test.git
```

参考: [https://bolerolily.github.io/2018/08/02/搭建 Git 服务器/](https://bolerolily.github.io/2018/08/02/%E6%90%AD%E5%BB%BAGit%E6%9C%8D%E5%8A%A1%E5%99%A8/)
