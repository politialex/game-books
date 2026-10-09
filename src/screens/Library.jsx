import { useMemo, useState } from 'react'
import { books, annunci } from '../data/index.js'
import { statoLibro, statoLettura } from '../store/library.js'
import { Cover } from '../components/Cover.jsx'
import { IconSettings } from '../components/Icons.jsx'

const FILTRI = [
  { id: 'tutti', label: 'Tutti' },
  { id: 'in-corso', label: 'In corso' },
  { id: 'da-leggere', label: 'Da leggere' },
  { id: 'finito', label: 'Finiti' },
]

export function Library({ libreria, onOpen, onSettings }) {
  const [filtro, setFiltro] = useState('tutti')

  const conteggiFiltri = useMemo(() => ({
    tutti: books.length,
    'in-corso': books.filter((b) => statoLettura(libreria, b.id) === 'in-corso').length,
    'da-leggere': books.filter((b) => statoLettura(libreria, b.id) === 'da-leggere').length,
    finito: books.filter((b) => statoLettura(libreria, b.id) === 'finito').length,
  }), [libreria])

  const visibili = useMemo(
    () => (filtro === 'tutti' ? books : books.filter((b) => statoLettura(libreria, b.id) === filtro)),
    [filtro, libreria],
  )

  const inCorso = books.filter((b) => statoLettura(libreria, b.id) === 'in-corso')

  return (
    <>
      <header className="topbar">
        <div className="wrap topbar__inner">
          <span className="topbar__title topbar__title--brand">Biblioteca</span>
          <button className="icon-btn" onClick={onSettings} aria-label="Impostazioni di lettura">
            <IconSettings />
          </button>
        </div>
      </header>

      <main className="wrap" id="contenuto">
        <div className="library__head">
          <p className="library__eyebrow">Raccolta librogame</p>
          <h1 className="library__title">I tuoi librogame</h1>
          <p className="library__sub">
            {books.length} libri nella raccolta
            {inCorso.length > 0 && ` · ${inCorso.length} in corso`}
          </p>
          {inCorso.length === 0 && books.every((b) => statoLettura(libreria, b.id) === 'da-leggere') && (
            <p className="library__hint">
              Scegli un libro, definisci il tuo personaggio e segui il racconto prendendo
              decisioni. Non serve carta: l&apos;app tiene il conto.
            </p>
          )}
        </div>

        <div className="filters" role="group" aria-label="Filtra per stato">
          {FILTRI.map((f) => {
            const count = conteggiFiltri[f.id]
            return (
              <button
                key={f.id}
                className="chip"
                aria-pressed={filtro === f.id}
                onClick={() => setFiltro(f.id)}
              >
                {f.label}
                {count > 0 && count < books.length && (
                  <span className="chip__count">{count}</span>
                )}
              </button>
            )
          })}
        </div>

        {visibili.length > 0 ? (
          <ul className="book-list">
            {visibili.map((book) => (
              <li key={book.id}>
                <BookCard book={book} stato={statoLibro(libreria, book.id)} onOpen={onOpen} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <p className="empty-state__title">Niente in questo scaffale</p>
            <p>
              {filtro === 'in-corso'
                ? 'Quando inizi un libro lo ritrovi qui, al paragrafo in cui lo hai lasciato.'
                : filtro === 'finito'
                  ? 'I libri di cui hai raggiunto almeno un finale finiscono qui.'
                  : 'Hai iniziato tutti i libri della raccolta.'}
            </p>
          </div>
        )}

        <h2 className="section-title">In arrivo</h2>
        <ul className="book-list">
          {annunci.map((book) => (
            <li key={book.id}>
              <BookCard book={book} stato={null} onOpen={onOpen} />
            </li>
          ))}
        </ul>

        <p className="rights" style={{ marginBlock: 'var(--s-7) var(--s-8)' }}>
          Prototipo. «Il Sogno Profondo» è di un autore terzo e viene usato qui solo per provare il
          formato: serve il suo consenso prima di qualsiasi pubblicazione. Gli altri titoli sono
          segnaposto scritti per riempire la libreria.
        </p>
      </main>
    </>
  )
}

function BookCard({ book, stato, onOpen }) {
  const soon = Boolean(book.comingSoon)
  const lettura = soon ? null : stato?.corrente ? 'in-corso' : stato?.finali.length ? 'finito' : 'da-leggere'

  return (
    <button
      className={`book-card${soon ? ' book-card--soon' : ''}`}
      onClick={() => onOpen(book.id)}
      aria-label={`${book.title}, di ${book.author}${soon ? ', in arrivo' : ''}`}
    >
      <span className="book-card__inner">
      <Cover book={book} />
      <span className="book-card__body">
        <span className="book-card__title">{book.title}</span>
        <span className="book-card__author">{book.author}</span>
        <span className="book-card__tagline">{book.tagline}</span>
        <span className="book-card__foot">
          {soon && <span className="badge badge--soon">In arrivo</span>}
          {lettura === 'in-corso' && (
            <span className="badge badge--progress">
              Paragrafo {stato.corrente.steps[stato.corrente.steps.length - 1].nodeId}
            </span>
          )}
          {lettura === 'finito' && (
            <span className="badge badge--done">
              {stato.finali.length}/{book.endingsCount} finali
            </span>
          )}
          {lettura === 'da-leggere' && <span className="badge">Da leggere</span>}
          <span className="badge" style={{ background: 'transparent' }}>
            {book.length} paragrafi
          </span>
        </span>
      </span>
      </span>
    </button>
  )
}
