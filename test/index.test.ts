import * as babel from '@babel/core'
import plugin from '../src/index'

var example = `
const c  = useStyle \`
  color: blue;
  font-size: 30px;
  .p {
    color: \${GREEN};
  }
\`
`

test('works', () => {
  const { code } = babel.transform(example, { plugins: [plugin] })
  expect(code).toMatchSnapshot()
})
