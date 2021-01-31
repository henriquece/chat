const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env) => {
  const envPath = `${path.join(__dirname, '..')}/.env.${env.ENVIRONMENT}`

  const fileEnv = dotenv.config({ path: envPath }).parsed

  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next])

    return prev
  }, {})

  return {
    entry: {
      main: './src/index.tsx',
    },
    output: {
      filename: '[name].bundle.[contenthash].js',
      path: path.join(__dirname, '..', './dist/static'),
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: '../index.html',
      }),
      new webpack.DefinePlugin(envKeys),
    ],
    devServer: {
      historyApiFallback: true,
    },
  }
}
