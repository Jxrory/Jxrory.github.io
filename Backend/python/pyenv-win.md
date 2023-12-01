# pyenv windows

## 安装 pyenv

### 使用 powershell 脚本安装

直接下载脚本：[install-pyenv-win.ps1](./other/install-pyenv-win.ps1)

或者使用命令下载安装

```powershell
Invoke-WebRequest -UseBasicParsing -Uri "https://raw.githubusercontent.com/pyenv-win/pyenv-win/master/pyenv-win/install-pyenv-win.ps1" -OutFile "./install-pyenv-win.ps1"; &"./install-pyenv-win.ps1"
```


遇到的问题：

> 无法加载文件 C:\Users\xxxxxxxx\rename.ps1，因为在此系统上禁止运行脚本

```powershell
# 查看当前的执行策略
get-executionpolicy

# 以管理员身份打开PowerShell
set-executionpolicy remotesigned
```

### 手动安装

下载地址：[https://github.com/pyenv-win/pyenv-win/archive/master.zip](https://github.com/pyenv-win/pyenv-win/archive/master.zip)

## 安装 python

```powershell
# 下载 3.10.9 版本的 python
pyenv install 3.10.9
# 全局安装
pyenv global 3.10.9

## 查看python
python -V
```

NOTICE: 可以手动下载对应的 python 版本至 `$HOME\.pyenv\pyenv-win\install_cache`, 再执行 `pyenv install <版本>`。

参考：

- [https://raw.githubusercontent.com/pyenv-win](https://raw.githubusercontent.com/pyenv-win)
