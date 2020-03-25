import * as babel from '@babel/core'
import plugin from '../src/index'

var example = `
useStyle \`
  color: blue;
  font-size: 30px;
  .p {
    color: \${GREEN};
  }
  \${css \`
    color: blue;
  \`}
\`
useGlobalStyle \`
  color: blue;
  font-size: 30px;
  .p {
    color: green;
  }
\`
useModuleStyle \`
  .p {
    color: red;
    border: 1px \${Palette.BLUE}   dashed;
    error-rule: @@@@1 red;
  }
\`
`

test('works', () => {
  const { code } = babel.transform(example, { plugins: [plugin] })
  expect(code).toMatchSnapshot()
})
