# vue-stx

## 写在前面
接口文档   https://console-docs.apipost.cn/preview/33afe756f2f552f5/151425855decd2d9

GitHub    https://github.com/byp0409/Student-Manage

我的其他项目
- 丁香医生移动端仿写(已打包为app)    https://github.com/byp0409/Vue-DXYS
- 商品管理系统(正在施工中)       https://github.com/byp0409/Vue-Commodity-Manage

## 项目介绍
这是一个前端基于vue后端基于express的学生管理系统。该项目中用户分为管理员(老师)和学生。
- 管理员可以发布任务、每周需要掌握的知识点，还可对学生信息进行操作，例如注册学生(默认密码123456)、修改学生信息、删除学生。
- 学生可以修改部分个人信息、提交自己的知识点掌握情况以及选择是否完成任务

## 项目启动说明

### 安装依赖

```bash
# 请尽量使用npm，因为cnpm的镜像有点小问题，经常会出现一些莫名其妙的bug
npm i
```

### 数据库
请在mysql中新建一个数据库，然后在该数据库中运行ms.sql文件

### 服务器连接配置
在你安装好配置好数据库后，一定要检查mysql.js里的配置，要保证和自己的数据库配置相同

### 运行项目
经过以上的准备你就可以正式运行项目了，默认提供一个管理员账户、一个普通用户

管理员
- 账号：root
- 密码：admin

普通用户
- 账号：20220507
- 密码：123456

```bash
# 启动项目
npm run serve
# 启动本地服务器
cd serve
nodemon
```

## 项目结构说明
```
vue-stx
├─ .browserslistrc
├─ babel.config.js
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  └─ index.html
├─ README.md        项目说明
├─ server             后端代码--本地服务器
│  ├─ index.js
│  ├─ mysql.js
│  ├─ router.js     核心代码，其他都是基础配置
│  └─ secert.js
├─ src              前端代码
│  ├─ api             
│  │  ├─ index.js       所有请求的封装
│  │  └─ request.js     axios二次封装
│  ├─ App.vue
│  ├─ assets
│  │  ├─ css
│  │  │  ├─ fonts             字体图标
│  │  │  │  ├─ icomoon.eot
│  │  │  │  ├─ icomoon.svg
│  │  │  │  ├─ icomoon.ttf
│  │  │  │  └─ icomoon.woff
│  │  │  ├─ iconfont.css
│  │  │  └─ normalize.css     公共初始化样式
│  │  └─ logo.png
│  ├─ components              普通组件
│  │  ├─ Calendar
│  │  │  ├─ Calendar.vue      日历
│  │  │  └─ Dialog 
│  │  │     └─ Dialog.vue     发布知识点的弹窗
│  │  ├─ Dialog
│  │  │  └─ Dialog.vue        修改个人信息的弹窗
│  │  ├─ LeftNav
│  │  │  └─ LeftNav.vue       左侧导航
│  │  └─ TopNav
│  │     └─ TopNav.vue        顶部导航
│  ├─ main.js             入口文件
│  ├─ plugins             
│  │  ├─ echarts.js       echarts封装
│  │  └─ element-ui.js    element-ui的按需引入
│  ├─ router
│  │  ├─ index.js         路由配置
│  │  └─ routes.js        核心路由模块
│  ├─ store
│  │  ├─ index.js         仓库配置
│  │  └─ modules
│  │     ├─ home.js       home模块的仓库
│  │     ├─ info.js       info模块的仓库
│  │     └─ login.js      login模块的仓库
│  ├─ util
│  │  └─ index.js         一些工具的封装，如解析token、用户身份、手机号验证
│  └─ views
│     ├─ Home
│     │  ├─ Home.vue
│     │  └─ RightContent
│     │     ├─ HomePage
│     │     │  ├─ HomePage.vue      主页
│     │     │  └─ Task
│     │     │     └─ Task.vue       发布任务
│     │     ├─ MyInfo
│     │     │  ├─ MyInfo.vue        个人中心
│     │     │  └─ PassWord
│     │     │     └─ PassWord.vue   修改密码
│     │     ├─ Register
│     │     │  └─ Register.vue      注册
│     │     ├─ RightContent.vue
│     │     └─ StudentInfo
│     │        ├─ RadarMap
│     │        │  └─ RadarMap.vue   雷达图
│     │        └─ StudentInfo.vue   学生信息
│     └─ Login
│        ├─ images
│        │  └─ background.jpg
│        └─ Login.vue               登录
└─ vue.config.js

```

## 项目用到的技术

### 前端
- vue、vuex、vue-router   
- axios  发起Ajax请求
- echarts  绘制雷达图
- nprogress  请求时顶部进度条
- element-ui  
- less和less-loader  简化设计样式
- jwt-decode  解析token

### 后端
- express  web开发框架
- mysql  连接数据库
- jsonwebtoken  生成token
- body-parser  允许接收post请求

## 之后要做的
该项目暂未开发完毕，如果之后有比较好的想法会继续完善。还有就是该项目的数据库和后端很多地方做的非常不合理，下面列举一下可以优化的地方
- 用户登录时生成的token并没有存储到数据库中，只是单纯的发给前端
- 用户的密码是明文存储在数据库中的
- 用户修改密码只是在前端进行身份校验，后端并没有进行校验
- 计算任务完成百分比的时候把管理员也算上了，应该要把管理员单独放一张表里(大概？)
- 还有该项目中**最最最最致命**的一个问题，由于我不会往数据库里存数组，我的处理方式是把数据以特定字符进行分隔以字符串的形式存入数据库中，后端把字符串返回给前端，前端在根据特定字符串截取数据，这就导致前端代码里有很多迷惑行为。
- 上述问题主要集中在发布任务、发布知识点、标记完成任务、标记知识点掌握情况，下面说明一下分隔示例
- vue2|axios源码|element-ui|测试一下|bye  ==> ['vue2','axios源码','element-ui','测试一下','bye']    需要掌握的知识点
- vue2:4|axios源码:2|element-ui:5|测试一下:1|bye:3|   ==> [{'vue2':4,'axios源码':2,'element-ui':5,'测试一下':1,'bye':3}]    学生掌握程度
- {Sno:20220507}|{Sno:test1}  ==> [{Sno:20220507},{Sno:test1}]    完成任务的人

总之就是有非常多的问题，之后有时间和精力再进行优化或者重构，需要深入学习express

-------分割线2022/5/7---------
