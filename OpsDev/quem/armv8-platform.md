

#### ubuntu ap-get

```sh
# 安装工具
apt-get install make vim tar

# 安装编译工具
apt-get install gcc gcc-aarch64-linux-gnu

# 安装 qemu 模拟器
apt-get install qemu-system-arm
```

Q: 编译问题

```text
root@3ebbf3a5d03f:/opt/linux-5.19.9# make defconfig
  HOSTCC  scripts/basic/fixdep
2023-12-11 23:15:10   HOSTCC  scripts/kconfig/conf.o
2023-12-11 23:15:11   HOSTCC  scripts/kconfig/confdata.o
2023-12-11 23:15:11   HOSTCC  scripts/kconfig/expr.o
2023-12-11 23:15:11   LEX     scripts/kconfig/lexer.lex.c
2023-12-11 23:15:11 /bin/sh: 1: flex: not found
2023-12-11 23:15:11 make[1]: *** [scripts/Makefile.host:9: scripts/kconfig/lexer.lex.c] Error 127
2023-12-11 23:15:11 make: *** [Makefile:629: defconfig] Error 2
```

解决方法：安装编译内核所需依赖
```sh
apt-get install libncurses-dev flex bison openssl libssl-dev dkms libelf-dev libudev-dev libpci-dev libiberty-dev autoconf
```


Q: 编译问题： `bc: not found`

```text
2023-12-11 23:24:15   DTC     arch/arm64/boot/dts/renesas/r8a774e1-hihope-rzg2h-ex-mipi-2.1.dtb
2023-12-11 23:24:15 /bin/sh: 1: bc: not found
2023-12-11 23:24:15 make[1]: *** [Kbuild:24: include/generated/timeconst.h] Error 127
2023-12-11 23:24:15 make: *** [Makefile:1204: prepare0] Error 2
2023-12-11 23:24:15 make: *** Waiting for unfinished jobs....
```

解决方法：

```sh
apt-get install bc
```