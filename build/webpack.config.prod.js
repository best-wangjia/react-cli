const webpack = require('webpack')
const path = require('path')
const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const baseWebpackConfig = require('./webpack.config.base')

const smp = new SpeedMeasurePlugin()

const config = webpackMerge.merge(baseWebpackConfig, {
  mode: 'production',
  target: 'browserslist',
  devtool: 'hidden-source-map',
  plugins: [
    new MiniCssExtractPlugin({ 
      filename: 'static/css/[name].[contenthash:8].css'  
    }),
    new CssMinimizerPlugin()
    // new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   openAnalyzer: false,
    //   reportFilename: path.join(__dirname, '../analyzer/index.html')
    // })
  ]
})

module.exports = config
// module.exports = smp.wrap(config)
