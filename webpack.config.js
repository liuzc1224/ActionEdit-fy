var path = require('path');
var webpack = require('webpack');
const CopyWebpackPlugin  = require('copy-webpack-plugin');
module.exports = {
  entry: {
      viewer:"./example/test/main.js",
      dom:"./src/dom/js/domindex.js"
    },

    plugins: [
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery",
            'window.$': 'jquery',
        })
    ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].js"
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            /*exclude: path.resolve(__dirname, 'node_modules'), //编译时，不需要编译哪些文件*/
            /*include: path.resolve(__dirname, 'src'),//在config中查看 编译时，需要包含哪些文件*/
            query: {
                presets: ['latest'] //按照最新的ES6语法规则去转换
            }
        },
        {
            test: require.resolve('jquery'),
            use: [{
                loader: 'expose-loader',
                options: 'jQuery'
            },{
                loader: 'expose-loader',
                options: '$'
            }]
        },
        {
            test: /\.(gif|jpg|png|svg|woff|woff2|eot|ttf)\??.*$/,
            loader: 'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]'
        },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}
        // {test: /\.eot/,loader : 'url-loader?prefix=font/'},
        // {test: /\.(woff|woff2)/,loader : 'url-loader?prefix=font/&limit=10000&mimetype=application/font-woff'},
        // {test: /\.ttf/, loader : 'url-loader?prefix=font/'},
        // {test: /\.svg/, loader : 'url-loader?prefix=font/'}
        // { test: /.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
    }
}