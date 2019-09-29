import { Identifier } from '@babel/types'

type Babel = typeof import('@babel/core')

function raw() {

}

export default function testPlugin({ types: t }: Babel) {
  return {
    visitor: {
      TaggedTemplateExpression(path) {
        const { tag, quasi } = path.node
        if (t.isIdentifier(tag) && (tag as Identifier).name === 'useStyle') {
          console.log(quasi)
        }
      }
    }
  } as babel.PluginObj
}
