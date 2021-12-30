const path = require('path');
module.exports = {
    entry: {
        index: './src/index'
    },
    mode: 'production',
    target: 'node', // 编译为 Node.js 环境下的 JS，之后直接使用 Node.js 执行编译完成的文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'replace-loader'
            },
            {
                test: /\.md$/,
                use: ['vue-loader', 'md-loader']
            }
        ]
    },
    resolveLoader: {
        modules: ['./node_modules', './loaders'], // 配置 loader 的查找目录
         // 配置 resolveLoader.alias
        alias: {
            'replace-loader': path.resolve(__dirname, './loaders/replace-loader/index.js'),
            'md-loader': path.resolve(__dirname, './loaders/md-loader/index.js')
        }
    }
};