# Webapp librogame — prototipo

Raccolta e lettura di librogame autoriali. React + Vite, mobile first (da 360px fino a desktop piccolo).

```bash
npm install
npm run dev        # http://localhost:5180
npm run validate   # controlla il grafo di tutti i libri
node scripts/simula.js   # gioca 400 partite per combinazione di tratti
```

## Com'è fatta

| Cartella | Cosa contiene |
|---|---|
| `src/engine/` | Il motore, indipendente dalla UI: condizioni, effetti, svolgimento della partita, validatore |
| `src/data/books/` | I libri, come dati puri |
| `src/store/` | Salvataggi e preferenze su `localStorage` |
| `src/screens/` | Libreria, scheda libro, creazione personaggio, lettore, finale |
| `src/styles/` | Token del sistema visivo e fogli di stile |

Il principio: **le meccaniche sono dati, non codice**. Non esiste un solo `if` sul Pregio dentro i componenti. Aggiungere un libro con regole diverse non richiede di toccare il motore.

## Formato di un libro

```js
{
  id, title, author, blurb, tags, length, endingsCount,
  setup: {
    startNode: 1,
    character: { name, subtitle, background: [...] },
    traitGroups: [{ id, label, options: [{ id, label, description }] }],
    stats: [{ id, label, value, min, threshold, thresholdGoto, thresholdReason }],
  },
  nodes: {
    16: {
      text: ['...'],
      effects: [
        // "Perdi 4 punti, se sei Forte ne perdi solo 2"
        { stat: 'determinazione', delta: -4, overrides: [{ if: { trait: 'forte' }, delta: -2 }] },
        { word: 'BAMBINO' },
      ],
      choices: [
        { text: '...', goto: 33, if: { stat: 'determinazione', gte: 1 }, showLocked: true },
      ],
    },
    32: { ending: { id: 'guerra', title: 'Il fronte', tone: 'amaro' }, text: [...] },
  },
}
```

**Condizioni:** `{ trait }`, `{ word }`, `{ stat, gte|lte|gt|lt|eq }`, `{ any }`, `{ all }`, `{ not }`. Un array o più chiavi insieme valgono come `all`.

**Effetti:** sui paragrafi (`node.effects`) o sulla singola scelta (`choice.effects`, serve al §56 del Sogno Profondo, dove la parola AIUTO arriva solo su un ramo).

## Due decisioni che vale la pena conoscere

**La soglia non salta il paragrafo.** Quando la Determinazione arriva a 0, il lettore legge comunque il paragrafo che l'ha azzerata — testo, effetto, e poi un avviso con l'unica strada rimasta. Sul libro di carta funziona così: il testo dell'autore non va mai saltato.

**Le scelte non disponibili restano visibili, con il motivo.** Il testo originale le nomina («se hai la parola FIONDA...»); nasconderle renderebbe il paragrafo incomprensibile.

## Contenuti

«Il Sogno Profondo» (72 paragrafi, 3 finali) è di un autore terzo, trascritto per provare il formato. **Serve il suo consenso prima di qualsiasi pubblicazione.** Gli altri titoli sono segnaposto scritti per riempire la libreria.

## Cosa manca

Non c'è ancora: PWA e service worker (l'app funziona offline solo dopo il primo caricamento del browser), font self-hosted, sincronizzazione fra dispositivi, account, strumenti per gli autori, importazione di file. I progressi stanno solo su questo dispositivo.

Il design brief è in `../design/`.
