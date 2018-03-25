const path = require('path')

exports.onCreateWebpackConfig = ({ actions }, pluginOptions) => {
  const { test, template, placeholder } = pluginOptions
  if (!test || !template || !placeholder) {
    throw new Error(
      '"test", "template", "placeholder" are required options for "gatsby-plugin-template"'
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
              options: {
                template,
                placeholder,
              },
            },
          ],
        },
      ],
    },
  })
}
