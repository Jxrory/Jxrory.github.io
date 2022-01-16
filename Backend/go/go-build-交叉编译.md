# go build 交叉编译

```bash
go env

GOARCH="amd64"
GOEXE=""
GOHOSTARCH="amd64"
GOHOSTOS="darwin"
GOOS="darwin"
GOROOT="/usr/local/go"
GOTOOLDIR="/usr/local/go/pkg/tool/darwin_amd64"
```

两个重要的环境变量 GOOS 和 GOARCH
其中 GOOS 指的是目标操作系统, 一共支持 10 种操作系统, 它的可用值为：

> 1. darwin
>
> 2. freebsd
>
> 3. linux
>
> 4. windows
>
> 5. android
>
> 6. dragonfly
>
> 7. netbsd
>
> 8. openbsd
>
> 9. plan9
>
> 10. solaris

GOARCH 指的是目标处理器的架构, 一共支持 9 种处理器的架构, 目前支持的有:

> 1. arm
>
> 2. arm64
>
> 3. 386
>
> 4. amd64
>
> 5. ppc64
>
> 6. ppc64le
>
> 7. mips64
>
> 8. mips64le
>
> 9. s390x

比如要生成 Linux 64 位的程序，命令如下：

```bash
GOOS=linux GOARCH=amd64 go build flysnow.org/hello
```

## 参考

[Golang build 命令解析](https://www.cnblogs.com/liuzhongchao/p/9365758.html)
