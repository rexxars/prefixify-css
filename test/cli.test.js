/* eslint-disable id-length, no-sync */
const fs = require('fs')
const path = require('path')
const childProc = require('child_process')
const test = require('tape')

const binPath = path.join(__dirname, '..', 'bin', 'prefixify.js')
const fixturePath = path.join(__dirname, 'fixtures', 'codemirror.css')
const input = fs.readFileSync(fixturePath, 'utf8')
const output = fs.readFileSync(path.join(__dirname, 'fixtures', 'prefixed.css'), 'utf8')

test('cli: can read from file', (t) => {
  t.plan(1)
  const result = childProc.execFileSync(binPath, [fixturePath, '.kokos'], {encoding: 'utf8'})
  t.equal(result, output)
})

test('cli: can read from stdin', (t) => {
  t.plan(1)
  const result = childProc.execFileSync(binPath, ['-', '.kokos'], {encoding: 'utf8', input})
  t.equal(result, output)
})

test('cli: gives help on no args', (t) => {
  t.plan(1)
  t.throws(() => childProc.execFileSync(binPath, [], {encoding: 'utf8'}))
})

test('cli: errors if no selector', (t) => {
  t.plan(1)
  t.throws(() => childProc.execFileSync(binPath, [fixturePath], {encoding: 'utf8'}), /no selector/i)
})
