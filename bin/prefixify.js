#!/usr/bin/env node
/* eslint-disable strict, no-console, no-sync, no-process-exit */
'use strict'

const fs = require('fs')
const path = require('path')
const prefix = require('../src/prefix')
const pkg = require('../package.json')

const help = `
  ${pkg.name}: ${pkg.description}

  The result is written to stdout.

  Usage
    $ prefixify <input> <selector>

  Examples
    $ prefixify leaflet.css '.leafletInput' > prefixed.css
    $ prefixify - '.leafletInput' < cat /path/to/leaflet.css
`

const [input, selector] = process.argv.slice(2)
if (!input) {
  console.error(help)
  process.exit(2)
}

if (!selector) {
  console.error(`No selector specified`)
  console.error(help)
  process.exit(2)
}

const inputFile = path.resolve(process.cwd(), input)
const inputStream = input === '-' ? process.stdin : fs.createReadStream(inputFile)

const chunks = []
inputStream
  .on('error', (err) => {
    console.error(err)
    process.exit(1)
  })
  .on('data', (chunk) => chunks.push(chunk))
  .on('end', () => {
    prefix({content: Buffer.concat(chunks), selector}).then((result) => console.log(result))
  })
