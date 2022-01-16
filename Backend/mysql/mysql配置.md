# mysql 配置

## mysql 无法插入 `0000-00-00 00:00:00` 值日期

**原因**: modified 字段的默认值不可用, 可以通过下面的 sql 查询看下

```sql
select @@GLOBAL.sql_mode
```

结果:
ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,**NO_ZERO_IN_DATE**,**NO_ZERO_DATE**,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION

**NO_ZERO_IN_DATE**,**NO_ZERO_DATE**这两个参数限制时间不能为 0.

## 解决方法

修改 sql_mode，取消时间不能为 0 的限制。

### 方法 1: 使用 sql 临时去除限制

```sql
SET @@GLOBAL.sql_mode='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'
```

此方法仅对当前服务有效，重启 MySQL 之后失效.

### 方法 2: 修改配置文件

在 `[mysqld]` 下, 增加如下配置:

```bash
[mysqld] # 当时没有注意未配置这项导致, 即使重启服务也没用
# delete NO_ZERO_IN_DATE,NO_ZERO_DATE
sql_mode=ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```

此方法重启 MySQL 之后永久有效。

**_Tips_**: 生产环境上是不允许重启 MySQL 服务的，所以可以结合方法 1 的方法 2 来解决上述问题，那么即便是有一天真的重启了 MySQL 服务，也会永久生效。

## 拓展阅读

更详细的文档可以阅读 MySQL 官方文档对 sql_mode 的说明，链接：[https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html)

## 参考

[MySQL 数据迁移报错 1067 - Invalid default value for 'xxx'](https://www.cnblogs.com/sgh1023/p/14419830.html)
