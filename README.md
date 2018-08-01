# qcbweb

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


1.解压缩后 运行  npm install、
2.本地查看效果  运行  npm run dev
3.如果要打包上传服务器  需要确认两项：
	一， router中的index.js文件中mode:'history', 下面是否有base: '/h5/'
	二，config文件夹中index.js中 	assetsPublicPath 后面是否是 点斜杆‘./’
	之后运行 npm run build    系统创建出 dist文件夹  仅上传此文件夹即可