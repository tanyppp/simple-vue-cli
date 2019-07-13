const path = require('path');
const baseConfig = require('./webpack.config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  smart
} = require('webpack-merge');

const {
  RootPath,
  DistPath
} = require('./path.config');

const devConfig = smart(baseConfig, {
  mode: "development",
  output: {
    path: DistPath,
    filename: 'js/bundle.[name].js',
    chunkFilename: 'js/bundle.[id].js'
  },
  devServer: {
    historyApiFallback: {
      rewrites: [{
        from: /.*/,
        to: path.posix.join('/', 'index.html')
      }, ]
    },
    port: 8000,
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [{
        test: /\.(png|jpg|jpeg|svg|gif)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'image/[name].[ext]',
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
            name: 'media/[name].[ext]',
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
            name: 'fonts/[name].[ext]',
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
      favicon: path.join(RootPath, 'public', 'logo.ico')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
    new webpack.NamedModulesPlugin(), // 热更新时会log出更新的模块路径
    new webpack.HotModuleReplacementPlugin()
  ]
});

module.exports = devConfig;
