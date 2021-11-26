# Github 多账户 SSH KEY 配置

## ssh config

```config
#user1 account
Host github.com-user1
    HostName github.com
    User git
    IdentityFile ~/.ssh/github-user1

#user2 account
Host github.com-user2
    HostName github.com
    User git
    IdentityFile ~/.ssh/github-user2
```

## 配置本地git库信息

```bash
git remote set-url origin git@github.com-user1:user1/your-repo-name.git
```
