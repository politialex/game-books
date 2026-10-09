/**
 * Valutazione delle condizioni di un librogame.
 *
 * Una condizione è un oggetto. Le forme riconosciute:
 *
 *   { trait: 'forte' }                  il lettore ha scelto quel tratto (pregio o paura)
 *   { word: 'ADULTO' }                  il lettore ha raccolto quella parola d'ordine
 *   { stat: 'determinazione', gte: 3 }  confronto su una statistica (gte, lte, gt, lt, eq)
 *   { any: [ ...condizioni ] }          almeno una vera
 *   { all: [ ...condizioni ] }          tutte vere
 *   { not: condizione }                 negazione
 *
 * Più chiavi nello stesso oggetto valgono come "all".
 * Una condizione assente o vuota è sempre vera.
 */

export function evaluate(condition, state) {
  if (!condition) return true
  if (Array.isArray(condition)) return condition.every((c) => evaluate(c, state))

  const checks = []

  if (condition.any) {
    checks.push(condition.any.some((c) => evaluate(c, state)))
  }
  if (condition.all) {
    checks.push(condition.all.every((c) => evaluate(c, state)))
  }
  if (condition.not) {
    checks.push(!evaluate(condition.not, state))
  }
  if (condition.trait !== undefined) {
    const traits = Array.isArray(condition.trait) ? condition.trait : [condition.trait]
    checks.push(traits.some((t) => state.traits.includes(t)))
  }
  if (condition.word !== undefined) {
    const words = Array.isArray(condition.word) ? condition.word : [condition.word]
    checks.push(words.some((w) => state.words.includes(w)))
  }
  if (condition.stat !== undefined) {
    const value = state.stats[condition.stat] ?? 0
    if (condition.gte !== undefined) checks.push(value >= condition.gte)
    if (condition.lte !== undefined) checks.push(value <= condition.lte)
    if (condition.gt !== undefined) checks.push(value > condition.gt)
    if (condition.lt !== undefined) checks.push(value < condition.lt)
    if (condition.eq !== undefined) checks.push(value === condition.eq)
  }

  if (checks.length === 0) return true
  return checks.every(Boolean)
}

/** Elenca in forma leggibile cosa richiede una condizione, per spiegare una scelta bloccata. */
export function describe(condition, book) {
  if (!condition) return []
  if (Array.isArray(condition)) return condition.flatMap((c) => describe(c, book))

  const parts = []

  if (condition.any) {
    const inner = condition.any.flatMap((c) => describe(c, book))
    if (inner.length) parts.push(inner.join(' oppure '))
  }
  if (condition.all) parts.push(...condition.all.flatMap((c) => describe(c, book)))
  if (condition.not) {
    const inner = describe(condition.not, book)
    if (inner.length) parts.push(`non ${inner.join(' e ')}`)
  }
  if (condition.trait !== undefined) {
    const traits = Array.isArray(condition.trait) ? condition.trait : [condition.trait]
    parts.push(traits.map((t) => traitLabel(t, book)).join(' o '))
  }
  if (condition.word !== undefined) {
    const words = Array.isArray(condition.word) ? condition.word : [condition.word]
    parts.push(`la parola ${words.join(' o ')}`)
  }
  if (condition.stat !== undefined) {
    const label = statLabel(condition.stat, book)
    if (condition.gte !== undefined) parts.push(`${label} almeno ${condition.gte}`)
    if (condition.gt !== undefined) parts.push(`${label} più di ${condition.gt}`)
    if (condition.lte !== undefined) parts.push(`${label} al massimo ${condition.lte}`)
    if (condition.lt !== undefined) parts.push(`${label} meno di ${condition.lt}`)
    if (condition.eq !== undefined) parts.push(`${label} pari a ${condition.eq}`)
  }

  return parts
}

function traitLabel(id, book) {
  for (const group of book?.setup?.traitGroups ?? []) {
    const found = group.options.find((o) => o.id === id)
    if (found) return found.label
  }
  return id
}

function statLabel(id, book) {
  const found = (book?.setup?.stats ?? []).find((s) => s.id === id)
  return found ? found.label : id
}
