# acme.sh 安装使用

**主要步骤**:

1. 安装 acme.sh
2. 生成证书
3. copy 证书到 nginx/apache 或者其他服务
4. 更新证书
5. 更新 acme.sh
6. 出错怎么办, 如何调试

## 安装 acme.sh

```bash
curl  https://get.acme.sh | sh -s email=my@example.com
```

## 生成证书

有两种验证方式: http 和 dns 验证

### http

!> 只能申请单个域名, 泛域名需要用dns方式申请

```bash
acme.sh  --issue  -d mydomain.com -d www.mydomain.com  --webroot  /home/wwwroot/mydomain.com/
```

### dns

#### 手动方式

**手动在域名上添加一条 txt 解析记录, 验证域名所有权.**

```bash
acme.sh  --issue  --dns   -d mydomain.com \
 --yes-I-know-dns-manual-mode-enough-go-ahead-please
```

acme.sh 会生成相应的解析记录显示出来, 你只需要在你的域名管理面板中添加这条 txt 记录即可.

等待解析完成之后, 重新生成证书:

```bash
acme.sh  --renew   -d mydomain.com \
  --yes-I-know-dns-manual-mode-enough-go-ahead-please
```

注意第二次这里用的是 `--renew`

#### 自动方式

!> 需要DNS服务商提供 api 支持

以 dnspod 为例, 你需要先登录到 dnspod 账号, 生成你的 api id 和 api key, 都是免费的. 然后:

```bash
export DP_Id="1234"

export DP_Key="sADDsdasdgdsf"

acme.sh --issue --dns dns_dp -d aa.com -d www.aa.com
```

证书就会自动生成了. 这里给出的 api id 和 api key 会被自动记录下来, 将来你在使用 dnspod api 的时候, 就不需要再次指定了. 直接生成就好了:

```bash
acme.sh  --issue   -d  mydomain2.com   --dns  dns_dp
```

### copy/安装 证书

| 文件名 | 简述 |
| ------------- | ---------------------------------------- |
| ca.cer        | 中间证书和根证书                         |
| nginx.cn.cer  | 你申请的ssl证书                          |
| fullchain.cer | 包括了 ca.cer 和 nginx.cn.cer 的全链证书 |
| nginx.cn.key  | 证书的私钥                               |

**Nginx example**:

```bash
acme.sh --install-cert -d example.com \
--key-file       /path/to/keyfile/in/nginx/key.pem  \
--fullchain-file /path/to/fullchain/nginx/cert.pem \
--reloadcmd     "service nginx force-reload"
```

> 一个小提醒, 这里用的是 service nginx force-reload, 不是 service nginx reload, 据测试, reload 并不会重新加载证书, 所以用的 force-reload

Nginx 的配置 `ssl_certificate` 使用 `/etc/nginx/ssl/fullchain.cer` ，而非 `/etc/nginx/ssl/<domain>.cer` ，否则 SSL Labs 的测试会报 `Chain issues Incomplete` 错误。

## 更新证书

目前证书在 60 天以后会自动更新, 你无需任何操作. 今后有可能会缩短这个时间, 不过都是自动的, 你不用关心.

## 更新 acme.sh

升级 acme.sh 到最新版

```bash
acme.sh --upgrade
```

自动升级

```bash
acme.sh  --upgrade  --auto-upgrade
```

关闭自动更新

```bash
acme.sh --upgrade  --auto-upgrade  0
```

## nginx ssl 配置

[nginx config - ssl 配置](/OpsDev/nginx-config.md)

## 参考

[acme.sh wiki](https://github.com/acmesh-official/acme.sh/wiki/%E8%AF%B4%E6%98%8E)
[腾讯云域名使用acme.sh签发letsencrypt的wildcard](https://blog.axis-studio.org/2019/04/05/%E8%85%BE%E8%AE%AF%E4%BA%91%E5%9F%9F%E5%90%8D%E4%BD%BF%E7%94%A8acme-sh%E7%AD%BE%E5%8F%91letsencrypt%E7%9A%84wildcard/index.html)
[dns-api](https://github.com/acmesh-official/acme.sh/wiki/dnsapi#2-dnspodcn-option)
[根证书、服务器证书、用户证书的区别](https://www.nginx.cn/5559.html)
