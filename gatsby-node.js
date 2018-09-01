const path = require('path')

exports.onCreateWebpackConfig = ({ actions }, pluginOptions) => {
  const { test, template, placeholder } = pluginOptions
  if (!test || !template) {
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
              loader: 'partial-loader',
              options: {
                templatePath: template,
                placeholder,
              },
            },
          ],
        },
      ],
    },
  })
}
