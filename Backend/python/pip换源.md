# pip 换源

## pip 镜像站

- 阿里云 [http://mirrors.aliyun.com/pypi/simple/](http://mirrors.aliyun.com/pypi/simple/)
- 中国科技大学 [https://pypi.mirrors.ustc.edu.cn/simple/](https://pypi.mirrors.ustc.edu.cn/simple/)
- 豆瓣(douban) [http://pypi.douban.com/simple/](http://pypi.douban.com/simple/)
- 清华大学 [https://pypi.tuna.tsinghua.edu.cn/simple/](https://pypi.tuna.tsinghua.edu.cn/simple/)
- 中国科学技术大学 [http://pypi.mirrors.ustc.edu.cn/simple/](http://pypi.mirrors.ustc.edu.cn/simple/)

## pip 配置镜像

### Linux

修改 ~/.pip/pip.conf (没有就创建一个)， 修改 index-url 至 tuna，内容如下：

```text
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```

### Windows

直接在 user 目录中创建一个 pip 目录，如：C:\Users\xx\pip，新建文件 pip.ini，内容如下

```text
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```

> **请注意：一定是在你个人用户文件夹下先建立 pip 文件夹，在建立 pip.ini 文件，不是直接把 pip.ini 文件放在 C:\Users\xx\下**

## pip 临时镜像

临时使用：

可以在使用 pip 的时候加参数 `-i https://pypi.tuna.tsinghua.edu.cn/simple`

```bash
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple gevent
```

**参考**

[https://www.cnblogs.com/sky-ai/p/9800036.html](https://www.cnblogs.com/sky-ai/p/9800036.html)

[https://developer.aliyun.com/article/652884](https://developer.aliyun.com/article/652884)
