const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');
//const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
    entry: [/*"babel-polyfill",*/ "./src/js/index.js"],
    output: {
        path: path.resolve(__dirname + "/release"),
        filename: "mosquito.min.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader'],
            },
            {
                test: /\.json$/,
                loader: ['json-loader'],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components|release|dist)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    plugins: [
        /*new WriteFilePlugin({
            test: /\.js$/
        })*/
    ],
    devServer: {
        contentBase: "src/html/",
        port: 3000
    }
};
