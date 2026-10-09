import { useEffect, useRef } from 'react'
import { currentStep, currentNode } from '../engine/playthrough.js'

const TONI = {
  luminoso: { label: 'Finale luminoso', className: 'badge badge--done' },
  agrodolce: { label: 'Finale agrodolce', className: 'badge badge--progress' },
  amaro: { label: 'Finale amaro', className: 'badge' },
}

export function Ending({ book, run, trovati, onRetry, onLibrary, onBookDetail }) {
  const node = currentNode(book, run)
  const step = currentStep(run)
  const finale = node.ending
  const tono = TONI[finale.tone] ?? TONI.agrodolce
  const titolo = useRef(null)

  useEffect(() => {
    document.title = `${finale.title} — ${book.title}`
    titolo.current?.focus()
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [finale.title, book.title])

  const paragrafiLetti = new Set(run.steps.map((s) => s.nodeId)).size
  const mancanti = book.endingsCount - trovati.length

  return (
    <main className="wrap" id="contenuto">
      <div className="reader__page" style={{ paddingBottom: 0 }}>
        {step.log.length > 0 && (
          <div className="effects" style={{ marginTop: 0, marginBottom: 'var(--s-5)' }}>
            {step.log.map((voce, i) => (
              <span key={i} className={`effect effect--${voce.kind}`}>
                {voce.text}
              </span>
            ))}
          </div>
        )}

        <div className="prose">
          {node.text.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <div className="ending">
        <p className="ending__eyebrow">Fine</p>
        <h1 className="ending__title" tabIndex={-1} ref={titolo}>
          {finale.title}
        </h1>
        <span className={`${tono.className} ending__tone`}>{tono.label}</span>

        <div className="ending__stats">
          <span>{paragrafiLetti} paragrafi attraversati</span>
          <span>
            {trovati.length} di {book.endingsCount} finali
          </span>
          {step.state.words.length > 0 && (
            <span>
              {step.state.words.length}{' '}
              {step.state.words.length === 1 ? 'parola raccolta' : 'parole raccolte'}
            </span>
          )}
        </div>

        {mancanti > 0 && (
          <p className="note" style={{ marginTop: 'var(--s-5)' }}>
            {mancanti === 1
              ? "Manca un finale. Cambiando le scelte iniziali si aprono bivi che questa volta sono rimasti chiusi."
              : `Mancano ${mancanti} finali. Cambiando le scelte iniziali si aprono bivi che questa volta sono rimasti chiusi.`}
          </p>
        )}

        <div className="ending__actions">
          <button className="btn" onClick={onRetry}>
            Leggi di nuovo
          </button>
          <button className="btn btn--ghost" onClick={onBookDetail}>
            Scheda del libro
          </button>
          <button className="btn btn--quiet" onClick={onLibrary}>
            Torna alla biblioteca
          </button>
        </div>
      </div>
    </main>
  )
}
