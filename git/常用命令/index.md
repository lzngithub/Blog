# git 常用命令

本地同步更新分支(不会合并代码)

```shell
git fetch
```

关联本地分支对应到远程分支

```shell
git branch --set-upstream-to=origin/远程分支名称
```

查看分支

```shell
git branch
```

新建分支

```shell
git branch 分支名
```

检出分支

```shell
git checkout 分支名
```

新建分支并检出分支

```shell
git checkout -b 分支名
```

合并分支

```shell
git merge 被合并分支名
```

合并分支分两种情况，

1. 你想要合并的分支所指向的提交是你所在分支的提交的直接后继，Git会直接将指针向前移动，这种情况下的合并操作没有需要解决的分歧——这就叫做 “快进（fast-forward）”

2. 想要合并的分支所指向的提交不是你所在分支的提交的直接后继，就是说你新建立分支后，原来分支有新的提交，这个时候，Git会使用两个分支的末端所指的快照以及这两个分支的公共祖先，做一个简单的三方合并。Git 将此次三方合并的结果做了一个新的快照并且自动创建一个新的提交指向它。 这个被称作一次合并提交，它的特别之处在于他有不止一个父提交。这个时候，可能会遇到冲突，此时 Git 做了合并，但是没有自动地创建一个新的合并提交。 Git 会暂停下来，等待你去解决合并产生的冲突，并手动去提交。

删除分支

```shell
git branch -d 分支名
```

添加全部文件到暂存区

```shell
git add .
```

添加单个/多个文件到暂存区

```shell
git add 文件1具体路径 文件2具体路径
```

查看暂存区文件的改动情况

```shell
git status -s
```

保存当前工作区和暂存区的修改，建立一条stash信息，默认的说明信息是最后一次提交的节点号和提交说明

```shell
git stash
```

保存当前工作区和暂存区的修改，建立一条stash信息

```shell
git stash save '说明信息'
```

查看stash列表

```shell
git stash list
```

默认将工作栈中最上面的 stash 应用到仓库中，可以带id指定某个版本

```shell
Git stash apply
Git stash apply stash@{1}
```

跟stash apply相似，但会删除对用的stash

```shell
Git stash pop
Git stash pop stash@{1}
```

> 应用stash时，如果工作区有修改会失败，必须将修改加到暂存区才可以

用stash新建分支，默认最新的stash，可指名stash id

```shell
git stash branch 分支名 stash@{id}
```

清除所有的stash

```shell
Git stash clear
```

删除一条所有的stash，默认最新，可指名stash id

```shell
Git stash drop stash@{id}
```
