import { evaluate } from './conditions.js'
import { applyEffects, checkThresholds } from './effects.js'

/**
 * Una partita è una sequenza di passi. Ogni passo registra lo stato
 * *prima* di entrare nel paragrafo, così tornare indietro è esatto
 * e non serve ricalcolare nulla.
 */

export function startPlaythrough(book, traits) {
  const stats = {}
  for (const stat of book.setup.stats ?? []) stats[stat.id] = stat.value ?? 0

  const initial = { traits, words: [], stats }
  return enterNode(book, { steps: [], state: initial }, book.setup.startNode ?? 1)
}

/** Entra in un paragrafo: applica gli effetti, poi verifica le soglie. */
function enterNode(book, run, nodeId) {
  const node = book.nodes[nodeId]
  if (!node) throw new Error(`Paragrafo ${nodeId} inesistente in "${book.title}"`)

  const { state, log } = applyEffects(node.effects, run.state, book)
  const step = { nodeId, state, log }

  // Sul libro di carta il paragrafo che azzera la statistica si legge comunque:
  // prima il testo e l'effetto, poi l'istruzione di andare al capitolo di
  // ripiego. Qui vale lo stesso — il testo dell'autore non va mai saltato.
  // Il salto diventa l'unica strada che resta, non un teletrasporto.
  const threshold = checkThresholds(state, book)
  if (threshold && threshold.goto !== nodeId) {
    step.forced = { goto: threshold.goto, reason: threshold.reason }
  }

  return { steps: [...run.steps, step], state }
}

/**
 * Alcuni effetti appartengono alla singola scelta e non al paragrafo
 * (nel Sogno Profondo, il §56 assegna la parola AIUTO solo su un ramo).
 * Vengono applicati prima di entrare nel paragrafo di destinazione,
 * e il loro registro viene unito a quello del paragrafo.
 */
export function choose(book, run, choice) {
  let next = run
  let carried = []

  if (choice.effects?.length) {
    const { state, log } = applyEffects(choice.effects, run.state, book)
    next = { ...run, state }
    carried = log
  }

  const result = enterNode(book, next, choice.goto)
  if (carried.length) {
    const steps = [...result.steps]
    const last = steps[steps.length - 1]
    steps[steps.length - 1] = { ...last, log: [...carried, ...last.log] }
    return { ...result, steps }
  }
  return result
}

/** Annulla l'ultima scelta: si torna al paragrafo precedente e allo stato che aveva. */
export function goBack(run) {
  if (run.steps.length <= 1) return run
  const steps = run.steps.slice(0, -1)
  return { steps, state: steps[steps.length - 1].state }
}

export function currentStep(run) {
  return run.steps[run.steps.length - 1]
}

export function currentNode(book, run) {
  return book.nodes[currentStep(run).nodeId]
}

/**
 * Le scelte del paragrafo corrente, già valutate.
 * Una scelta non disponibile viene nascosta, oppure mostrata bloccata
 * con il motivo, se l'autore ha messo `showLocked`.
 */
export function visibleChoices(book, run) {
  const step = currentStep(run)

  // Soglia superata: le scelte del paragrafo non valgono più, resta una strada.
  if (step.forced) {
    return [{ text: 'Prosegui', goto: step.forced.goto, available: true, forced: true }]
  }

  const node = currentNode(book, run)
  return (node.choices ?? [])
    .map((choice) => ({ ...choice, available: evaluate(choice.if, step.state) }))
    .filter((choice) => choice.available || choice.showLocked)
}

export function isEnding(book, run) {
  const step = currentStep(run)
  if (step.forced) return false
  return Boolean(book.nodes[step.nodeId].ending)
}

/** Stato serializzabile, per il salvataggio. Il testo non viene salvato. */
export function serialize(run) {
  return {
    steps: run.steps.map((s) => ({
      nodeId: s.nodeId,
      state: s.state,
      log: s.log,
      forced: s.forced,
    })),
  }
}

export function deserialize(saved) {
  const steps = saved.steps ?? []
  return { steps, state: steps.length ? steps[steps.length - 1].state : null }
}
