/**
 * Esplorazione casuale: gioca molte partite con tutte le combinazioni
 * di tratti e riporta quali finali si raggiungono davvero.
 *
 * Il validatore controlla il grafo; questo controlla il motore.
 * Un finale irraggiungibile per colpa di una condizione sbagliata
 * non si vede leggendo il libro.
 */
import { books } from '../src/data/index.js'
import { startPlaythrough, choose, visibleChoices, isEnding, currentStep } from '../src/engine/playthrough.js'

const PARTITE = 400
const MAX_PASSI = 300

function combinazioni(book) {
  const groups = book.setup.traitGroups ?? []
  if (groups.length === 0) return [[]]
  return groups.reduce(
    (acc, g) => acc.flatMap((combo) => g.options.map((o) => [...combo, o.id])),
    [[]],
  )
}

for (const book of books) {
  console.log(`\n${book.title}`)
  const attesi = Object.entries(book.nodes).filter(([, n]) => n.ending)
  const trovati = new Map()
  const visitati = new Set()
  let bloccati = 0

  for (const traits of combinazioni(book)) {
    for (let i = 0; i < PARTITE; i++) {
      let run
      try {
        run = startPlaythrough(book, traits)
      } catch (e) {
        console.log(`  ERRORE all'avvio: ${e.message}`)
        break
      }

      let passi = 0
      while (passi++ < MAX_PASSI) {
        visitati.add(currentStep(run).nodeId)
        if (isEnding(book, run)) {
          const id = currentStep(run).nodeId
          const chiave = `${id} — ${book.nodes[id].ending.title}`
          trovati.set(chiave, (trovati.get(chiave) ?? 0) + 1)
          break
        }
        const scelte = visibleChoices(book, run).filter((c) => c.available)
        if (scelte.length === 0) {
          bloccati++
          console.log(`  VICOLO CIECO al paragrafo ${currentStep(run).nodeId} con tratti [${traits}]`)
          break
        }
        run = choose(book, run, scelte[Math.floor(Math.random() * scelte.length)])
      }
      if (passi >= MAX_PASSI) console.log(`  partita non conclusa in ${MAX_PASSI} passi (tratti ${traits})`)
    }
  }

  for (const [id, node] of attesi) {
    const chiave = `${id} — ${node.ending.title}`
    const n = trovati.get(chiave) ?? 0
    console.log(`  ${n > 0 ? 'ok    ' : 'MAI   '} finale ${chiave}${n ? ` (${n} volte)` : ''}`)
  }

  const mai = Object.keys(book.nodes).map(Number).filter((id) => !visitati.has(id))
  if (mai.length) console.log(`  paragrafi mai visitati: ${mai.join(', ')}`)
  if (bloccati) console.log(`  vicoli ciechi: ${bloccati}`)
}

console.log('')
