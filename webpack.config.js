const path = require('path');

// development
const webpackConfig = {
    target: 'node',
    node: {
        __dirname: true
    },
    entry: {
        www: path.join(__dirname, '/src/www.js')
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
