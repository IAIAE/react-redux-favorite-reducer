var rucksack = require('rucksack-css')
var webpack = require('webpack')
var path = require('path')

module.exports = {
  context: path.join(__dirname, './'),
  entry: {
    test: path.join(__dirname, './index.jsx'),
    vendor: [
      'redux',
      'react',
      'react-redux',
      'react-dom',
      'underscore',
      'jquery',
      'redux-thunk',
      'redux-promise',
      'immutable',
      'redux-undo'
    ]
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].js',
    chunkFilename:'[name].chunk.js',
    publicPath:'/build/',
    jsonpFunction:'iaiae'
  },
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'file?name=[name].[ext]'
    }, {
      test: /\.css$/,
      include: /client/,
      loaders: [
        'style-loader',
        'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
        'postcss-loader'
      ]
    }, {
      test: /\.css$/,
      exclude: /client/,
      loader: 'style!css'
    }, {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel', // 'babel-loader' is also a valid name to reference
      query: {
        presets: ['es2015', 'react', 'stage-0']
      }
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')]
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      chunk: 'vendor'
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(process.env.DEVELOPMENT || 'false'),
      __RELEASE__: JSON.stringify(process.env.RELEASE || 'false')
    }),
    new webpack.ProvidePlugin({
      $:'jquery',
      'jQuery':'jquery',
      'React':'react',
      '_':'underscore',
      'ReactDom':'react-dom'
    })
  ],
  devServer: {
    historyApiFallback: true,
    inline:true
  }
}