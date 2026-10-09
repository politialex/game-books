import { useState } from 'react'
import { getBook } from '../data/index.js'
import { IconBack, IconCheck } from '../components/Icons.jsx'

/**
 * Le scelte iniziali sono esclusive dentro ogni gruppo e vanno fatte tutte
 * prima di cominciare. Finché manca qualcosa, il bottone dice cosa manca
 * invece di restare disabilitato e muto.
 */
export function CharacterCreation({ bookId, onBack, onBegin }) {
  const book = getBook(bookId)
  const gruppi = book.setup.traitGroups ?? []
  const [scelte, setScelte] = useState({})

  const mancanti = gruppi.filter((g) => !scelte[g.id])
  const pronto = mancanti.length === 0

  const avvia = () => {
    if (!pronto) return
    onBegin(bookId, gruppi.map((g) => scelte[g.id]))
  }

  return (
    <>
      <header className="topbar">
        <div className="wrap topbar__inner">
          <button className="icon-btn" onClick={onBack} aria-label="Torna alla scheda del libro">
            <IconBack />
          </button>
          <span className="topbar__title">Prima di iniziare</span>
        </div>
      </header>

      <main className="wrap setup" id="contenuto">
        <div className="setup__intro">
          {book.setup.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <section className="bio">
          <h2 className="bio__name">{book.setup.character.name}</h2>
          {book.setup.character.subtitle && (
            <p className="bio__sub">{book.setup.character.subtitle}</p>
          )}
          <div className="bio__text">
            {book.setup.character.background.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {gruppi.map((gruppo) => (
          <fieldset className="fieldset" key={gruppo.id}>
            <legend className="fieldset__legend">{gruppo.label}</legend>
            {gruppo.help && <p className="fieldset__help">{gruppo.help}</p>}
            <div className="options">
              {gruppo.options.map((opzione) => {
                const attiva = scelte[gruppo.id] === opzione.id
                return (
                  <button
                    key={opzione.id}
                    className="option"
                    aria-pressed={attiva}
                    onClick={() => setScelte((s) => ({ ...s, [gruppo.id]: opzione.id }))}
                  >
                    <span className="option__mark">
                      {attiva && <IconCheck width={13} height={13} />}
                    </span>
                    <span>
                      <span className="option__label">{opzione.label}</span>
                      <span className="option__desc">{opzione.description}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>
        ))}

        {(book.setup.stats ?? []).map((stat) => (
          <p className="note" key={stat.id} style={{ marginTop: 'var(--s-5)' }}>
            Inizi con <strong>{stat.label} {stat.value}</strong>. {stat.description}
            {stat.thresholdGoto &&
              ` Se arriva a ${stat.threshold}, il racconto prende da solo un'altra strada.`}
          </p>
        ))}

        <div className="action-bar">
          <button className="btn btn--block" onClick={avvia} disabled={!pronto} aria-disabled={!pronto}>
            {pronto
              ? 'Comincia il racconto'
              : `Scegli ${mancanti.map((g) => g.label.toLowerCase()).join(' e ')}`}
          </button>
        </div>
      </main>
    </>
  )
}
