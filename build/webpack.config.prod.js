const webpack = require('webpack')
const path = require('path')
const webpackMerge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const baseWebpackConfig = require('./webpack.config.base')

const smp = new SpeedMeasurePlugin()

const config = webpackMerge.merge(baseWebpackConfig, {
  mode: 'production',
  target: 'browserslist',
  // devtool: 'cheap-module-source-map',
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: path.join(__dirname, '../analyzer/index.html')
    })
  ]
})

module.exports = config
// module.exports = smp.wrap(config)
