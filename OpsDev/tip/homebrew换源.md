# Homebrew 换源

## 镜像源

### brew.git 镜像

> 中科大镜像：https://mirrors.ustc.edu.cn/brew.git
>
> 清华镜像：https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git
>
> GitHub镜像：https://github.com/Homebrew/brew.git

### homebrew-core.git 镜像

> 中科大镜像：https://mirrors.ustc.edu.cn/homebrew-core.git
>
> 清华镜像：https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git
>
> GitHub镜像：https://github.com/Homebrew/homebrew-core

## 替换 Homebrew 镜像源

### 替换 brew.git

以中科大镜像为例

```bash
cd "$(brew --repo)"

git remote set-url origin https://mirrors.ustc.edu.cn/brew.git
```

或

```bash
git -C "$(brew --repo)" remote set-url origin https://mirrors.ustc.edu.cn/brew.git
```

### 替换 homebrew-core.git

以中科大镜像为例

```bash
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"

git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
```

或

```bash
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
```

### 替换 homebrew-cask.git

以中科大镜像为例

```bash
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-cask"

git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git
```

## 重置 Homebrew 镜像源

切回官方原始镜像（GitHub）

```bash
git -C "$(brew --repo)" remote set-url origin https://github.com/Homebrew/brew.git

git -C "$(brew --repo homebrew/core)" remote set-url origin https://github.com/Homebrew/homebrew-core
```

**参考**
[https://www.jianshu.com/p/18065741e052](https://www.jianshu.com/p/18065741e052)
