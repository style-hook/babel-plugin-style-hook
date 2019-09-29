export default function (code: string) {

  const SapceWith = (s: string) => RegExp(`\\s*\\${s}\\s*`, 'g')
  return code
    .trim()

    // remove comments
    .replace(/\/\*.*?\*\//g, '')

    // remove unnecessary spaces
    // should remove \n before other sapce process
    .replace(SapceWith('\n'), ' ')
    .replace(SapceWith(':'), ':')
    .replace(SapceWith(';'), ';')
    .replace(SapceWith(','), ',')
    .replace(SapceWith('('), '(')
    .replace(SapceWith(')'), ')')
    .replace(SapceWith('{'), '{')
    .replace(SapceWith('}'), '}')

    // remove unnecessary semicolons
    .replace(/;;+/, ';')
    .replace(/;(?=\})/, '')
    .replace(/;$/, '')
}
