const webpack = require('webpack')
const path = require('path')
const { when, whenDev, whenProd } = require('@craco/craco')
const CracoLessPlugin = require('craco-less')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const WebpackBar = require('webpackbar')
const { getThemeVariables } = require('antd/dist/theme')

const resolve = dir => path.join(__dirname, dir)
const isDev = process.env.NODE_ENV === 'developer'
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src/api'),
      'assets': resolve('src/assets'),
      'common': resolve('src/common'),
      'components': resolve('src/components'),
      'pages': resolve('src/pages'),
      'store': resolve('src/store'),
      'utils': resolve('src/utils'),
      'router': resolve('src/router'),
      'hooks': resolve('src/hooks'),
    },
    plugins: [
      // 构建进度
      new WebpackBar({profile: true}),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 打包进度
      new SimpleProgressWebpackPlugin(),
      ...whenDev(
        () => [
          // 模块循环依赖检测
          new CircularDependencyPlugin({
            exclude: /node_modules/,
            include: /src/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: process.cwd()
          }),
          new webpack.HotModuleReplacementPlugin()
        ], []
      ),
      ...whenProd(
        () => [
          // 删除console, debugger
          new TerserPlugin({
            terserOptions: {
              ecma: undefined,
              warnings: false,
              parse: {},
              compress: {
                drop_console: isProd,
                drop_debugger: false,
                pure_funcs: isProd ? ['console.log'] : ''
              }
            }
          }),
          // gzip压缩
          new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp('\\.(js|css)$'),
            threshold: 10240,
            minRatio: 0.8,
          }),
          // 打包文件分析
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: resolve('analyzer/index.html')
          })
        ], []
      )
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
          },
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true,
          },
        },
      },
    },
    configure: (webpackConfig, {env, paths}) => {
      paths.appBuild = 'dist'
      webpackConfig.output = {
        ...webpackConfig.output,
        path: resolve('dist'),
        publicPath: '/'
      }
      webpackConfig.devtool = isProd ? false : 'source-map'
      webpackConfig.resolve.extensions = [
        ...webpackConfig.resolve.extensions,
        ...['.less', '.scss', '.styl']
      ]
      return webpackConfig
    }
  },
  babel: {
    presets: [
      ['@babel/preset-env', {
        modules: false,
        useBuiltIns: 'entry',
        corejs: {
          version: 3,
          proposals: true
        }
      }]
    ],
    plugins: [
      ['import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
      }, 'antd'],
      ['@babel/plugin-proposal-decorators', {
        legacy: true
      }]
    ],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              'primary-color': '#039be5'
            },
            javascriptEnabled: true
          }
        }
      }
    },
  ],
  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
