const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const commom = require('./webpack.common')

module.exports = merge(commom, {
  mode: 'development',
  plugins: [new CleanWebpackPlugin()],
})
