# Admin System

基于 antd react 构建一个后台管理系统模板

首先确保电脑上已安装nodejs 和 php 以及php包管理  Composer

clone 项目后需要在根目录下执行

npm install

在services 目录下执行

composer install

为Laravel生成密钥

php artisan key:generate


###启动方式

```
  npm run dev -- 开发模式
  npm run build:local -- 本地生产环境打包
  npm run build:server -- 正式生产环境打包
```


### TODO

参看dashboard.jsx