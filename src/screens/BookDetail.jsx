import { useMemo, useState } from 'react'
import { getBook, annunci } from '../data/index.js'
import { statoLibro } from '../store/library.js'
import { validateBook } from '../engine/validate.js'
import { Cover } from '../components/Cover.jsx'
import { IconBack, IconCheck } from '../components/Icons.jsx'

export function BookDetail({ bookId, libreria, onBack, onStart, onResume, onRestart }) {
  const [confermando, setConfermando] = useState(false)
  const book = getBook(bookId)
  const annuncio = annunci.find((a) => a.id === bookId)

  if (!book && annuncio) return <ComingSoon book={annuncio} onBack={onBack} />
  if (!book) return null

  const stato = statoLibro(libreria, bookId)
  const inCorso = stato.corrente
  const paragrafoCorrente = inCorso?.steps[inCorso.steps.length - 1]?.nodeId

  const finali = Object.entries(book.nodes)
    .filter(([, n]) => n.ending)
    .map(([id, n]) => ({ nodeId: id, ...n.ending }))

  // In sviluppo mostriamo i problemi del libro anche in pagina:
  // un salto rotto deve saltare all'occhio subito, non durante la lettura.
  const diagnosi = useMemo(() => (import.meta.env.DEV ? validateBook(book) : null), [book])

  return (
    <>
      <header className="topbar">
        <div className="wrap topbar__inner">
          <button className="icon-btn" onClick={onBack} aria-label="Torna alla biblioteca">
            <IconBack />
          </button>
          <span className="topbar__title">{book.title}</span>
        </div>
      </header>

      <main className="wrap detail" id="contenuto">
        <div className="detail__hero">
          <Cover book={book} large />
          <div style={{ minWidth: 0 }}>
            <h1 className="detail__title">{book.title}</h1>
            <p className="detail__author">
              {book.author}
              {book.year && ` · ${book.year}`}
            </p>
            <div className="detail__tags">
              {book.tags.map((t) => (
                <span className="badge" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="detail__blurb">{book.blurb}</p>

        <div className="detail__actions">
          {inCorso ? (
            <>
              <button className="btn" onClick={() => onResume(bookId)}>
                Riprendi dal paragrafo {paragrafoCorrente}
              </button>
              {confermando ? (
                <div className="restart-confirm">
                  <p className="restart-confirm__text">
                    Perderai i progressi fino al paragrafo {paragrafoCorrente}.
                  </p>
                  <div className="restart-confirm__actions">
                    <button
                      className="btn btn--ghost"
                      style={{ flex: 1 }}
                      onClick={() => setConfermando(false)}
                    >
                      Annulla
                    </button>
                    <button
                      className="btn"
                      style={{ flex: 1, background: 'var(--loss)', color: 'var(--surface)' }}
                      onClick={() => { setConfermando(false); onRestart(bookId) }}
                    >
                      Sì, ricomincia
                    </button>
                  </div>
                </div>
              ) : (
                <button className="btn btn--ghost" onClick={() => setConfermando(true)}>
                  Ricomincia da capo
                </button>
              )}
            </>
          ) : (
            <button className="btn" onClick={() => onStart(bookId)}>
              {stato.letture > 0 ? 'Leggi di nuovo' : 'Inizia a leggere'}
            </button>
          )}
        </div>

        <section className="panel">
          <div className="panel__inner">
            <h2 className="panel__title">
              Finali trovati — {stato.finali.length} di {book.endingsCount}
            </h2>
            <div className="endings-grid">
              {finali.map((f) => {
                const trovato = stato.finali.includes(f.id)
                return (
                  <div
                    key={f.id}
                    className={`ending-slot${trovato ? ' ending-slot--found' : ''}`}
                  >
                    {trovato ? (
                      <>
                        <IconCheck width={16} height={16} />
                        {f.title}
                      </>
                    ) : (
                      'Ancora da scoprire'
                    )}
                  </div>
                )
              })}
            </div>
            {stato.letture > 0 && (
              <p className="note" style={{ marginTop: 'var(--s-4)' }}>
                Hai portato a termine {stato.letture} {stato.letture === 1 ? 'lettura' : 'letture'}.
                Le scelte iniziali cambiano quali bivi si aprono.
              </p>
            )}
          </div>
        </section>

        <section className="panel">
          <div className="panel__inner">
            <h2 className="panel__title">Come funziona</h2>
            <p className="note">
              {book.length} paragrafi. Prima di iniziare sceglierai{' '}
              {(book.setup.traitGroups ?? []).map((g) => g.label.toLowerCase()).join(' e ') ||
                'come affrontare la storia'}
              .{' '}
              {(book.setup.stats ?? []).length > 0 &&
                `L'app tiene il conto di ${(book.setup.stats ?? [])
                  .map((s) => s.label)
                  .join(', ')} e delle parole che raccogli: non serve carta.`}
            </p>
          </div>
        </section>

        {book.rights?.note && <p className="rights">{book.rights.note}</p>}

        {diagnosi && diagnosi.problems.length > 0 && (
          <div className="diagnostics">
            <strong>Controllo del libro ({diagnosi.problems.length})</strong>
            <ul>
              {diagnosi.problems.map((p, i) => (
                <li key={i}>{p.message}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </>
  )
}

function ComingSoon({ book, onBack }) {
  return (
    <>
      <header className="topbar">
        <div className="wrap topbar__inner">
          <button className="icon-btn" onClick={onBack} aria-label="Torna alla biblioteca">
            <IconBack />
          </button>
          <span className="topbar__title">{book.title}</span>
        </div>
      </header>
      <main className="wrap detail" id="contenuto">
        <div className="detail__hero">
          <Cover book={book} large />
          <div style={{ minWidth: 0 }}>
            <h1 className="detail__title">{book.title}</h1>
            <p className="detail__author">{book.author}</p>
            <div className="detail__tags">
              <span className="badge badge--soon">In arrivo</span>
              {book.tags.map((t) => (
                <span className="badge" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="detail__blurb">{book.tagline}</p>
        <div className="empty-state" style={{ textAlign: 'left', paddingInline: 0 }}>
          <p className="empty-state__title">Non ancora disponibile</p>
          <p>
            Questo titolo è annunciato ma il testo non è ancora nella raccolta. Non c'è niente da
            leggere, per ora.
          </p>
        </div>
      </main>
    </>
  )
}
