const webpack = require('webpack')
const path = require('path')
const webpackMerge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')

const config = webpackMerge.merge(baseWebpackConfig, {
  mode: 'development',
  target: 'web',
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 8080,
    open: true,
    // https: true,
    compress: false, // gzip压缩，开发环境不开启，提升速度
    // historyApiFallback: true, // 解决路由跳转404问题
    static: { //托管静态资源文件
      directory: path.join(__dirname, '../dist'),
      publicPath: '/',
    },
    client: {
      logging: 'info',
      overlay: true,
      progress: true,
    },
    proxy: {
      '/': {
        bypass: function(req, res, proxyOptions) {
          return `/index.html`
        }
      },
      '/api': {
        target: 'https://api.exchangerate-api.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})

module.exports = config
