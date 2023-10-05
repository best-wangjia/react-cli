const path = require('path')
const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const baseWebpackConfig = require('./webpack.config.base')
const globAll = require('glob-all')

const config = webpackMerge.merge(baseWebpackConfig, {
  mode: 'production',
  target: 'browserslist',
  devtool: 'hidden-source-map',
  // 优化配置
  optimization: {
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),
      // 压缩js
      new TerserPlugin({
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"]
          }
        }
      })
    ],
    splitChunks: { // 分隔代码
      cacheGroups: {
        vendor: { // 提取node_modules代码
          priority: 1, // 提取优先级为1
          name: 'vendor', // 提取文件命名为vendors,js后缀和chunkhash会自动加
          test: /node_modules/, // 只匹配node_modules里面的模块
          chunks: 'initial', // 只提取初始化就能获取到的模块，不管异步的
          minSize: 10, // 提取代码体积大于10就提取出来
          minChunks: 1 // 只要使用1次就提取出来
        },
        common: { // 提取页面公共代码
          chunks: 'initial', // 只提取初始化就能获取到的模块，不管异步的
          name: 'commons', // 提取文件命名为commons
          minSize: 10, // 提取代码体积大于10就提取出来
          minChunks: 2 // 只要使用2次就提取出来
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({ 
      filename: 'static/css/[name].[contenthash:8].css'  
    }),
    // 清理无用css
    new PurgeCSSPlugin({
      // 检测src下所有tsx文件和public下index.html中使用的类名和id和标签名称
      // 只打包这些文件中用到的样式
      paths: globAll.sync([
        `${path.join(__dirname, '../src')}/**/*.tsx`,
        `${path.join(__dirname, '../public')}/index.html`
      ]),
      safelist: {
        standard: [/^ant-/], // 过滤以ant-开头的类名，哪怕没用到也不删除
      }
    })
  ]
})

module.exports = config
