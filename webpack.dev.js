const path = require('path');
const webpack = require('webpack'); // eslint-disable-line
const merge = require('webpack-merge'); // eslint-disable-line
const common = require('./webpack.common.js');

module.exports = merge(common, {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './dist',
        port: 8081,
        hot: true,
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true,
                        },
                    }, {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: '[name]_[local]_[hash:base64:10]',
                            importLoaders: 1,
                        },
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            }, {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true,
                        },
                    }, {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    }, {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                            javascriptEnabled: true,
                        },
                    },
                ],
            },
        ],
    },
});
