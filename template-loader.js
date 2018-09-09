const fs = require('fs')
const loaderUtils = require('loader-utils')

function compile(template, source, placeholder) {
  const escaped = placeholder.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  const regexp = new RegExp('( *)' + escaped, 'g')
  const result = regexp.exec(template)
  let content = ''
  if (result) {
    const [, indent] = result
    content += template.substring(0, result.index)
    if (indent) {
      source = source
        .split('\n')
        .map(line => indent + line)
        .join('\n')
    }
    content += source
  }
  content += template.substr(regexp.lastIndex)
  return content
}

function exportContent(content, name) {
  if (!name || typeof name !== 'string' || name === 'default') return ''

  const json = JSON.stringify(content)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')

  return `\nexport const ${name} = ${json}`
}

module.exports = function(source) {
  this.cacheable()

  const callback = this.async()
  const {
    template: templatePath,
    placeholder = '/*** placeholder ***/',
    exportResult = false,
    exportRaw = false,
  } = loaderUtils.getOptions(this) || {}

  this.addDependency(templatePath)

  fs.readFile(templatePath, 'utf8', function(err, template) {
    if (err) return callback(err)

    let result = compile(template, source, placeholder)
    result += exportContent(result, exportResult)
    result += exportContent(source, exportRaw)

    callback(null, result)
  })
}
