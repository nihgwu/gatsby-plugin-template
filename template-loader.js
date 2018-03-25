const fs = require('fs')

function escape(str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

function compile(template, source, regexp) {
  let content = ''
  const result = regexp.exec(template)
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
  const regexp = new RegExp('( *)' + escape(placeholder), 'g')

  return compile(template, source, regexp)
}
