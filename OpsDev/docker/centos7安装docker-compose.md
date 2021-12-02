# 安装 docker-compose

## 安装

下载文件

```bash
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

添加执行权限

```bash
chmod +x /usr/local/bin/docker-compose
```

验证

```bash
docker-compose --version
```

## 卸载

```bash
rm /usr/local/bin/docker-compose
```

## 参考

[官网教程: Install Docker Compose](https://docs.docker.com/compose/install/)
