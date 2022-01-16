# SSH Config

## 配置文件位置

- ～/.ssh/config 用户配置文件。
- /etc/ssh/ssh_config 系统配置文件。

ssh 读取配置文件的**优先级**为：

- 命令行参数。
- 用户配置文件(~/.ssh/config)。
- 系统配置文件(/etc/ssh/ssh_config)。

## 一般格式

```text
Host *
  ControlMaster auto
  ControlPath ~/.ssh/%h-%p-%r
  ControlPersist yes

Host server-alias
  HostName 129.12.12.122
  Port 22
  User root
  IdentityFile ~/mykey/SSH/id_rsa

Host text.com
  Port 22222
  User text
```

## 参数

### 普通参数

- Host ：描述参数的作用范围。
- HostName ：ip 或域名。当 Host 参数已经指明时可以不用指定该参数。
- User ：用户名。
- Port ：ssh 端口号，默认 22。

### 连接参数

- ServerAliveInterval ：发送心跳包到服务器的时间间隔(秒)。当 ssh 连接不稳定或不可靠时，你希望知道链接是否可用。
- LogLevel ：客户端记录日志的级别。对无需记录日志或者调试 ssh 链接时非常有用，可选参数从无到繁分别是：QUIET, FATAL, ERROR, INFO, VERBOSE, DEBUG1, DEBUG2, and DEBUG3。
- StrictHostKeyChecking ：是否自动校验服务端的 host key 并写入 know_hosts。默认是询问(ask)，设置为 no 则会自动写入，当你需要链接大量服务器端时很有用，但也会产生安全问题，所以请谨慎使用。
- UserKnownHostsFile ：know_hosts 的存放位置。一般无需单独配置该项，当 StrictHostKeyChecking 设置为’no’时，可以设置为/dev/null。
- VisualHostKey ：设置为 yes 可以告诉服务端以 ASCII 的格式返回服务器 host key。我不知道有啥用，那个 ASCII 图不太能看懂。
- Compression ：开启数据压缩。当你的链接很慢或者需要 scp 时会很有用，一般用户无需这个参数。
- ConnectTimeout ：设置超时时间来覆盖系统默认的 TCP 连接超时时间。

### 转发参数

### 关于 key 的参数

- IdentityFile ：为每个链接指定私钥文件的位置。当你的私钥文件不在默认位置(比如~/.ssh/id_rsa)或者你有多个不同功能的私钥文件时会很有用。
- IdentitiesOnly ：强制使用 config 文件内配置的某一私钥文件。当你有 2 个以上的私钥文件可用时会用到这个参数。
- IdentityAgent ：Specifies the UNIX-domain socket used to communicate with the authentication agent.

### 多路复用单个 TCP 链接

这个很有用，可以大幅提升 ssh 连接速度。

- ControlMaster ：当多路复用可用时是否开启。设置为 auto 即可启用。
- ControlPath ：设置 socket 文件的位置和文件名格式，比如可以设置为~/.ssh/%h-%p-%r。参考 TOKEN 的内容。
- ControlPersist ：复用链接的持续时间。可设置位为整数(秒)、4h(小时)、yes(长时间)等。

### 权限认证

- PasswordAuthentication ：设置是否开启密码认证。可选参数只能为 yes 或者 no(默认为 no)。
- PubkeyAuthentication：设置是否开启密钥认证。可选参数只能为 yes 或者 no(默认为 yes)。

### 执行命令

- LocalCommand ：连接服务器成功时在本地执行的命令。除非启用下面的 PermitLocalCommand，否则该参数会被直接忽略。
- PermitLocalCommand ：运行本地执行命令。
- RemoteCommand ：连接服务器成功时在服务器端执行的命令。比如启动 tmux。

### TOKEN

```text
%%    A literal `%'.
%C    Shorthand for %l%h%p%r.
%d    Local user's home directory.
%h    The remote hostname.
%i    The local user ID.
%L    The local hostname.
%l    The local hostname, including the domain name.
%n    The original remote hostname, as given on the command line.
%p    The remote port.
%r    The remote username.
%u    The local username.
```

- Match exec accepts the tokens %%, %h, %L, %l, %n, %p, %r, and %u.
- CertificateFile accepts the tokens %%, %d, %h, %l, %r, and %u.
- ControlPath accepts the tokens %%, %C, %h, %i, %L, %l, %n, %p, %r, and %u.
- HostName accepts the tokens %% and %h.
- IdentityAgent and IdentityFile accept the tokens %%, %d, %h, %l, %r, and 1. %u.
- LocalCommand accepts the tokens %%, %C, %d, %h, %l, %n, %p, %r, and %u.
- ProxyCommand accepts the tokens %%, %h, %p, and %r.
- RemoteCommand accepts the tokens %%, %C, %d, %h, %l, %n, %p, %r, and %u.

## 参考

[ssh 的 config 配置参数说明](http://goingmerry.cn/2018/01/24/ssh-config/)
