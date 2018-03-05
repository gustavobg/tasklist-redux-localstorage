const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');

module.exports = merge(common, {
  devtool: 'cheap-module-eval-source-map', // enum
  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, 'dev-assets'), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)

    filename: 'bundle.js', // string
    // the filename template for entry chunks

    publicPath: '/dev-assets/' // string
    // the url to the output directory resolved relative to the HTML page
  },
  devServer: {
    contentBase: './dev-assets', // boolean | string | array, static file location
    compress: true, // enable gzip compression
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    inline: true,
    port: 3333,
    historyApiFallback: {
      index: '/dev-assets/'
    },
    // Reportedly, this avoids CPU overload on some systems.
    watchOptions: {
      ignored: /node_modules/
    }
  },
  plugins: [
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],

  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false
  }
});


