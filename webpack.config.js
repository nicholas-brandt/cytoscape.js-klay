const path = require('path');
const pkg = require('./package.json');
const camelcase = require('camelcase').default;
const process = require('process');
const webpack = require('webpack');
const env = process.env;
const NODE_ENV = env.NODE_ENV;
const MIN = env.MIN;
const PROD = NODE_ENV === 'production';

let config = {
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname),
    filename: pkg.name + '.js',
    library: { type: 'module' }, // camelcase(pkg.name),
    module: true,
    environment: {
      module: true, // Keep ES6 module syntax
    }
  },
  experiments: {
    outputModule: true,
  },
  externals: NODE_ENV === 'production' ? Object.keys(pkg.dependencies || {}) : [],
  plugins: false && MIN ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      }
    })
  ] : []
};

module.exports = config;