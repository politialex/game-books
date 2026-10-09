import { sognoProfondo } from './books/sogno-profondo.js'
import { laTorreDiVetro, seiGiorniAVentotene, ilCatalogoDelleBestie } from './books/segnaposto.js'

/** Libri leggibili. */
export const books = [sognoProfondo, laTorreDiVetro, seiGiorniAVentotene, ilCatalogoDelleBestie]

export function getBook(id) {
  return books.find((b) => b.id === id)
}

/**
 * Schede di catalogo senza testo: servono a mostrare come si comporta
 * la scoperta quando un titolo è annunciato ma non ancora disponibile.
 * Non sono apribili, e la scheda libro lo dice chiaramente.
 */
export const annunci = [
  {
    id: 'annuncio-cometa',
    title: 'La Cometa di Settembre',
    author: 'Nadia Ferro',
    tagline: 'Hai dodici ore prima che la città se ne accorga.',
    tags: ['Fantascienza', 'Tempo reale'],
    length: 140,
    cover: { palette: ['#4a2f52', '#b88ac4'], motif: 'cometa' },
    comingSoon: true,
  },
  {
    id: 'annuncio-fondale',
    title: 'Fondale',
    author: 'Tommaso Riva',
    tagline: 'Duecento metri sotto, e la radio continua a parlare.',
    tags: ['Horror', 'Sottomarino'],
    length: 95,
    cover: { palette: ['#13303a', '#4d7f8c'], motif: 'onde' },
    comingSoon: true,
  },
]
