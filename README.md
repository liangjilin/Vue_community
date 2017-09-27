# Vue.js 中文社区
---

## 前言

基于 vue2.0 写的 Vue.js 中文社区APP，个人觉得这个应用还是很简单的，毕竟功能少，没什么交互。
这个项目很多人都有些过，我都研究过他们的，但总觉得缺少了些什么，所以我决定自己写一遍，也让自己多熟悉熟悉vue的相关技术，但是写完之后还是有很多不尽人意的地方。
但是对于以后想做app的道友们，我认为还是有很多地方，很多小细节可能多多少少都有点帮助的。


项目地址：


- [GitHub地址](https://github.com/liangjilin/Vue_community)

如果对您有帮助，您可以右上角star支持一下，谢谢！ ^_^

## 技术栈

- vue2.0
- vue-cli
- vue-router
- vuex
- fetch
- qs
- axios
- muse-ui
- marked
- stylus

## 预览

![text](../master/static/img/jdfw.gif)

## 实现功能

- [x] 首页列表
- [x] 下拉加载
- [x] 用户信息（点击头像）
- [x] 主题内容
- [x] 登录功能
- [x] 收藏（取消收藏）主题
- [x] 评论列表
- [x] 发表评论
- [x] 回复评论
- [x] 点赞（取消点赞）功能
- [x] 发布主题（支持markdown格式）
- [x] 消息中心（已读、未读）
- [x] 未读消息全部标为已读
- [x] 个人中心

## 执行项目

> 安装依赖
> npm install
> 启动服务
> npm run dev
> 运行
> localhost:8070/#/

## 打包

>需要先修改build文件夹里的webpack.base.conf.js的publicPath: './'
```javascript
```
> 项目的index.html引入cordova.js <script type="text/javascript" src="cordova.js"></script>
```javascript
    <body>
        <div id="app"></div>
        <script type="text/javascript" src="cordova.js"></script>
        <!-- built files will be auto injected -->
    </body>
```
>修改main.js
```javascript
  document.addEventListener('deviceready', function() {
      new Vue({
          el: '#app',
          router,
          store,
          template: '<App/>',
          components: { App }
      })
      window.navigator.splashscreen.hide()
  }, false);
```
>修改config文件夹下面index.js的build
```javascript
    assetsSubDirectory: '',
    assetsPublicPath: '',
```
>在vue项目中npm run build,完了之后记得修改一下index.html引入的flexible和flexible_css这两个js路径，改为去掉./static/即可
>npm run build
```javascript
```

## 打包成APK

>先全局安装下cordova---> npm install -g cordova (在此之前，一定要把环境搭好，也就是sdk，jdk那些环境变量)
>然后
```javascript
     cordova create myApp org.apache.cordova.myApp myApp        //  创建项目
     cd myApp     进入根目录路径
     cordova platform add android        添加android
```
>最后在你的cmd 中cordova build android就行了，然后可以拿到手机上安装了
>

