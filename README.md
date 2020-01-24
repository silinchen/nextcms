# CassCMS

持续更新ing

#### 介绍

使用 React 开发的 CassCMS 个人站 博客 内容管理系统。是一个完整的前后端分离的项目，即装即用。

前端使用 React（next.js框架 + antd） 开发，后端使用 node.js（koa2） 开发实现 RESTFul 风格后台接口，数据库使用 MongoDB。

#### 技术栈
React
- next.js + redux + redux-saga + antd

Node.js
- koa2 + jwt

MongoDB
- mongoose


#### 安装部署

本项目开发时使用环境：
- Node.js 版本 v12.13.0
- 依赖包管理工具 yarn



```shell
# 拷贝项目
git clone https://github.com/silinchen/casscms
cd casscms
# 安装依赖
yarn
# 初始化数据
yarn initData
# 开发模式
yarn dev
# 生产模式 打包构建、启动
yarn build
yarn start
```

### 访问

首页：http://localhost:3000

管理后台：http://localhost:3000/admin/login

账号：admin/123456

