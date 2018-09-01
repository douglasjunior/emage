const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        }),
        new OptimizeCSSAssetsPlugin(),
        new UglifyJsPlugin({
            parallel: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]_[local]_[hash:base64:10]',
                            importLoaders: 2,
                        },
                    }, {
                        loader: 'sass-loader',
                    },
                ],
            }, {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    }, {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                        },
                    },
                ],
            },
        ],
    },
});
