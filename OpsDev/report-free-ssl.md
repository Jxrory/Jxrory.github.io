# 免费的 SSL 证书调研

> 国内免费的 SSL 一般有时限且无法免费续期, 直接跳过.

记录下两个可以自动免费续期的工具:

## certbot

```text
- 推荐指数：★★★☆☆
- 免费证书类型：DV 域名型
- 免费证书品牌：Let’s Encrypt
- 免费通配符证书：支持
- 易操作性：困难
- 证书有效期： 90天
- 自动更新：支持
- 自动部署： 支持
```

再说下这个 certbot：certbot 是一个脚本类型的 Let’s Encrypt 证书申请客户端，需要一定的命令行使用经验方可操作，如需自动更新，还需要添加插件，使用起来比较困难。如有自动更新和自动部署需求，建议使用下面介绍的 acme.sh 和 ohttps。

网址：[https://certbot.eff.org](https://certbot.eff.org)

### acme.sh

```text
- 推荐指数：★★★★★
- 免费证书类型：DV 域名型
- 免费证书品牌：Let’s Encrypt
- 免费通配符证书：支持
- 易操作性：一般
- 证书有效期： 90天
- 自动更新：支持
- 自动部署： 支持
```

acme.sh 是一个知名的用于申请 Let’s Encrypt 证书的开源项目，也是属于脚本类型，有比较详细的文档，支持自动化更新和自动化部署。**唯一缺点，如果有更新后自动部署至多个节点的需求的话，acme.sh 无法满足**。如果你有一定的命令行使用经验，acme.sh 使用起来还是非常方便，强烈推荐！关于更新后自动部署至多个节点的需求，建议使用下面介绍的 ohttps。

网址：[https://acme.sh](https://acme.sh)

### OHTTPS

```text
- 推荐指数：★★★★★
- 免费证书类型：DV 域名型
- 免费证书品牌：Let’s Encrypt
- 免费通配符证书：支持
- 易操作性：简单
- 证书有效期： 90天
- 自动更新：支持
- 自动部署： 支持
```

http://ohttps.com 提供了类似于 acme.sh 的功能，不过提供了友好的管理界面，可申请 Let’s Encrypt 免费通配符类型证书，还提供了证书吊销、到期前提醒、自动更新、自动部署功能。另外比 acme.sh 增加了一些非常实用的功能，主要包括可自动部署至阿里云、腾讯云、七牛云的负载均衡、内容分发 CDN、SSL 证书列表等，并可自动部署至多个 nginx 容器中。如果你有在证书更新后自动部署至多个不同节点的需求，使用http://ohttps.com就对了，在这里强烈推荐大家使用http://ohttps.com申请和管理Let’s Encrypt 颁发的免费 HTTPS 证书。

网址：[https://ohttps.com](https://ohttps.com)

## 总结

`OHTTPS` 在注册的时候存在问题, 最后选择了 `acme.sh`, 相关文档可以看下 [acme.sh 安装使用](/OpsDev/ssl-acme.sh.md)

## 参考

[33 种免费获取 SSL 证书的方式](https://zhuanlan.zhihu.com/p/174755007)
