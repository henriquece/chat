const merge = require('webpack-merge')
const typescriptPluginStyledComponents = require('typescript-plugin-styled-components')
const common = require('./webpack.common')

const styledComponentsTransformer = typescriptPluginStyledComponents.default()

module.exports = (env) => {
  return merge(common(env), {
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({
                before: [styledComponentsTransformer],
              }),
            },
          },
        },
      ],
    },
  })
}
