import minify from '../src/minify'

describe('remove comments', () => {
  test('one comment', () => {
    const code = '/* 123 */color:red'
    const transformedCode = minify(code)
    expect(transformedCode).toBe('color:red')
  })
  test('many comments', () => {
    const code = '/* 123 *//* set red */color:red/*xxxx*/'
    const transformedCode = minify(code)
    expect(transformedCode).toBe('color:red')
  })
  test('disturb comment', () => {
    const code = '/***** /* hell * world ////* ** *****/color:red'
    const transformedCode = minify(code)
    expect(transformedCode).toBe('color:red')
  })
})

describe('remove sapces', () => {
  test('trim spaces', () => {
    const code = ' color:red '
    const transformedCode = minify(code)
    expect(transformedCode).toBe('color:red')
  })
  test('spaces with \\n', () => {
    const code = `
      border:
        1px
        red
        solid
    `
    const transformedCode = minify(code)
    expect(transformedCode).toBe('border:1px red solid')
  })
  test('spaces with :', () => {
    const code = 'color: red'
    const transformedCode = minify(code)
    expect(transformedCode).toBe('color:red')
  })
  test('spaces with ;', () => {
    const code = 'color:red  ;  '
    const transformedCode = minify(code)
    expect(transformedCode).toBe('color:red')
  })
  test('spaces with ( , )', () => {
    const code = `
    background:linear-gradient(
      180deg,
      rgb( 51, 163, 244 ) 0,
      rgba( 51, 163, 244, 0 ) 100%
    )
    `
    const transformedCode = minify(code)
    expect(transformedCode).toBe('background:linear-gradient(180deg,rgb(51,163,244)0,rgba(51,163,244,0)100%)')
  })
  test('spaces with { }', () => {
    const code = `
      .p {
        color:red;
        font-size:30px
      }
    `
    const transformedCode = minify(code)
    expect(transformedCode).toBe('.p{color:red;font-size:30px}')
  })
})

describe('remove semicolon', () => {
  test('repeat semicolons', () => {
    const code = 'color:red;;;;;;;;;;;;;color:green'
    const transformedCode = minify(code)
    expect(transformedCode).toBe('color:red;color:green')
  })
  test('endline semicolon', () => {
    const code = '.p{color:red;}color:red;'
    const transformedCode = minify(code)
    expect(transformedCode).toBe('.p{color:red}color:red')
  })
})
