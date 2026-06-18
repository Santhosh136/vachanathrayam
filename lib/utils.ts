export function splitStemSuffix(forms: string[]): { stem: string; suffixes: string[] } {
  if (forms.length === 0) return { stem: '', suffixes: [] }

  let commonPrefixLength = 0
  const minLength = Math.min(...forms.map(f => f.length))

  for (let i = 0; i < minLength; i++) {
    if (forms.every(f => f[i] === forms[0][i])) {
      commonPrefixLength = i + 1
    } else {
      break
    }
  }

  const stem = forms[0].substring(0, commonPrefixLength)
  const suffixes = forms.map(f => f.substring(commonPrefixLength))

  return { stem, suffixes }
}

export function getPatternLegend(forms: string[]): string {
  const { suffixes } = splitStemSuffix(forms)
  return suffixes.join(' → ')
}
