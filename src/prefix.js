const postcss = require('postcss')

const prefixer = postcss.plugin('postcss-prefixify', ({selector}) => {
  return (root) => {
    root.walkRules((rule) => {
      rule.selectors = rule.selectors.map((original) => `${selector} :global(${original})`)
    })
  }
})

module.exports = function prefix({content, selector}) {
  return postcss([prefixer({selector})])
    .process(content, {from: undefined})
    .then((result) => result.css)
}
