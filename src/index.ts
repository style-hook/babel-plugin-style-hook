import { Identifier } from '@babel/types'
import minify from './minify'

type Babel = typeof import('@babel/core')

const apiName = [
  'useStyle',
  'useModuleStyle',
  'useGlobalStyle',
  'css',
]

export default function testPlugin(babel: Babel) {
  const t = babel.types
  return {
    visitor: {
      TaggedTemplateExpression(path) {
        const { tag, quasi } = path.node
        if (t.isIdentifier(tag) && apiName.includes(tag.name)) {
          const quasiPath = path.get('quasi')
          const { quasis, expressions } = quasi
          const sourceCode = quasis.map((templateEl, i) => (
            templateEl.value.raw
            + (i !== quasis.length -1 ? `\${${i}}` : '')
          )).join('')
          const minCode = minify(sourceCode)
          quasiPath.replaceWith(
            t.templateLiteral(
              minCode.split(/\$\{\d+\}/).map(raw => t.templateElement({ raw })),
              expressions.filter((_, i) => minCode.indexOf(`\${${i}}`))
            )
          )
        }
      }
    }
  } as babel.PluginObj
}
