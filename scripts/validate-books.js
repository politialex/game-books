/**
 * Controllo dei libri da riga di comando: `npm run validate`.
 * Serve a non scoprire un salto rotto durante la lettura.
 */
import { books } from '../src/data/index.js'
import { validateBook } from '../src/engine/validate.js'

let failed = false

for (const book of books) {
  const result = validateBook(book)
  const { nodes, reachable, endings } = result.stats
  console.log(`\n${book.title} — ${nodes} paragrafi, ${reachable} raggiungibili, ${endings} finali`)

  if (result.problems.length === 0) {
    console.log('  nessun problema')
    continue
  }
  for (const p of result.problems) {
    console.log(`  [${p.severity === 'error' ? 'ERRORE ' : 'avviso '}] ${p.message}`)
  }
  if (!result.ok) failed = true
}

console.log('')
process.exit(failed ? 1 : 0)
