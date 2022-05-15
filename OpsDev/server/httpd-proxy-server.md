# Apache Httpd 架设代理服务器

## 下载安装

[https://www.apachehaus.com/cgi-bin/download.plx](https://www.apachehaus.com/cgi-bin/download.plx)

## windows 开启守护进程

```batch
# NOTICE: 使用 管理员帐户 执行
httpd.exe -k install
```

## 配置并启动

编辑 `conf\httpd.conf` 配置文件

```conf
# 修改 SRVROOT 到安装目录
Define SRVROOT "D:\tools\Apache24"
```

> PS：如果出现 vcruntime140.dll 缺失，则需要安装 VC++2015.

## 加载代理模块

编辑 `conf\httpd.conf` 配置文件, 找到以下模块，把它们前面的【#】去掉。HTTP 、FTP 、HTTPS sites

```conf
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_connect_module modules/mod_proxy_connect.so
LoadModule proxy_http_module modules/mod_proxy_http.so
LoadModule proxy_ftp_module modules/mod_proxy_ftp.so

LoadModule access_compat_module modules/mod_access_compat.so

##【新版不加载这模块会Invalid command 'Order'错误无法启动】
```

末尾添加以下内容

```conf
ProxyRequests   On
<Proxy *>
    Order allow,deny
    Allow from all
</Proxy>
```

### 修改端口

把 Listen 80 改成以下内容：

```conf
Listen 8080
```

## **重启 httpd.exe 文件**

## 参考

- [https://blog.csdn.net/choubai1541/article/details/100740906](https://blog.csdn.net/choubai1541/article/details/100740906)
