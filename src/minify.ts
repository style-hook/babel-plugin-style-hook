export default function (code: string) {

  const trimWith = (s: string) => RegExp(`\\s*\\${s}\\s*`, 'g')
  const trimEndWith = (s: string) => RegExp(`\\${s}\\s+`, 'g')
  return code
    .trim()

    // remove comments
    .replace(/\/\*.*?\*\//g, '')

    // remove unnecessary spaces
    .replace(/\s{2,}/g, ' ')
    .replace(trimWith(':'), ':')
    .replace(trimWith(';'), ';')
    .replace(trimWith(','), ',')
    .replace(trimEndWith('('), '(')
    .replace(trimWith(')'), ')')
    .replace(trimWith('{'), '{')
    .replace(trimWith('}'), '}')

    // remove unnecessary semicolons
    .replace(/;;+/, ';')
    .replace(/;(?=\})/, '')
    .replace(/;$/, '')

    // shorter number
    .replace(/\b0\.(\d+)/, '.$1')
    .replace(/\b0[a-zA-z]+/, '0')
}
