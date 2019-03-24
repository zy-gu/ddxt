# web点单系统

> A Vue.js project

## Build Setup

环境配置
1. 安装node（[点此下载](http://nodejs.cn/download/)）
2. clone项目，地址：https://gitee.com/ntsclong/ddxt.git [点此跳转](https://gitee.com/ntsclong/ddxt.git)
3. cd进入项目目录执行下列命令
4. cnpm安装：npm install -g cnpm --registry=https://registry.npm.taobao.org
  npm安装会出现各种奇怪问题，所以建议用cnpm再安装一下

``` bash
# 依赖安装顺序执行下列命令，npm如果报错，安装cnpm后再次安装
npm install
cnpm install

# 完成依赖安装后执行下列命令，启动开发环境，即可使用localhost:8080进行访问（需要带上访问参数，见下）
npm run dev

# 发布线上请执行下列命令，完成后在项目目录下dist目录中生成线上压缩版（static下会有一些MAP类型文件，比较大，可删除）
npm run build
```

项目访问参数

http://127.0.0.1:8081/?roomid=201&Buissnessid=1

roomid  房间自编号
Buissnessid   商铺id

目录说明

    ├─ddxt                              // 项目目录
         │─ build                       // 项目构建(webpack)相关代码
         │   │─ build.js                // 生产环境构建代码
         │   │─ check-version.js        // 检查node、npm等版本
         │   │─ utils.js                // 构建工具相关
         │   │─ vue-loader.conf.js      // css加载器配置
         │   │─ webpack.base.conf.js    // webpack基础配置
         │   │─ webpack.dev.conf.js     // webpack开发环境配置
         │   └─ webpack.prod.conf.js    // webpack生产环境配置
         │─ config                      // 项目开发环境配置
         │   │─ dev.env.js              // 开发环境变量
         │   │─ index.js                // 项目一些配置变量
         │   └─ prod.env.js             // 生产环境变量
	     │─ dist                        // 线上发布文件目录build后生成
         │─ src                         // 源码目录
         │   │─ assets                  // 存放资源文件
         │   │     │─ css               // css文件目录
         │   │     └─ img               // 图片文件目录
         │   │─ components              // 组件
         │   │     └─ home              // home子组件
         │   │─ router                  // vue-router文件
         │   │─ App.vue                 // 页面入口文件
         │   └─ main.js                 // 程序入口文件，加载各种公共组件
         │─ static                      // 静态文件目录，比如一些图片，js等(资源放在src-->assets)
         │─ .babelrc                    // ES6语法编译配置
         │─ .editorconfig               // 定义代码格式
         │─ .gitignore                  // git上传需要忽略的文件格式
         │─ .postcssrc.js               // post-loader的插件配置文件
         │─ index.html                  // 入口页面
         │─ package.json                // 项目基本信息
         │─ package-lock.json           // 确定当前安装的包的依赖，以便后续重新安装的时候生成相同的依赖
         └─ README.md                   // 项目说明

