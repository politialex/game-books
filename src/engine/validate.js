/**
 * Validatore del grafo di un librogame.
 *
 * In un libro di 72 paragrafi basta un numero sbagliato per rompere la storia,
 * e il refuso non si vede leggendo. Questo controllo serve all'autore
 * almeno quanto a noi: lo mostriamo anche in pagina, in sviluppo.
 */
export function validateBook(book) {
  const problems = []
  const ids = Object.keys(book.nodes).map(Number)
  const known = new Set(ids)

  const add = (severity, message, nodeId) => problems.push({ severity, message, nodeId })

  if (!book.setup?.startNode) add('error', 'Manca il paragrafo iniziale (setup.startNode).')

  // Salti verso paragrafi inesistenti.
  for (const id of ids) {
    const node = book.nodes[id]
    for (const choice of node.choices ?? []) {
      if (!known.has(choice.goto)) {
        add('error', `Il paragrafo ${id} rimanda al ${choice.goto}, che non esiste.`, id)
      }
    }
    if (!node.ending && (node.choices ?? []).length === 0) {
      add('error', `Il paragrafo ${id} non ha scelte e non è un finale: la lettura si blocca.`, id)
    }
    if (node.ending && (node.choices ?? []).length > 0) {
      add('warning', `Il paragrafo ${id} è un finale ma ha ancora delle scelte.`, id)
    }
  }

  // Soglie delle statistiche.
  for (const stat of book.setup?.stats ?? []) {
    if (stat.thresholdGoto !== undefined && !known.has(stat.thresholdGoto)) {
      add('error', `La soglia di ${stat.label} rimanda al paragrafo ${stat.thresholdGoto}, che non esiste.`)
    }
  }

  // Paragrafi che nessuno raggiunge.
  const reachable = new Set()
  const queue = [book.setup?.startNode ?? 1]
  for (const stat of book.setup?.stats ?? []) {
    if (stat.thresholdGoto !== undefined) queue.push(stat.thresholdGoto)
  }
  while (queue.length) {
    const id = queue.shift()
    if (reachable.has(id) || !known.has(id)) continue
    reachable.add(id)
    for (const choice of book.nodes[id].choices ?? []) queue.push(choice.goto)
  }
  for (const id of ids) {
    if (!reachable.has(id)) add('warning', `Il paragrafo ${id} non è raggiungibile da nessuna scelta.`, id)
  }

  // Parole d'ordine richieste ma mai assegnate.
  const given = new Set()
  for (const id of ids) {
    const node = book.nodes[id]
    const allEffects = [...(node.effects ?? []), ...(node.choices ?? []).flatMap((c) => c.effects ?? [])]
    for (const effect of allEffects) {
      if (effect.word) given.add(effect.word)
    }
  }
  const required = new Set()
  const collectWords = (condition) => {
    if (!condition) return
    if (Array.isArray(condition)) return condition.forEach(collectWords)
    if (condition.word) {
      const words = Array.isArray(condition.word) ? condition.word : [condition.word]
      words.forEach((w) => required.add(w))
    }
    ;[...(condition.any ?? []), ...(condition.all ?? [])].forEach(collectWords)
    if (condition.not) collectWords(condition.not)
  }
  for (const id of ids) {
    for (const choice of book.nodes[id].choices ?? []) collectWords(choice.if)
    for (const effect of book.nodes[id].effects ?? []) collectWords(effect.if)
  }
  for (const word of required) {
    if (!given.has(word)) add('warning', `La parola "${word}" viene richiesta ma nessun paragrafo la assegna.`)
  }

  // Finali dichiarati e finali trovati.
  const endings = ids.filter((id) => book.nodes[id].ending)
  if (book.endingsCount !== undefined && endings.length !== book.endingsCount) {
    add(
      'warning',
      `Il libro dichiara ${book.endingsCount} finali ma ne sono segnati ${endings.length}.`,
    )
  }

  return {
    ok: problems.every((p) => p.severity !== 'error'),
    problems,
    stats: { nodes: ids.length, reachable: reachable.size, endings: endings.length },
  }
}
