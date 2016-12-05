var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var webpack = require("webpack");

module.exports = {
    entry: {
        test: path.join(__dirname, './test.jsx'),
        vendor: [
            'redux',
            'react',
            'react-redux',
            'react-dom',
            'underscore'
        ]
    },
    output: {
        path: __dirname + '/build',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        noParse: [pathToReact],
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a valid name to reference
            query: {
                presets: ['es2015', 'react', 'stage-0']
            }
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            chunk: 'vendor'
        })
    ],
};