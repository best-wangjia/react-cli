const path = require('path')
const { merge } = require('webpack-merge')
const prodWebpackConfig = require('./webpack.config.prod')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin') // 分析构建速度
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // 分析打包结果

const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap(
  merge(prodWebpackConfig, {
    plugins: [
      // 分析webpack构建结果文件
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: path.join(__dirname, '../analyzer/index.html')
      })
    ]
  })
)
