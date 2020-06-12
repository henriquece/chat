const merge  = require('webpack-merge')
const commom = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(commom, {
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(),
  ]
})