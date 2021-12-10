# 在工作中碰到的一些 Mysql 配置问题

## 表名区分大小写问题

### 问题描述

spring-boot 整合quartz的时候, 启动就报错：`Failure obtaining db row lock: Table ‘test.QRTZ_LOCKS’ doesn’t exist`

数据库中是有 `qrtz_locks` 表的.

### 解决

#### 方案一

最快的解决办法，就是将所有quartz开头的表，都换成大写就好了

#### 方案二

配置文件中设置 `lower_case_table_names=1` 忽略大小写.

**1. 查看配置**:

```sql
show variables like '%lower_case_table_names%';
```

**2. 修改/etc/my.cnf文件**:

在文件末尾加`lower_case_table_names=1`

```bash
echo 'lower_case_table_names=1' >> /etc/my.cnf
```

**3. 重启服务**:

```bash
service mysqld restart
```

**4. 检查修改是否生效**:

```sql
show variables like '%lower_case_table_names%';
```

## 参考

[quartz 报错：Failure obtaining db row lock: Table ‘test.QRTZ_LOCKS‘ doesn‘t exist](https://www.daimajiaoliu.com/daima/712654509363408)