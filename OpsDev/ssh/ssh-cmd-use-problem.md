# SSH SCP CMD

## ssh 使用

**ssh scp 加端口请求**:

```bash
ssh -p 2250 root@127.0.0.1

## scp 使用 -P
scp -P 2250 ROOT.war root@127.0.0.1:~
```

## tar 命令和 ssh 配合使用

传输到远程：tar czf - file| ssh server "tar zxf -"

压缩到远程：tar czf - file| ssh server "cat > file.tar.gz"

解压到远程：ssh server "tar zxf -" < file.tar.gz

解压到本地：ssh server "cat file.tar.gz" | tar zxf -

## 端口映射

```sh
# 将服务器上的3306端口映射到本地，可以通过本地的 3306 端口访问数据库
ssh -L 3306:127.0.0.1:3306 wb-server -N
```

## 参考

- [http://blog.csdn.net/rosekin/article/details/18667291](http://blog.csdn.net/rosekin/article/details/18667291)
