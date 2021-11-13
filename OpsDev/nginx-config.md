# nginx config

## ssl 配置

```nginx
    # 80 转 443
    server{
        listen 80;
        server_name *.jxrory.com; # 范域名
        rewrite ^(.*)$ https://$host$1  permanent;
    }

    # HTTPS server
    server {
       listen       443 ssl;
       server_name  jxrory.com;

       ssl_certificate      /etc/nginx/ssl/cert.pem;
       ssl_certificate_key  /etc/nginx/ssl/key.pem;

       ssl_session_cache    shared:SSL:1m;
       ssl_session_timeout  5m;

       ssl_ciphers  HIGH:!aNULL:!MD5;
       ssl_prefer_server_ciphers  on;

       location / {
           root   html;
           index  index.html index.htm;
       }
    }
```

## 参考

[nginx配置80端口转发到443](https://www.cnblogs.com/huningfei/p/12971693.html)
