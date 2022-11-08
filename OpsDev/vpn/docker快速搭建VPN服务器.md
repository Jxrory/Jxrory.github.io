# Docker 快速搭建 VPN 服务器

## 拉取镜像

```sh
docker pull kylemanna/openvpn
```

## 搭建

### 1. 创建 `volume`

```sh
export OVPN_DATA="ovpn-data-jxrory"
docker volume create --name $OVPN_DATA
```

### 2. 生成 vpn 服务器配置文件

```sh
# 生成配置文件
docker run -v $OVPN_DATA:/etc/openvpn --rm kylemanna/openvpn ovpn_genconfig -u udp://vpn.jxrory.com
# 初始化 pki, NOTICE: 需要设置pki密码,否则无法生成pki
docker run -v $OVPN_DATA:/etc/openvpn --rm -it kylemanna/openvpn ovpn_initpki
```

### 3. 启动 vpn 服务器

```sh
docker run -v $OVPN_DATA:/etc/openvpn -d -p 1194:1194/udp --cap-add=NET_ADMIN --name=openvpn kylemanna/openvpn
```

### 4. 生成链接 VPN 服务器配置

```sh
NAME=jxrory-mac

# 生成客户端配置文件
docker run -v $OVPN_DATA:/etc/openvpn --rm -it kylemanna/openvpn easyrsa build-client-full $NAME nopass
# 导出客户端配置文件
docker run -v $OVPN_DATA:/etc/openvpn --rm kylemanna/openvpn ovpn_getclient $NAME > $NAME.ovpn
```
