/* eslint-disable id-length */
const test = require('tape')
const prefix = require('../src/prefix')

test('api: transforms single rule', async (t) => {
  t.plan(1)

  const input = '.CodeMirror { width: 100%; }'
  const output = '.root :global(.CodeMirror) { width: 100%; }'

  t.equal(await prefix({content: input, selector: '.root'}), output)
})

test('api: transforms all rules', async (t) => {
  t.plan(1)

  const input = [
    '.CodeMirror { width: 100%; }',
    '#CodeMirror-thing { height: 100%; }', // Make sure IDs work too
  ].join('\n')

  const output = [
    '.foo :global(.CodeMirror) { width: 100%; }',
    '.foo :global(#CodeMirror-thing) { height: 100%; }',
  ].join('\n')

  t.equal(await prefix({content: input, selector: '.foo'}), output)
})

test('api: transforms chained rules', async (t) => {
  t.plan(1)

  const input = '.CodeMirror, .CodeMirror-wrapper { width: 100%; }'

  const output =
    '.wrapped :global(.CodeMirror), .wrapped :global(.CodeMirror-wrapper) { width: 100%; }'

  t.equal(await prefix({content: input, selector: '.wrapped'}), output)
})
