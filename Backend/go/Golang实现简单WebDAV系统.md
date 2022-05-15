# Golang 实现简单 WebDAV 系统

**WebDAV （Web-based Distributed Authoring and Versioning）** 一种基于 HTTP1.1 协议的通信协议。它扩展了 HTTP 1.1，在 GET、POST、HEAD 等几个 HTTP 标准方法以外添加了一些新的方法，使应用程序可对 Web Server 直接读写，并支持写文件锁定(Locking)及解锁(Unlock)，还可以支持文件的版本控制。

[Caddy](https://caddyserver.com/)

## Go 实现 WebDAV

### 初版

```go
package main

import (
    "flag"
    "fmt"
    "golang.org/x/net/webdav"
    "net/http"
)

func main() {
    var addr *string
    var path *string
    addr = flag.String("addr", ":8080", "") // listen端口，默认8080
    path = flag.String("path", ".", "") // 文件路径，默认当前目录
    flag.Parse()
    fmt.Println("addr=", *addr, ", path=", *path) // 在控制台输出配置
    http.ListenAndServe(*addr, &webdav.Handler{
        FileSystem: webdav.Dir(*path),
        LockSystem: webdav.NewMemLS(),
    })
}
```

```go
package main

import (
    "flag"
    "fmt"
    "golang.org/x/net/webdav"
    "net/http"
)

func main() {
    var addr *string
    var path *string
    //
    addr = flag.String("addr", ":8080", "")
    path = flag.String("path", ".", "")
    flag.Parse()

    fs := &webdav.Handler{
        FileSystem: webdav.Dir(*path),
        LockSystem: webdav.NewMemLS(),
    }
    http.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
        // 获取用户名/密码
        username, password, ok := req.BasicAuth()
        if !ok {
            w.Header().Set("WWW-Authenticate", `Basic realm="Restricted"`)
            w.WriteHeader(http.StatusUnauthorized)
            return
        }
        // 验证用户名/密码
        if username != "user" || password != "123456" {
            http.Error(w, "WebDAV: need authorized!", http.StatusUnauthorized)
            return
        }
        fs.ServeHTTP(w, req)
    })
    fmt.Println("addr=", *addr, ", path=", *path)
    http.ListenAndServe(*addr, nil)
}
```

```go
package main
import (
    "flag"
    "fmt"
    "net/http"
    "os"
    "golang.org/x/net/webdav"
)
var (
    flagRootDir   = flag.String("dir", "", "webdav root dir")
    flagHttpAddr  = flag.String("http", ":80", "http or https address")
    flagHttpsMode = flag.Bool("https-mode", false, "use https mode")
    flagCertFile  = flag.String("https-cert-file", "cert.pem", "https cert file")
    flagKeyFile   = flag.String("https-key-file", "key.pem", "https key file")
    flagUserName  = flag.String("user", "", "user name")
    flagPassword  = flag.String("password", "", "user password")
    flagReadonly  = flag.Bool("read-only", false, "read only")
)
func init() {
    flag.Usage = func() {
        fmt.Fprintf(os.Stderr, "Usage of WebDAV Server\n")
        flag.PrintDefaults()
    }
}
func main() {
    flag.Parse()
    fs := &webdav.Handler{
        FileSystem: webdav.Dir(*flagRootDir),
        LockSystem: webdav.NewMemLS(),
    }
    http.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
        if *flagUserName != "" && *flagPassword != "" {
            username, password, ok := req.BasicAuth()
            if !ok {
                w.Header().Set("WWW-Authenticate", `Basic realm="Restricted"`)
                w.WriteHeader(http.StatusUnauthorized)
                return
            }
            if username != *flagUserName || password != *flagPassword {
                http.Error(w, "WebDAV: need authorized!", http.StatusUnauthorized)
                return
            }
        }
        if *flagReadonly {
            switch req.Method {
            case "PUT", "DELETE", "PROPPATCH", "MKCOL", "COPY", "MOVE":
                http.Error(w, "WebDAV: Read Only!!!", http.StatusForbidden)
                return
            }
        }
        fs.ServeHTTP(w, req)
    })
    if *flagHttpsMode {
        fmt.Println("HTTPS", "addr=", *flagHttpAddr, ", path=", *flagRootDir)
        http.ListenAndServeTLS(*flagHttpAddr, *flagCertFile, *flagKeyFile, nil)
    } else {
        fmt.Println("HTTP", "addr=", *flagHttpAddr, ", path=", *flagRootDir)
        http.ListenAndServe(*flagHttpAddr, nil)
    }
}
```

## 参考

[Golang 实现简单 WebDAV 系统](https://www.cnblogs.com/singinger/p/13433780.html)
