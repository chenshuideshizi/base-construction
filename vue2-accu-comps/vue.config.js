// const path = require('path')
// module.exports = {
//   lintOnSave: false, // 是否在开发环境下每次保存代码时都启用 eslint 验证
//   // chainWebpack: (config) => {
//   //   config.resolve.alias
//   //     .set('@', path.join(__dirname, './src'))
//   //     .set('@views', path.join(__dirname, './src/views'))
//   //     .set('@components', path.join(__dirname, './src/components'))
//   //     .set('@utils', path.join(__dirname, './src/utils'))
//   // },
//   configureWebpack: {
//     resolve: {
//       alias: {
//         '@': path.join(__dirname, './src'),
//         '@views': path.join(__dirname, './src/views'),
//         '@components': path.join(__dirname, './src/components'),
//         '@utils': path.join(__dirname, './src/utils')
//       }
//     }
//   }
// }

const path = require('path')
module.exports = {
  runtimeCompiler: true,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, './src'),
        '@views': path.join(__dirname, './src/views'),
        '@components': path.join(__dirname, './src/components'),
        '@utils': path.join(__dirname, './src/utils'),
        'vue$': "vue/dist/vue.esm.js"
      }
    },
    resolveLoader: {
      modules: ['node_modules','./loaders/'],
      alias: {
        'md-loader2': './loaders/md-loader2'
      }
    }
  },
  chainWebpack: (config) => { 
    // Markdown Loader
    config.module
      .rule("md")
      .test(/\.md/)
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      // 自定义loader
      .use("md-loader")
      .loader("md-loader2")
      .end();
  }
}