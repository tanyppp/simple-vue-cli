const path = require('path');
const baseConfig = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');
const {
  smart
} = require('webpack-merge');

const {
  RootPath,
  DistPath
} = require('./path.config');

module.exports = smart(baseConfig, {
  mode: 'production',
  output: {
    path: DistPath,
    filename: 'js/bundle.[name].[hash:8].js',
    chunkFilename: 'js/bundle.[id].[hash:8].js'
  },
  optimization: {
    minimizer: [
      new UglifyjsPlugin({
        cache: true, // 是否缓存
        parallel: true, // 是否并发打包
        sourceMap: true // 压缩完的JS源码映射
      }),
      new OptimizeCss()
    ],
    splitChunks: {
      cacheGroups: { // 缓存组里放需要抽离的模块，模块名自取
        common: { // 抽离公共模块
          chunks: 'initial',
          minSize: 0, // 大于等于0就要进行抽离
          minChunks: 2 // 最少要引用两次才抽离
        },
        vendor: { // 抽离node_modules下的模块
          priority: 1, // 优先抽离
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 2
        }
      }
    }
  },
  module: {
    rules: [{
        test: /\.(png|jpg|jpeg|svg|gif)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'image/[name].[hash:8].[ext]',
            publicPath: '/'
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'media/[name].[hash:8].[ext]',
            publicPath: '/'
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:8].[ext]',
            publicPath: '/'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(RootPath, 'public', 'index.html'),
      filename: 'index.html',
      title: 'Vue App',
      favicon: path.join(RootPath, 'public', 'logo.ico'),
      minify: {
        removeAttributeQuotes: true, // 去掉属性引号
        collapseWhitespace: true // 去掉空格
      },
      hash: true // html引入文件使用hash
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: 'css/[id].[hash:8].css'
    })
  ]
});
