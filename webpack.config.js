const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: './layout/main.js',
    list: './layout/js/list.js'
  },
  output: {
    path: path.resolve(__dirname,'build'),
    publicPath: "build/"
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use:['css-loader','less-loader'],
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({filename:'theme.css'}),
    new CopyPlugin([
      { from: 'layout/js', to: 'js' },
      { from: 'layout/*.html', to: '[name].[ext]', toType: 'template' }
    ]),
  ]
};