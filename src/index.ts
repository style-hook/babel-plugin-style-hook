import minify from './minify'

type Babel = typeof import('@babel/core')

const apiName = [
  'useStyle',
  'useModuleStyle',
  'useGlobalStyle',
  'css',
]

export default function testPlugin(babel: Babel): babel.PluginObj {
  const t = babel.types
  return {
    visitor: {
      TaggedTemplateExpression(path) {
        const { tag, quasi } = path.node
        if (t.isIdentifier(tag) && apiName.includes(tag.name)) {
          const quasiPath = path.get('quasi')
          const { quasis, expressions } = quasi
          let expressionSymbol = 'VAR'
          while(quasis.map(tplEl => tplEl.value.raw).join(' ').includes(expressionSymbol))
            expressionSymbol += '_'
          const sourceCode = quasis.map((tplEl, i) => (
            tplEl.value.raw
            + (i !== quasis.length -1 ? `${expressionSymbol}${i}` : '')
          )).join('')
          const minCode = minify(sourceCode)
          quasiPath.replaceWith(
            t.templateLiteral(
              minCode.split(RegExp(`${expressionSymbol}\\d+`)).map(raw => (
                t.templateElement({ raw, cooked: raw }, true)
              )),
              expressions.filter((_, i) => RegExp(`${expressionSymbol}${i}`).test(minCode))
            )
          )
        }
      }
    }
  }
}
