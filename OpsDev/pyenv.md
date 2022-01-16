# pyenv

python 版本管理神器, 可以在多个 python 版本之间切换

## 安装

使用 git 安装

```bash
git clone https://github.com/pyenv/pyenv.git ~/.pyenv
```

如果你使用 bash，就依次执行如下命令：

```bash
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n eval "$(pyenv init -)"\nfi' >> ~/.bashrc
```

如果你使用 zsh，就依次执行如下命令：

```bash
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n eval "$(pyenv init -)"\nfi' >> ~/.zshrc
```

### pyenv-virtualenv

```bash
git clone https://github.com/pyenv/pyenv-virtualenv.git $(pyenv root)/plugins/pyenv-virtualenv
```

如果你使用 bash，就执行如下命令：

```bash
echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bashrc
```

如果你使用 zsh，就执行如下命令：

```bash
echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.zshrc
```

## pyenv 使用

- **查看 pyenv 的版本信息**

```bash
pyenv --version
```

- **查看当前使用的 python 版本**

```bash
pyenv version
#system (set by /root/.pyenv/version)  # system表示系统安装的版本
```

- **安装 python**

```bash
pyenv install 3.6.8
```

- **查看已安装的版本**

```bash
$ pyenv versions
# * system
#   3.6.8 (set by /Users/jie/.pyenv/version)
```

- **全局设置版本**

```bash
pyenv global 3.6.2
```

- **卸载版本**

```bash
pyenv uninstall 3.6.2
```

- **查看所有 pyenv 的指令**

```bash
pyenv commands
```
