# strongSwan 搭建 IKEv2 VPN 服务器

## 网络配置

防火墙开启 strongSwan 的需要的端口

```bash
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=500/udp
sudo firewall-cmd --permanent --add-port=4500/udp
```

允许 NAT 数据包转发，也称为 IP 伪装

```bash
sudo firewall-cmd --permanent --add-masquerade
```

重新加载防火墙以应用更改

```bash
sudo firewall-cmd --reload
```

在内核选项中启用 IP 数据包转发

```bash
echo "net.ipv4.ip_forward=1" | sudo tee /etc/sysctl.conf
sudo sysctl -p
```

## 安装

```bash
sudo yum install -y epel-release
sudo yum install -y strongswan
```

## 创建安装证书

```bash
strongswan pki --gen --outform pem > ca.key.pem

strongswan pki --self --in ca.key.pem --dn "C=CN, O=one, CN=one t CA" --ca --lifetime 3650 --outform pem > ca.cert.pem

strongswan pki --gen --outform pem > server.key.pem

strongswan pki --pub --in server.key.pem --outform pem > server.pub.pem

strongswan pki --pub --in server.key.pem | strongswan pki --issue --lifetime 3601 --cacert ca.cert.pem --cakey ca.key.pem --dn "C=CN, O=one, CN=one t CA" --san="你的服务器公网ip" --flag serverAuth --flag ikeIntermediate --outform pem > server.cert.pem
```

```bash
cp -r ca.key.pem /etc/strongswan/ipsec.d/private/
cp -r ca.cert.pem /etc/strongswan/ipsec.d/cacerts/
cp -r server.cert.pem /etc/strongswan/ipsec.d/certs/
cp -r server.pub.pem /etc/strongswan/ipsec.d/certs/
cp -r server.key.pem /etc/strongswan/ipsec.d/private/
```

## 配置文件修改

备份配置文件

```sh
mv /etc/strongswan/ipsec.conf{,.old}
mv /etc/strongswan/ipsec.secrets{,.old}
```

### ipsec.conf

```bash
vi /etc/strongswan/ipsec.conf
```

```text
config setup
    uniqueids=never #允许多个客户端使用同一个证书

conn %default  #定义连接项, 命名为 %default 所有连接都会继承它
    compress = yes #是否启用压缩, yes 表示如果支持压缩会启用.
    dpdaction = clear #当意外断开后尝试的操作, hold, 保持并重连直到超时.
    dpddelay = 30s #意外断开后尝试重连时长
    dpdtimeout = 60s #意外断开后超时时长, 只对 IKEv1 起作用
    inactivity = 300s #闲置时长,超过后断开连接.
    leftdns = 8.8.8.8,8.8.4.4 #指定服务端与客户端的dns, 多个用","分隔
    rightdns = 8.8.8.8,8.8.4.4

conn IKEv2-BASE
    leftca = "C=CN, O=one, CN=one t CA" #服务器端根证书DN名称，与 --dn 内容一致
    leftsendcert = always #是否发送服务器证书到客户端
    rightsendcert = never #客户端不发送证书

conn IKEv2-EAP
    keyexchange=ikev2       #默认的密钥交换算法, ike 为自动, 优先使用 IKEv2
    left=%any       #服务器端标识,%any表示任意
    leftid= 149.28.92.60     #服务器端ID标识，你的服务器公网ip
    leftsubnet=0.0.0.0/0        #服务器端虚拟ip, 0.0.0.0/0表示通配.
    leftcert = server.cert.pem     #服务器端证书
    leftauth=pubkey     #服务器校验方式，使用证书
    right=%any      #客户端标识，%any表示任意
    rightsourceip = 10.0.0.0/16    #客户端IP地址分配范围
    rightauth=eap-mschapv2  #eap-md5#客户端校验方式#KEv2 EAP(Username/Password)
    also=IKEv2-BASE
    eap_identity = %any #指定客户端eap id
    rekey = no #不自动重置密钥
    fragmentation = yes #开启IKE 消息分片
    auto = add  #当服务启动时, 应该如何处理这个连接项. add 添加到连接表中.

#ios 和 mac Psk连接，无需证书 (EAP账号密码及psk)
#android Psk 连接，无需证书（XAUTH账户密码及psk）
conn Android_Ios_Mac_XauthPSK
     keyexchange=ikev1
     ike=aes128-aes256-sha1-modp3072-modp2048,3des-sha1-md5-modp1024,aes256-sha512-modp4096,aes128-sha256-modp3072
     esp=aes128-sha1,aes256-sha256_96,3des-sha1,aes256-sha1
     left=%defaultroute
     leftauth=psk
     leftsubnet=0.0.0.0/0
     right=%any
     rightauth=psk
     rightauth2=xauth
     rightsourceip=10.0.0.0/16
     auto=add
```

### ipsec.secrets

```bash
vi /etc/strongswan/ipsec.secrets
```

```text
# ipsec.secrets - strongSwan IPsec secrets file
#使用证书验证时的服务器端私钥
#格式 : RSA <private key file> [ <passphrase> | %prompt ]
: RSA server.key.pem

#使用预设加密密钥, 越长越好
#格式 [ <id selectors> ] : PSK <secret>
: PSK "pOneAA123456"

#EAP 方式, 格式同 psk 相同 (用户名/密码 例：oneAA/oneTT)
eOneAA : EAP "eOneTT"

#XAUTH 方式, 只适用于 IKEv1
#格式 [ <servername> ] <username> : XAUTH "<password>"
xOneAA : XAUTH "xOneTT"
```

### 启动

```bash
systemctl start strongswan

# 开机自启动
#systemctl enable strongswan
```

#### 参考

[https://www.vultr.com/zh/docs/install-a-strongswan-ipsec-vpn-server-on-centos-7](https://www.vultr.com/zh/docs/install-a-strongswan-ipsec-vpn-server-on-centos-7)

[https://blog.csdn.net/qq_29364417/article/details/80713440](https://blog.csdn.net/qq_29364417/article/details/80713440)

[https://support.aklwebhost.com/knowledgebase/using-strongswan-for-ipsec-vpn-on-centos-7/](https://support.aklwebhost.com/knowledgebase/using-strongswan-for-ipsec-vpn-on-centos-7/)

[https://blog.andreev.it/?p=3847](https://blog.andreev.it/?p=3847)

[https://www.tecmint.com/setup-ipsec-vpn-with-strongswan-on-centos-rhel-8](https://www.tecmint.com/setup-ipsec-vpn-with-strongswan-on-centos-rhel-8)
