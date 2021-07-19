const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar =require('webpackbar')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const resolve = dir => path.join(__dirname, dir)

const devMode = process.env.NODE_ENV === 'development'

module.exports = {
  entry: './src/index',
  output: {
    path: resolve('../dist'),
    filename: `static/js/[name].[${devMode ? 'hash' : 'chunkhash'}:8].js`,
    publicPath: '/'
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    },
    name: 'development-cache'
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.less'],
    alias: {
      'src': resolve('../src'),
      'api': resolve('../src/api'),
      'assets': resolve('../src/assets'),
      'common': resolve('../src/common'),
      'components': resolve('../src/components'),
      'pages': resolve('../src/pages'),
      'store': resolve('../src/store'),
      'utils': resolve('../src/utils'),
      'router': resolve('../src/router'),
      'hooks': resolve('../src/hooks'),
    },
    modules: [resolve('../src'), 'node_modules']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          priority: 1,
          name: 'vendor',
          test: /node_modules/,
          chunks: 'initial',
          minSize: 100,
          minChunks: 1
        },
        common: {
          chunks: 'initial',
          name: 'common',
          minSize: 100,
          minChunks: 3
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  externals: {
    // 'react': 'xxx.cdn'
  },
  module: {
    // noParse: //,
    rules: [{
      test: /\.js[x]?$/,
      use: [{
        loader: 'babel-loader'
      }],
      include: [resolve('../src')]
    }, {
      test: /\.ts[x]?$/,
      use: [{
        loader: 'ts-loader'
      }],
      include: [resolve('../src')]
    }, {
      test: /\.less$/,
      use: [
        {
          loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 2,
            modules: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: function() {
              return [
                require('autoprefixer')()
              ]
            }
          }
        },
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true
            }
          }
        }
      ],
      include: [resolve('../src')]
    }, {
      test: /\.less$/,
      use: [
        {
          loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: function() {
              return [
                require('autoprefixer')()
              ]
            }
          }
        },
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true
            }
          }
        }
      ],
      include: /node_modules|antd\.less/
    }, {
      test: /\.(png|jpg|jpeg|gif|webp)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/images/[name].[hash:8].[ext]'
      },
      exclude: /node_modules/
    }, {
      test: /\.(svg)$/,
      type: 'asset/inline', 
      generator: {
        filename: 'static/svg/[name].[hash:8].[ext]'
      },
      exclude: /node_modules/
    }, {
      test: /\.(eot|ttf|woff|woff2)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[name].[hash:8].[ext]'
      },
      exclude: /node_modules/
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./template/${devMode ? 'dev' : 'prod'}.html`,
      favicon: './public/favicon.ico',
      filename: 'index.html',
      minify: {
        collapseWhitespace: false
      }
    }),
    new MiniCssExtractPlugin({
      filename: `static/css/[name].[${devMode ? 'hash' : 'contenthash'}:8].css`
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(process.env.NODE_ENV)
    }),
    // new HardSourceWebpackPlugin({
    //   cachePrune: {
    //     maxAge: 5 * 24 * 60 * 60 * 1000,
    //     sizeThreshold: 1024 * 1024 * 1024
    //   }
    // }),
    new FriendlyErrorsWebpackPlugin(),
    new WebpackBar({
      color: '#00a862'
    })
  ]
}
