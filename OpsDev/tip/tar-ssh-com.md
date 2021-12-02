# tar命令和ssh配合使用

传输到远程：tar czf - file| ssh server "tar zxf -"

压缩到远程：tar czf - file| ssh server "cat > file.tar.gz"

解压到远程：ssh server "tar zxf -" < file.tar.gz

解压到本地：ssh server "cat file.tar.gz" | tar zxf -

## 参考

[http://blog.csdn.net/rosekin/article/details/18667291](http://blog.csdn.net/rosekin/article/details/18667291)