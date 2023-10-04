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
    host: '0.0.0.0',
    port: 8080,
    open: true,
    // https: true,
    compress: true,
    static: {
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
// module.exports = smp.wrap(config)
