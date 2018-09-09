const path = require('path')

exports.onCreateWebpackConfig = ({ actions }, pluginOptions) => {
  const { test, ...options } = pluginOptions
  if (!test || !options.template) {
    throw new Error(
      '"test", "template" are required options for "gatsby-plugin-template"'
    )
  }

  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test,
          use: [
            {
              loader: path.resolve(__dirname, 'template-loader.js'),
              options,
            },
          ],
        },
      ],
    },
  })
}
