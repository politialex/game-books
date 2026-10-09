import { CoverMotif } from './Icons.jsx'

/**
 * Le copertine sono disegnate dal codice. Finché non ci sono illustrazioni
 * vere, meglio una forma astratta coerente che un'immagine finta: non
 * promette all'utente qualcosa che il prodotto non ha ancora.
 */
export function Cover({ book, large = false }) {
  const [c1, c2] = book.cover?.palette ?? ['#5a5550', '#9b948c']
  return (
    <div
      className={`cover${large ? ' cover--lg' : ''}`}
      style={{ '--c1': c1, '--c2': c2 }}
      aria-hidden="true"
    >
      <CoverMotif motif={book.cover?.motif} className="cover__motif" />
    </div>
  )
}
