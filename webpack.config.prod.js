const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const mergeResult = merge(common, {
  devtool: 'cheap-module-eval-source-map', // enum
  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle-[chunkhash].js',
    publicPath: '' // string
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin('bundle-[chunkhash].css'),
    // will be deprecated
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});

module.exports = mergeResult;
