var postcss = require('postcss')

var plugin = require('./')

function startProcess (input, opts) {
  opts = opts || {}
  return postcss([plugin(opts)]).process(input, {from: undefined})
}
function run (input, output, opts) {
  return startProcess(input, opts).then(function (result) {
    expect(result.css).toEqual(output)
    expect(result.warnings()).toHaveLength(0)
  })
}

/* Write tests here */

it('test 1', function () {
  return run(
    '.rule {ellipsis: 60px;}',
    '.rule {display: inline-block;width: 60px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}'
  )
})

it('test 2', function () {
  return run(
    '.rule {ellipsis: 60px max;}',
    '.rule {display: inline-block;max-width: 60px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}'
  )
})

it('test 3', function () {
  return run(
    '.rule {ellipsis: 60px block;}',
    '.rule {display: block;width: 60px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}'
  )
})

it('test 4', function () {
  return run(
    '.rule {ellipsis: 60px block max;}',
    '.rule {display: block;max-width: 60px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}'
  )
})

it('test error', function () {
  var input ='.rule {ellipsis: block max;}'
  return expect(startProcess (input))
  .rejects
  .toThrow(plugin.errorMessage)
})
