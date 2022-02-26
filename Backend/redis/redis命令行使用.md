# redis 命令行使用

## 连接 Redis

```bash
redis-cli -h <host> -p <port> -a <password>
```

## Redis 命令

```bash
# 在 redis 中认证
auth <password>

# 选择不同的数据库(数据库是: 0 ~ 9)
select 0

# 查询 key 中含有 mobile 字样的所有 key
keys *mobile*
```

### K-V

```bash
get <Key>

set <Key> <Value>
```

### List

```bash
# 查询 [key] 中 [start] 到 [end] 的元素
lrange key start end

# 查询 [key] 中所有元素
lrange key 0 -1

# 在 [key] 中添加 [element[s]] 
lpush key element [element...]

# 移除 [key] 中 [count] 个 [element]
lrem key count element
```
