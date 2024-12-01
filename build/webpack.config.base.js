const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar = require('webpackbar')
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')

const resolve = (dir) => path.resolve(__dirname, dir)

const devMode = process.env.NODE_ENV === 'development'

module.exports = {
  entry: resolve('../src/index.tsx'),
  output: {
    path: resolve('../dist'), // 打包结果输出路径
    filename: `static/js/[name].[chunkhash:8].js`, // 每个输出js的名称 加上[chunkhash:8]
    clean: true, // webpack4需要配置clean-webpack-plugin删除dist文件，webpack5内置了。
    publicPath: '/' // 打包后文件的公共前缀路径
  },
  cache: {
    // 使用文件缓存
    // 持久化缓存、改进缓存算法等优化,通过配置 webpack 持久化缓存,来缓存生成的 webpack 模块
    // 和 chunk,改善下一次打包的构建速度,可提速 90% 左右
    // 配置好缓存后第二次打包,通过对文件做哈希对比来验证文件前后是否一致,
    // 如果一致则采用上一次的缓存,可以极大地节省时间。
    type: 'filesystem'
    // buildDependencies: {
    //   config: [__filename]
    // },
    // name: 'build-cache'
  },
  resolve: {
    // extensions是webpack的resolve解析配置下的选项，在引入模块时不带文件后缀时，会来该配置数组里面依次添加后缀查找文件，所以要在extensions中配置，而第三方库里面很多引入js文件没有带后缀，所以也要配置下js
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less'],
    // 设置别名alias,设置别名可以让后续引用的地方减少路径的复杂度
    // 修改tsconfig.json,添加baseUrl和paths
    alias: {
      src: resolve('../src'),
      api: resolve('../src/api'),
      assets: resolve('../src/assets'),
      common: resolve('../src/common'),
      components: resolve('../src/components'),
      pages: resolve('../src/pages'),
      store: resolve('../src/store'),
      utils: resolve('../src/utils'),
      router: resolve('../src/router'),
      hooks: resolve('../src/hooks')
    },
    // 查找第三方模块只在本项目的node_modules中查找
    // 使用require和import引入模块时如果有准确的相对或者绝对路径,就会去按路径查询,如果引入的模块没有路径,
    // 会优先查询node核心模块,如果没有找到会去当前目录下node_modules中寻找,如果没有找到会查从父级文件夹
    // 查找node_modules,一直查到系统node全局模块。
    // 这样会有两个问题,一个是当前项目没有安装某个依赖,但是上一级目录下node_modules或者全局模块有安装,就也会引入成功,
    // 但是部署到服务器时可能就会找不到造成报错,另一个问题就是一级一级查询比较消耗时间。
    // 可以告诉 webpack搜索目录范围,来规避这两个问题
    modules: [resolve('../node_modules')]
  },
  externals: {
    // 'react': 'xxx.cdn'
  },
  module: {
    // noParse: //,
    rules: [
      {
        test: /\.ts[x]?$/,
        use: ['thread-loader', 'babel-loader'],
        include: [resolve('../src')]
      },
      {
        // loader执行顺序是从右往左,从下往上的
        // style-loader: 把解析后的css代码从js中抽离,放到头部的style标签中(在运行时做的)
        // css-loader: 解析css文件代码
        test: /\.css$/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ],
        include: [resolve('../src')]
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
            // options: {
            //   sourceMap: true,
            //   importLoaders: 2,
            //   modules: true
            // }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                exclude: /node_modules/,
                javascriptEnabled: true
              }
            }
          }
        ],
        include: [resolve('../src')]
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8].[ext]'
        },
        exclude: /node_modules/
      },
      {
        test: /\.(svg)$/,
        type: 'asset/inline',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/svg/[name].[contenthash:8].[ext]'
        },
        exclude: /node_modules/
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name].[contenthash:8].[ext]'
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    // webpack需要把最终构建好的静态资源都引入到一个html文件中,这样才能在浏览器中运行,
    // html-webpack-plugin就是来做这件事情的
    new HtmlWebpackPlugin({
      template: `./template/${devMode ? 'dev' : 'prod'}.html`, // 模板取定义root节点的模板
      favicon: './public/favicon.ico',
      filename: 'index.html',
      inject: true,
      minify: {
        collapseWhitespace: false
      }
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(process.env.NODE_ENV)
    }),
    new FriendlyErrorsWebpackPlugin(),
    new WebpackBar({
      color: '#00a862'
    })
  ]
}
