# mysql 配置

## mysql 无法插入 `0000-00-00 00:00:00` 值日期

**原因**: modified字段的默认值不可用, 可以通过下面的sql查询看下

```sql
select @@GLOBAL.sql_mode
```

结果:
ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,**NO_ZERO_IN_DATE**,**NO_ZERO_DATE**,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION

**NO_ZERO_IN_DATE**,**NO_ZERO_DATE**这两个参数限制时间不能为0.

## 解决方法

修改sql_mode，取消时间不能为0的限制。

### 方法1: 使用sql临时去除限制

```sql
SET @@GLOBAL.sql_mode='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'
```

此方法仅对当前服务有效，重启MySQL之后失效.

### 方法2: 修改配置文件

在 `[mysqld]` 下, 增加如下配置:

```bash
[mysqld] # 当时没有注意未配置这项导致, 即使重启服务也没用
# delete NO_ZERO_IN_DATE,NO_ZERO_DATE
sql_mode=ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```

此方法重启MySQL之后永久有效。

***Tips***: 生产环境上是不允许重启MySQL服务的，所以可以结合方法1的方法2来解决上述问题，那么即便是有一天真的重启了MySQL服务，也会永久生效。

## 拓展阅读

更详细的文档可以阅读MySQL官方文档对sql_mode的说明，链接：[https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html)

## 参考

[MySQL数据迁移报错1067 - Invalid default value for 'xxx'](https://www.cnblogs.com/sgh1023/p/14419830.html)
