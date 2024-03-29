'use strict';

var path = require('path');
var BowerWebpackPlugin = require('bower-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var config = {
    context: path.join(__dirname, 'web/src/app'),
    entry: {
        index: './index',
        learn: './learn'
    },
    output: {
        path: path.join(__dirname, 'web/dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
            {test: /\.png$/, loader: "url-loader?limit=100000"},
            {test: /\.jpg$/, loader: "file-loader"},
            {test: /\.jsx/, loader: "jsx-loader"},
            {test: /\.woff2$/, loader: "url?limit=10000&minetype=application/font-woff2"},
            {test: /\.woff$/, loader: "url?limit=10000&minetype=application/font-woff"},
            {test: /\.ttf$/, loader: "url?limit=10000&minetype=application/octet-stream"},
            {test: /\.eot$/, loader: "file"},
            {test: /\.svg$/, loader: "url?limit=10000&minetype=image/svg+xml"}
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        }),
        new ExtractTextPlugin("css/[name].css"),
        new BowerWebpackPlugin({
            modulesDirectories: ['bower_components'],
            manifestFiles: ['bower.json', '.bower.json'],
            includes: /.*/,
            excludes: /.*\.less$/
        })
    ]
};

var compiler = webpack(config);
compiler.run(function (err, stats) {
    console.log(stats);
});