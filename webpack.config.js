const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
    devtool: "source-map",
    entry: "./src/js/index.js",
    output: {
        path: path.resolve(__dirname + "/release/mosquito"),
        filename: "mosquito.min.js",
        //publicPath: "/mosquito/"
    },
    module: {
        rules: [
            {
            test: /\.css$/,
            loader: "style-loader!css-loader"
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
        //new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
        new WriteFilePlugin({
            test: /\.js$/
        })
    ],
    devServer: {
        contentBase: "release",
        //publicPath: '/mosquito/',
        port: 3000
    }
};
