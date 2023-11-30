# Centos7 Docker 换源

首先创建文件 /etc/docker/daemon.json

```shell
vim /etc/docker/daemon.json
```

添加镜像地址，写入下面内容

```json
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com/",
    "https://docker.mirrors.ustc.edu.cn/"
  ]
}
```

重启 docker 以及 daemon

```shell
systemctl daemon-reload
systemctl restart docker
```
