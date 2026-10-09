import { Sheet } from './Sheet.jsx'
import { DIMENSIONI } from '../store/library.js'

/** Preferenze di lettura. Valgono per tutti i libri e restano salvate. */
export function ReaderSettings({ preferenze, onChange, onClose }) {
  const set = (patch) => onChange({ ...preferenze, ...patch })

  return (
    <Sheet title="Lettura" onClose={onClose}>
      <div className="setting">
        <span className="setting__label" id="lbl-dimensione">
          Dimensione del testo
        </span>
        <div className="segmented" role="group" aria-labelledby="lbl-dimensione">
          {DIMENSIONI.map((d, i) => (
            <button
              key={i}
              aria-pressed={preferenze.dimensione === i}
              aria-label={`Dimensione ${i + 1} di ${DIMENSIONI.length}`}
              onClick={() => set({ dimensione: i })}
              style={{ fontSize: `${0.8 + i * 0.12}rem` }}
            >
              {d.label}
            </button>
          ))}
        </div>
        <p className="size-preview">
          Il pallido sole di ottobre filtra tra il fogliame della vecchia quercia.
        </p>
      </div>

      <div className="setting">
        <span className="setting__label" id="lbl-carattere">
          Carattere
        </span>
        <div className="segmented" role="group" aria-labelledby="lbl-carattere">
          <button
            aria-pressed={preferenze.carattere === 'serif'}
            onClick={() => set({ carattere: 'serif' })}
            style={{ fontFamily: 'var(--font-read-serif)' }}
          >
            Serif
          </button>
          <button
            aria-pressed={preferenze.carattere === 'sans'}
            onClick={() => set({ carattere: 'sans' })}
          >
            Sans
          </button>
        </div>
      </div>

      <div className="setting">
        <span className="setting__label" id="lbl-tema">
          Tema
        </span>
        <div className="segmented" role="group" aria-labelledby="lbl-tema">
          {[
            ['auto', 'Automatico'],
            ['chiaro', 'Chiaro'],
            ['scuro', 'Scuro'],
          ].map(([valore, etichetta]) => (
            <button
              key={valore}
              aria-pressed={preferenze.tema === valore}
              onClick={() => set({ tema: valore })}
            >
              {etichetta}
            </button>
          ))}
        </div>
      </div>
    </Sheet>
  )
}
