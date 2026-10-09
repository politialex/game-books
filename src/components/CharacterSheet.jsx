import { Sheet } from './Sheet.jsx'

/** La scheda che nel libro di carta il lettore terrebbe a mano. */
export function CharacterSheet({ book, state, onClose }) {
  const personaggio = book.setup.character
  const gruppi = book.setup.traitGroups ?? []
  const statistiche = book.setup.stats ?? []

  return (
    <Sheet title="Scheda personaggio" onClose={onClose}>
      <div className="bio" style={{ marginTop: 0 }}>
        <div className="bio__name">{personaggio.name}</div>
        {personaggio.subtitle && <div className="bio__sub">{personaggio.subtitle}</div>}
        <div className="bio__text">
          {personaggio.background.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      {gruppi.map((gruppo) => {
        const scelto = gruppo.options.find((o) => state.traits.includes(o.id))
        return (
          <div className="sheet-row" key={gruppo.id}>
            <span className="sheet-row__label">{gruppo.label}</span>
            <span className="sheet-row__value">{scelto ? scelto.label : '—'}</span>
          </div>
        )
      })}

      {statistiche.map((stat) => (
        <div className="sheet-row" key={stat.id}>
          <span className="sheet-row__label">{stat.label}</span>
          <span className="sheet-row__value">{state.stats[stat.id] ?? 0}</span>
        </div>
      ))}

      <div style={{ marginTop: 'var(--s-5)' }}>
        <div className="panel__title">{book.setup.wordsLabel ?? "Parole d'Ordine"}</div>
        {state.words.length > 0 ? (
          <div className="words">
            {state.words.map((w) => (
              <span className="word" key={w}>
                {w}
              </span>
            ))}
          </div>
        ) : (
          <p className="empty">
            Non ne hai ancora raccolta nessuna. Compariranno qui quando il racconto te le assegnerà.
          </p>
        )}
      </div>
    </Sheet>
  )
}
