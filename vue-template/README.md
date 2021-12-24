# vue2-template

### 功能
1. 通过命令行创建组件目录及文件
2. 通过命令行创建业务模块及文件
2. 自动挂载路由
3. 导出所有路由功能


使用 vue-cli2 创建的项目，需要改成 webpack5

## 配置文档说明

#### 1. 使用 sass 对 css 进行预处理

安装 sass-loader

```npm i -D sass-loader```

安装 Dart Sass

```npm i -D sass``

sass-loader 依赖于 Dart Sass 或 Node Sass, 并且推荐使用 Dart Sass。

Tips: Node Sass 不支持 Yarn Pnp, 且不支持 @use rule

参考: https://www.npmjs.com/package/sass-loader


