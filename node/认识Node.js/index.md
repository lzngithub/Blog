# Node.js

## node相关工具

### nvm

node版本管理工具，mac直接装nvm，windows可以装nvm-windows或者nodlist，从github找下载地址

### nvm常用命令

```shell
nvm --help //查看常用命令
nvm list/ls //查看本机安装的所有的node版本
nvm use <版本号> //切换版本

```

### npm(node package manager)

node包（模块）管理工具

### npm命令

```js
npm view <chunk> versions // 查看改包的所有版本号
npm outdated // 查看哪个包是过期的，不符合配置的
npm update
npm cache clean --force // 强制清除缓存
npm i <chunk> -S // 安装最新的包
npm i <chunk>@1 -S // 安装锁定主版本内最新的包
npm i <chunk>@1.11 -S // 安装锁定主版本和次版本内最新的包
npm i <chunk>@2.2.4 -S // 安装指定版本
npm i --production // 只安装package.json配置的生产环境的包
```

### node包版本号命名规则

例子：^13.4.6

* major: 主版本号为13
* minor: 次版本号为4
* patch: 补丁为6，偶数为稳定的patch，奇数为不稳定的patch

* ^: 锁定主版本号内最新的版本
* ~: 锁定主版本号和次版本号内最新的版本
* *: 锁定最新版本

## 读写文件

```js
const fs = require('fs')

fs.writeFile('./log.txt', 'hello', (err,res) => {
  if (err) {} else {
    console.log('文件创建成功')
  }
})
```

## 进程的管理

```js
console.log(process.argv)
```

## 网络通信

```js
const http = require('http')

const server = http.createServer((request, response) => {
  let url = request.url
  response.write(url)
  response.end()
})

server.listen(8090, 'localhost', () => {
  console.log('localhost:8090')
})
```

## node包的类型

1. 內置的包，直接引用
2. 第三方包，需要安装
3. 自己定义的包

## 怎么把自己定义的包上传到npm

### 定义自己的包

新建文件夹，执行npm包初始化命令，生成package.json文件，在文件夹中新建index.js文件,里面写对应的代码，将模块暴露出来

```js

function hello () {
  console.log('hello npm')
}

module.exports = hello
```

### 注册npm账号

到<https://www.npmjs.com/>注册一个账号

### 添加npm用户

在文件夹中执行增加账户,会提示输入用户名，密码，邮箱,不能用淘宝源，要切回npm源

```shell
npm adduser
```

### 发布/更新（修改版本号）

新注册的账号记得去邮箱那里验证，不然会上传不成功

```shell
npm publish
```

### 撤销发布

```shell
npm unpublish <包名> --force
```

### nrm（源管理工具）

nrm 可以帮助您轻松快速地在不同的 npm 注册中心之间切换，现在包括：npm、cnpm、taobao、nj(nodejitsu)。

与registry有关命令

```shell
npm i nrm -g // 安装nrm
nrm ls // 查看各种源的地址
nrm use <源的类型> // 换源
nrm test // 测试各个源的速度
npm config set registry https://registry.npmjs.org //换源
npm config get registry // 查看当前源
```

## npx

npm 从5.2版开始，增加npx命令, npx想要解决的主要问题，是调用项目内部安装的模块

比如，你项目安装了Mocha，一般来说，你想调用Mocha，只能在项目的脚本和package.json的scripts字段里面，如果想在命令行下面调用，必须像下面这样

```shell
# 在项目的根目录下
$ node_modules/.bin/mocha --version
```

但是使用npx，就可以这样

```shell
npx mocha -version
```

同时，如果你本地和全局都没有安装mocha，npx会帮你把mocha下来（暂时放在临时文件夹，也可能是内存，反正执行完之后，就是删掉，只会执行一次），然后执行

常用命令

```js
npx --no-install http-server // 强制使用本地模块
npx --ignore-existing http-server // 强制使用远程的
npx http-server //先查看本地有没有，有用本地的，没有就使用远程的
```

