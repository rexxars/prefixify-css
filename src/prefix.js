const postcss = require('postcss')

const prefixer = postcss.plugin('postcss-prefixify', ({selector}) => {
  return (root) => {
    root.walkRules((rule) => {
      rule.selectors = rule.selectors.map((original) => `${selector} :global(${original})`)
    })
  }
})

module.exports = async function prefix({content, selector}) {
  const result = await postcss([prefixer({selector})]).process(content, {from: undefined})
  return result.css
}
