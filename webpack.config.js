const path = require('path');
const webpack = require('webpack');

// development
const webpackConfig = {
    target: 'node',
    entry: {
        app: path.join(__dirname, '/src/app.js'),
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, '/dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    devtool: '#source-map',
    resolve: {
        extensions: ['.js', '.json']
    }
};

module.exports = webpackConfig;
