# Centos7 安装 docker

## 卸载旧版本

```bash
yum remove docker \
    docker-client \
    docker-client-latest \
    docker-common \
    docker-latest \
    docker-latest-logrotate \
    docker-logrotate \
    docker-engine
```

## 三种安装方式

### 使用 repository 安装

#### 设置 repository

```bash
yum install -y yum-utils

yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

#### 安装 Docker Engine

```bash
yum install docker-ce docker-ce-cli containerd.io
```

安装特定版本docker

```bash
# 查看docker版本
yum list docker-ce --showduplicates | sort -r

# 安装
yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io
```

#### 启动 Docker

```bash
systemctl start docker

# 跟随系统自重启
systemctl enable docker
```

#### 验证

```bash
docker run hello-world
```

## 卸载 docker

1. 卸载 Docker Engine, CLI, and Containerd 安装包

```bash
yum remove docker-ce docker-ce-cli containerd.io
```

2. 删除应用数据

```bash
rm -rf /var/lib/docker
rm -rf /var/lib/containerd
```

## 参考

[官网教程: Install Docker Engine on CentOS](https://docs.docker.com/engine/install/centos/)
