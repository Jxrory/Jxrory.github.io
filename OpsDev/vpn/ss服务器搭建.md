# 搭建 shadowsocks 服务器

## install

```bash
apt-get install python-pip
pip install shadowsocks
```

## start service

```bash
ssserver -p 443 -k password
```

后台运行

```bash
ssserver -p 443 -k password --user nobody -d start
```

停止

```bash
ssserver -d stop
```

检查日志

```bash
tail -f /var/log/shadowsocks.log
```

### 启动示例

```bash
ssserver -p 8837 -k [your_password] --user nobody -d start
```
