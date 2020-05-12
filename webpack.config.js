const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const fileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eot',
  'otf',
  'svg',
  'ttf',
  'woff',
  'woff2',
];

module.exports = {
  entry: {
    main: './layout/main.js'
  },
  output: {
    path: path.resolve(__dirname,'build'),
    publicPath: "build/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use:['css-loader'],
        }),
        exclude: '/node_modules/'
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use:['css-loader','less-loader'],
        }),
        exclude: '/node_modules/'
      },
      {
        test: new RegExp(`.(${fileExtensions.join('|')})$`),
        loader: 'file-loader?name=/fonts/[name].[ext]',
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({filename:'theme.css'}),
    new CopyPlugin([
      { from: 'layout/*.html', to: '[name].[ext]', toType: 'template' },
      { from: 'node_modules/file-icons-js/css/style.css', to: 'css/file-icons.[ext]', toType: 'template' },
    ]),
  ]
};