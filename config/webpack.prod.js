const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const commom = require('./webpack.common')

module.exports = (env) => {
  return merge(commom(env), {
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
          },
        },
      ],
    },
    plugins: [new CleanWebpackPlugin()],
  })
}
