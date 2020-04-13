# prefixify-css

Reads a CSS file meant for 'global context' and prefixes each selector with a specified selector, wrapping the remainder in :global()

```css
.SomeLibrary .wrapper {
  width: 100%;
}
.SomeLibrary-blah li:nth-child(5) {
  opacity: 0.5;
}

/* Becomes */

.myPrefix :global(.SomeLibrary .wrapper) {
  width: 100%;
}
.myPrefix :global(.SomeLibrary-blah li:nth-child(5)) {
  opacity: 0.5;
}
```

This is useful when using CSS Modules and you want to include something like CodeMirror, Leaflet and other libraries which has CSS which are globally scoped, but you want to _at the very least_ contain it to within one of your classes.

## Installation

As a CLI tool:

```
npm install -g prefixify-css
```

or, if you want to use it programatically:

```
npm install prefixify-css
```

## Usage (CLI)

```bash
$ prefixify

  prefixify-css: Reads a CSS file meant for 'global context' and prefixes each selector with a specified selector, wrapping the remainder in :global()

  The result is written to stdout.

  Usage
    $ prefixify <input> <selector>

  Examples
    $ prefixify leaflet.css '.leafletInput' > prefixed.css
    $ prefixify - '.leafletInput' < cat /path/to/leaflet.css
```

Alternatively, you can run it through `npx` without even having to install it:

```bash
$ npx prefixify-css myFile.css .mySelector
```

## Usage (JavaScript API)

```js
const prefixify = require('prefixify-css')

prefix({
  content: '.CodeMirror { width: 100%; }',
  selector: '.myClass',
})
  .then((result) => {
    // .myClass :global(.CodeMirror) { width: 100%; }
    console.log(result)
  })
  .catch((error) => {
    console.error(error)
  })
```

## License

MIT © [Espen Hovlandsdal](https://espen.codes/)
