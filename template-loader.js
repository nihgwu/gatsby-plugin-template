const fs = require('fs')

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

module.exports = function(source) {
  this.value = source

  const { template: filePath, placeholder } = this.query

  const template = fs.readFileSync(filePath, 'utf8')

  return compile(template, source, placeholder)
}
