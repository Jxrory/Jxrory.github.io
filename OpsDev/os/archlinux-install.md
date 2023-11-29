# Arch Linux Install

## 查看是否已连接到网络

```sh
ip link
```

## 更新系统时间

```sh
timedatectl
```

## 存储空间处理

### 创建硬盘分区

查看硬盘分区
```sh
# 使用 fdisk
fdisk -l
# 使用 lsblk
lsblk -l
```

| 挂载点 | 分区 | 分区类型 | 建议大小 |
| --- | --- | --- | --- |
| /mnt/boot1 | /dev/sda1 | EFI 系统分区 | 至少 300 MiB。如果您打算安装多个内核，那就是至少 1 GiB。 |
| [SWAP] | /dev/sda2 | Linux swap (交换空间) | 大于 512 MiB。或者根据您的计算机的内存大小来决定。 |
| /mnt | /dev/sda3 | Linux x86-64 根目录 (/) | 剩余空间 |

### 格式化分区

```sh
# 格式化根分区
mkfs.ext4 /dev/sda3
# 格式化交换分区
mkswap /dev/sda2
# 格式化 efi 系统分区
mkfs.fat -F 32 /dev/sda1
```

### 挂载分区

```sh
# 将根磁盘卷挂载到 /mnt，例如：
mount /dev/sda3 /mnt
# 对于 UEFI 系统，挂载 EFI 系统分区：
mount --mkdir /dev/sda1 /mnt/boot
# 如果创建了交换空间卷，请使用 swapon(8) 启用它：
swapon /dev/sda2
```

## 开始安装系统

### 选择镜像站点

使用 `vim` 编辑器修改 `/etc/pacman.d/mirrorlist` 文件。将 `pacman` 软件仓库源更换为国内软件仓库镜像源：

```sh
vim /etc/pacman.d/mirrorlist
```

放在最上面的是会使用的软件仓库镜像源，推荐的镜像源如下：

```sh
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch # 中国科学技术大学开源镜像站
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch # 清华大学开源软件镜像站
Server = https://repo.huaweicloud.com/archlinux/$repo/os/$arch # 华为开源镜像站
Server = http://mirror.lzu.edu.cn/archlinux/$repo/os/$arch # 兰州大学开源镜像站
```

### 安装系统

#### 1. 通过如下命令使用 pacstrap 脚本安装基础包

```sh
pacstrap /mnt base base-devel linux linux-firmware
```

> base-devel —— base-devel 在 AUR 包的安装过程中是必须用到的
> linux —— 内核软件包，这里建议先不要替换为其它内核

#### 2. 通过如下命令使用 pacstrap 脚本安装其它必要的功能性软件：

```sh
pacstrap /mnt dhcpcd networkmanager vim sudo zsh zsh-completions
```

### 生成 fstab 文件

```sh
genfstab -U /mnt > /mnt/etc/fstab

# 复查一下 /mnt/etc/fstab 确保没有错误
cat /mnt/etc/fstab
```

### change root

```sh
arch-chroot /mnt
```

## 配置主机

### 1. 设置主机名 `/etc/hostname`

```sh
vim /etc/hostname
```

加入你想为主机取的主机名，这里比如叫 myarch。

加入如下内容

```sh
myarch
```

### 2. 修改 `/etc/hosts`

```sh
vim /etc/hosts
```

加入如下内容

```sh
127.0.0.1   localhost
::1         localhost
127.0.1.1   myarch.localdomain	myarch
```

### 3. 设置时区

在 /etc/localtime 下用 /usr 中合适的时区创建符号链接：

```sh
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

### 4. 设置硬件时间

使用如下命令将系统时间同步到硬件时间：

```sh
hwclock --systohc
```

### 5. 设置 Locale

1. 编辑 `/etc/locale.gen`，去掉 `en_US.UTF-8 UTF-8` 以及 `zh_CN.UTF-8 UTF-8` 行前的注释符号（`#`）：

```sh
vim /etc/locale.gen
```

2. 然后使用如下命令生成 locale：

```sh
locale-gen
```

3. 向 `/etc/locale.conf` 输入内容：

```sh
echo 'LANG=en_US.UTF-8'  > /etc/locale.conf
```

### 为 root 用户设置密码

```sh
passwd root
```

### 安装微码

通过以下命令安装对应芯片制造商的微码：

```sh
pacman -S intel-ucode # Intel
pacman -S amd-ucode # AMD
```

### 安装引导程序

```sh
pacman -S grub efibootmgr
```

> 命令参数说明：
> 
> -S 选项后指定要通过 pacman 包管理器安装的包：
> - grub —— 启动引导器
> - efibootmgr —— efibootmgr 被 grub 脚本用来将启动项写入 NVRAM

### 安装 GRUB 到 EFI 分区

```sh
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=ARCH
```

> --efi-directory=/boot —— 将 grubx64.efi 安装到之前的指定位置（EFI 分区）
> --bootloader-id=ARCH —— 取名为 ARCH

### 生成 GRUB 的配置文件

```sh
grub-mkconfig -o /boot/grub/grub.cfg
```

## 完成安装

```sh
exit # 退回安装环境
umount -R /mnt # 卸载新分区
reboot # 重启
```

### 重启配置网络

```sh
systemctl enable --now NetworkManager # 设置开机自启并立即启动 NetworkManager 服务
ping www.bilibili.com # 测试网络连接
```


参考：
- https://arch-linux.osrc.com/rookie/basic-install.html
- https://wiki.archlinuxcn.org/wiki/%E5%AE%89%E8%A3%85%E6%8C%87%E5%8D%97
