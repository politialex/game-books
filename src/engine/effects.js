import { evaluate } from './conditions.js'

/**
 * Applicazione degli effetti di un paragrafo.
 *
 * Forme riconosciute:
 *
 *   { stat: 'determinazione', delta: -4, overrides: [{ if: { trait: 'forte' }, delta: -2 }] }
 *   { stat: 'determinazione', set: 0 }
 *   { word: 'BAMBINO' }                  raccoglie una parola d'ordine
 *   { word: 'VANTAGGIO', once: true }    la raccoglie solo se non la possiede già
 *   { removeWord: 'AIUTO' }
 *
 * Ogni effetto può avere un `if` che ne condiziona l'applicazione.
 * Il primo `override` la cui condizione è vera sostituisce il valore base.
 *
 * Ritorna il nuovo stato e un registro leggibile di ciò che è successo,
 * che il lettore mostra sotto al testo del paragrafo.
 */
export function applyEffects(effects, state, book) {
  let next = {
    ...state,
    stats: { ...state.stats },
    words: [...state.words],
  }
  const log = []

  for (const effect of effects ?? []) {
    if (!evaluate(effect.if, next)) continue

    if (effect.stat !== undefined) {
      const stat = (book.setup.stats ?? []).find((s) => s.id === effect.stat)
      const label = stat ? stat.label : effect.stat
      const before = next.stats[effect.stat] ?? 0

      let delta = effect.delta
      let set = effect.set
      for (const override of effect.overrides ?? []) {
        if (evaluate(override.if, next)) {
          if (override.delta !== undefined) delta = override.delta
          if (override.set !== undefined) set = override.set
          break
        }
      }

      let after = set !== undefined ? set : before + (delta ?? 0)
      if (stat?.min !== undefined) after = Math.max(stat.min, after)
      if (stat?.max !== undefined) after = Math.min(stat.max, after)
      next.stats[effect.stat] = after

      if (after !== before) {
        const diff = after - before
        log.push({
          kind: diff > 0 ? 'gain' : 'loss',
          text: `${diff > 0 ? '+' : ''}${diff} ${label}`,
          detail: `${label}: ${before} → ${after}`,
        })
      }
    }

    if (effect.word !== undefined) {
      if (!next.words.includes(effect.word)) {
        next.words = [...next.words, effect.word]
        log.push({ kind: 'word', text: `Parola d'ordine: ${effect.word}` })
      } else if (!effect.once) {
        log.push({ kind: 'word', text: `Possiedi già la parola ${effect.word}`, muted: true })
      }
    }

    if (effect.removeWord !== undefined) {
      if (next.words.includes(effect.removeWord)) {
        next.words = next.words.filter((w) => w !== effect.removeWord)
        log.push({ kind: 'loss', text: `Perdi la parola ${effect.removeWord}` })
      }
    }
  }

  return { state: next, log }
}

/**
 * Regola di sopravvivenza: se una statistica tocca la sua soglia,
 * il lettore viene mandato d'ufficio a un paragrafo.
 * Nel Sogno Profondo: Determinazione a 0 porta al paragrafo 32.
 */
export function checkThresholds(state, book) {
  for (const stat of book.setup.stats ?? []) {
    if (stat.threshold === undefined || stat.thresholdGoto === undefined) continue
    const value = state.stats[stat.id] ?? 0
    if (value <= stat.threshold) {
      return {
        goto: stat.thresholdGoto,
        reason: stat.thresholdReason ?? `${stat.label} è arrivata a ${value}.`,
      }
    }
  }
  return null
}
