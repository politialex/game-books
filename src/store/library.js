/**
 * Persistenza locale. Tutto resta sul dispositivo: la lettura deve
 * funzionare offline e riprendere esattamente da dove si era rimasti.
 *
 * Una chiave per la libreria (progressi e finali trovati) e una per
 * le preferenze di lettura, che valgono per tutti i libri.
 */

const CHIAVE_LIBRERIA = 'librogame.libreria.v1'
const CHIAVE_PREFERENZE = 'librogame.preferenze.v1'

function leggi(chiave, fallback) {
  try {
    const raw = localStorage.getItem(chiave)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function scrivi(chiave, valore) {
  try {
    localStorage.setItem(chiave, JSON.stringify(valore))
  } catch {
    // Spazio esaurito o navigazione privata: la lettura continua,
    // semplicemente non viene salvata.
  }
}

/* ---------- Libreria ---------- */

export function caricaLibreria() {
  return leggi(CHIAVE_LIBRERIA, {})
}

export function salvaLibreria(libreria) {
  scrivi(CHIAVE_LIBRERIA, libreria)
}

/** Lo stato di un libro: partita in corso, finali trovati, numero di letture. */
export function statoLibro(libreria, bookId) {
  return libreria[bookId] ?? { corrente: null, finali: [], letture: 0 }
}

export function salvaPartita(libreria, bookId, partita) {
  const stato = statoLibro(libreria, bookId)
  return { ...libreria, [bookId]: { ...stato, corrente: partita } }
}

export function registraFinale(libreria, bookId, endingId) {
  const stato = statoLibro(libreria, bookId)
  const finali = stato.finali.includes(endingId) ? stato.finali : [...stato.finali, endingId]
  return { ...libreria, [bookId]: { ...stato, finali, letture: stato.letture + 1, corrente: null } }
}

export function abbandonaPartita(libreria, bookId) {
  const stato = statoLibro(libreria, bookId)
  return { ...libreria, [bookId]: { ...stato, corrente: null } }
}

/** da-leggere | in-corso | finito */
export function statoLettura(libreria, bookId) {
  const stato = statoLibro(libreria, bookId)
  if (stato.corrente) return 'in-corso'
  if (stato.finali.length > 0) return 'finito'
  return 'da-leggere'
}

/* ---------- Preferenze di lettura ---------- */

export const PREFERENZE_INIZIALI = {
  tema: 'auto', // auto | chiaro | scuro
  dimensione: 2, // indice in DIMENSIONI
  carattere: 'serif', // serif | sans
}

export const DIMENSIONI = [
  { label: 'A', rem: 1, leading: 1.68 },
  { label: 'A', rem: 1.0625, leading: 1.7 },
  { label: 'A', rem: 1.125, leading: 1.72 },
  { label: 'A', rem: 1.25, leading: 1.74 },
  { label: 'A', rem: 1.4375, leading: 1.76 },
]

export function caricaPreferenze() {
  return { ...PREFERENZE_INIZIALI, ...leggi(CHIAVE_PREFERENZE, {}) }
}

export function salvaPreferenze(preferenze) {
  scrivi(CHIAVE_PREFERENZE, preferenze)
}

/** Riporta le preferenze sul documento, da cui il CSS le legge. */
export function applicaPreferenze(preferenze) {
  const root = document.documentElement
  const scuroDiSistema = window.matchMedia('(prefers-color-scheme: dark)').matches
  const scuro = preferenze.tema === 'scuro' || (preferenze.tema === 'auto' && scuroDiSistema)

  root.dataset.theme = scuro ? 'dark' : 'light'
  root.dataset.readingFont = preferenze.carattere

  const dimensione = DIMENSIONI[preferenze.dimensione] ?? DIMENSIONI[2]
  root.style.setProperty('--reading-size', `${dimensione.rem}rem`)
  root.style.setProperty('--reading-leading', String(dimensione.leading))

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', scuro ? '#17151a' : '#f7f3ec')
}
