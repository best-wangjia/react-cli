const webpack = require('webpack')
const path = require('path')
const webpackMerge = require('webpack-merge')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const baseWebpackConfig = require('./webpack.config.base')

const smp = new SpeedMeasurePlugin()

const config = webpackMerge.merge(baseWebpackConfig, {
  mode: 'development',
  target: 'web',
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    host: 'localhost',
    port: 8080,
    open: true,
    quiet: false,
    inline: true,
    stats: 'errors-only',
    overlay: false,
    clientLogLevel: 'silent',
    compress: true,
    publicPath: '/',
    contentBase: path.join(__dirname, '../dist'),
    watchContentBase: true,
    watchOptions: {
      ignored: '/node_modules/'
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
// module.exports = smp.wrap(config)
