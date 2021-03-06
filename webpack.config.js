const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  entry: './js/index.js',
  output: {
    path: path.resolve(__dirname, './static'),
    publicPath: '/static/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'import-glob'],
      },
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            loaders: {
              scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
              sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
            }
          }
        }]
      },
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use:[{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'sass': path.resolve(__dirname, './sass'),
      'EventBus': path.resolve(__dirname, './js/EventBus.js')
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  plugins: [
    new HardSourceWebpackPlugin()
  ],
  devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJsPlugin({
        sourceMap: true,
        parallel: true
      }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
