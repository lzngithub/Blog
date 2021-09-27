# 账户权限配置

## 创建超级管理用户

1.创建超级管理用户

```shell
use admin
db.createUser({
  user: "admin",
  pwd: "123456",
  roles: [{"role": "root", "db": "admin"}]
})
```

2.修改配置文件

```config
security:
  authorization: enabled
```

3.重启服务

4.通过以下命令连接数据库

```shell
mongo admin -u admin -p 123456
```

or

```shell
mongo admin
```

```mongo
db.auth("admin", "123456")
```

## 给指定数据库创建管理员

```mongo
use demo
db.createUser({
  user: "demoadmin",
  pwd: "123456",
  roles: [{"role": "dbOwner", "db": "demo"}]
})
```

## 有关命令

产看用户

```mongo
show users
```
