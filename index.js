var postcss = require('postcss')
var regx = /^(\d+px|0)(( max( block)?)|( block( max)?))?$/
var errorMessage = 'Value Must Be Match ' + regx.toString()
module.exports = postcss.plugin('postcss-text-ellipsis', function () {
  // Work with options here

  return function (root) {
    // Transform CSS AST here

    root.walkRules(function (rule) {
      root.walkDecls('ellipsis', function (decl) {
        var value = decl.value
        if (!regx.test(value)) {
          throw decl.error(errorMessage)
        }
        var props = [{
          prop: 'display',
          value: (value.indexOf('block') > -1 ? '' : 'inline-') + 'block'
        }, {
          prop: (value.indexOf('max') > -1 ? 'max-' : '') + 'width',
          value: value.replace(' max', '').replace(' block', '')
        }, {
          prop: 'overflow', value: 'hidden'
        }, {
          prop: 'text-overflow', value: 'ellipsis'
        }, {
          prop: 'white-space', value: 'nowrap'
        }]

        props.forEach(function (prop) {
          rule.append(prop)
        })
        decl.remove()
      })
    })
  }
})

module.exports.errorMessage = errorMessage
