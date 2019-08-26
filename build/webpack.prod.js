const path = require('path');
const baseConfig = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
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
        collapseWhitespace: true, // 去掉空格
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      hash: true // html引入文件使用hash
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: 'css/[id].[hash:8].css'
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]', //目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
      algorithm: 'gzip',//算法
      test: new RegExp(
           '\\.(js|css)$'    //压缩 js 与 css
      ),
      threshold: 10240,//只处理比这个值大的资源。按字节计算
      minRatio: 0.8//只有压缩率比这个值小的资源才会被处理
    })
  ]
});
