/**
 * Libri segnaposto: servono a vedere come si comporta la libreria
 * con più titoli, generi e stati diversi. Sono brevi ma veri,
 * cioè giocabili fino a un finale, così anche la scheda libro
 * e il conteggio dei finali mostrano dati reali e non finti.
 */

export const laTorreDiVetro = {
  id: 'torre-di-vetro',
  title: 'La Torre di Vetro',
  author: 'Irene Baldassi',
  year: 2024,
  tagline: 'Trentuno piani, e l\'ascensore sale solo di notte.',
  blurb:
    'Sei l\'ultima archivista di una torre che nessuno ricorda di aver costruito. Ogni notte l\'ascensore sale di un piano, e ogni piano chiede qualcosa in cambio.',
  tags: ['Mistero', 'Urbano', 'Contemporaneo'],
  length: 6,
  endingsCount: 2,
  cover: { palette: ['#3a3550', '#8b86a8'], motif: 'torre' },
  rights: { status: 'segnaposto' },
  setup: {
    startNode: 1,
    intro: ['Un racconto breve. Due finali, molto diversi tra loro.'],
    character: {
      name: 'Vera',
      subtitle: 'archivista',
      backgroundTitle: 'Chi sei',
      background: [
        'Lavori nella torre da undici anni e non ricordi il colloquio di assunzione. Nessuno dei colleghi lo ricorda.',
      ],
    },
    traitGroups: [
      {
        id: 'metodo',
        label: 'Il tuo metodo',
        help: 'Scegline uno solo',
        options: [
          { id: 'paziente', label: 'Paziente', description: 'Aspetti che siano le cose a rivelarsi.' },
          { id: 'curiosa', label: 'Curiosa', description: 'Apri tutte le porte, anche quelle chiuse.' },
        ],
      },
    ],
    stats: [
      { id: 'lucidita', label: 'Lucidità', value: 3, min: 0, threshold: 0, thresholdGoto: 5, thresholdReason: 'Hai perso il filo.' },
    ],
    wordsLabel: 'Appunti',
  },
  nodes: {
    1: {
      text: [
        "L'ascensore si apre al ventesimo piano, che ieri non esisteva. Il corridoio è identico al tuo, tranne per una porta in più in fondo.",
      ],
      choices: [
        { text: 'Vai verso la porta in più', goto: 2 },
        { text: 'Torni indietro e segni tutto nel registro', goto: 3 },
      ],
    },
    2: {
      text: ['La porta non ha maniglia. Ha il tuo nome, inciso di fresco.'],
      effects: [{ stat: 'lucidita', delta: -1 }, { word: 'NOME' }],
      choices: [
        { text: 'Bussi', goto: 4 },
        { text: 'Se sei Paziente, aspetti che si apra da sola', goto: 6, if: { trait: 'paziente' }, showLocked: true },
      ],
    },
    3: {
      text: ['Scrivi tutto. La tua calligrafia, rileggendola, non è la tua.'],
      effects: [{ stat: 'lucidita', delta: 1 }],
      choices: [{ text: 'Torni al ventesimo piano', goto: 2 }],
    },
    4: {
      text: ['Dall\'altra parte, qualcuno bussa esattamente nello stesso modo. Tre colpi, poi due.'],
      effects: [{ stat: 'lucidita', delta: -2 }],
      choices: [{ text: 'Rispondi', goto: 6 }],
    },
    5: {
      ending: { id: 'archivio', title: 'Una riga nel registro', tone: 'amaro' },
      text: [
        'La mattina dopo, al ventesimo piano, c\'è una porta in meno e un\'archivista in più. Nessuno se ne accorge, perché nessuno ricorda mai quante siete.',
      ],
    },
    6: {
      ending: { id: 'soglia', title: 'La soglia', tone: 'luminoso' },
      text: [
        'La porta si apre su una stanza vuota con una finestra, e dalla finestra si vede la strada: non la torre, la strada. Esci. È la prima volta in undici anni che senti la pioggia.',
      ],
    },
  },
}

export const seiGiorniAVentotene = {
  id: 'sei-giorni',
  title: 'Sei giorni a Ventotene',
  author: 'Marco Lenzi',
  year: 2023,
  tagline: 'Un\'estate, un motorino, una cosa che non hai detto.',
  blurb:
    'Nessun mostro, nessuna magia. Solo sei giorni su un\'isola piccola, e una conversazione che continui a rimandare.',
  tags: ['Intimista', 'Estate', 'Senza combattimenti'],
  length: 6,
  endingsCount: 2,
  cover: { palette: ['#2e5c62', '#89c2c4'], motif: 'onde' },
  rights: { status: 'segnaposto' },
  setup: {
    startNode: 1,
    intro: ['Un racconto senza statistiche. Contano solo le cose che dici.'],
    character: {
      name: 'Tu',
      subtitle: 'diciassette anni',
      backgroundTitle: 'Dove sei',
      background: ['Ultima estate prima dell\'università. Giulia parte giovedì.'],
    },
    traitGroups: [],
    stats: [],
    wordsLabel: 'Cose dette',
  },
  nodes: {
    1: {
      text: ['Il traghetto delle sette. Giulia dorme con la testa contro il finestrino e tu fai finta di leggere.'],
      choices: [
        { text: 'La svegli', goto: 2 },
        { text: 'La lasci dormire', goto: 3 },
      ],
    },
    2: {
      text: ['«Siamo arrivati.» «Già?» Si stira. «Hai una faccia strana.» «Ho sempre questa faccia.» «No.»'],
      effects: [{ word: 'FACCIA STRANA' }],
      choices: [{ text: 'Scendete', goto: 4 }],
    },
    3: {
      text: ['Arriva il porto, arrivano le case bianche, arriva il momento, e tu non la svegli.'],
      choices: [{ text: 'Scendete', goto: 4 }],
    },
    4: {
      text: [
        'Sei giorni passano come passano i giorni d\'agosto: tutti insieme, e poi di colpo è giovedì.',
        'Il traghetto delle sette e dieci è già in rada.',
      ],
      choices: [
        { text: 'Prosegui', goto: 5, if: { word: 'FACCIA STRANA' } },
        { text: 'Prosegui', goto: 6, if: { not: { word: 'FACCIA STRANA' } } },
      ],
    },
    5: {
      ending: { id: 'detto', title: 'Sette e dieci', tone: 'luminoso' },
      text: [
        '«Allora, questa faccia strana.» lo dice lei, non tu, e forse è per questo che riesci a rispondere.',
        'Il traghetto aspetta. I traghetti, a Ventotene, aspettano sempre un po\'.',
      ],
    },
    6: {
      ending: { id: 'giovedi', title: 'Giovedì', tone: 'agrodolce' },
      text: [
        'Lei sale, tu resti sul molo, e quello che volevi dire resta una cosa che pensavi di dire.',
        'Ci sono anni in cui va così.',
      ],
    },
  },
}

export const ilCatalogoDelleBestie = {
  id: 'catalogo-bestie',
  title: 'Il Catalogo delle Bestie Minori',
  author: 'Collettivo Stampalesta',
  year: 2025,
  tagline: 'Censire draghi è un lavoro d\'ufficio.',
  blurb:
    'Sei un ispettore del Catasto Fantastico. Il tuo compito è misurare, classificare e archiviare creature che preferirebbero non essere misurate.',
  tags: ['Comico', 'Fantasy', 'Burocrazia'],
  length: 3,
  endingsCount: 1,
  cover: { palette: ['#6b4a2f', '#d4a574'], motif: 'timbro' },
  rights: { status: 'segnaposto' },
  setup: {
    startNode: 1,
    intro: ['Un assaggio di tre paragrafi. Il resto del catalogo è in lavorazione.'],
    character: {
      name: 'Ispettore Vidali',
      subtitle: 'matricola 4471',
      backgroundTitle: 'Mansione',
      background: ['Catasto Fantastico, ufficio Bestie Minori, scrivania vicino al termosifone rotto.'],
    },
    traitGroups: [],
    stats: [{ id: 'moduli', label: 'Moduli rimasti', value: 2, min: 0 }],
    wordsLabel: 'Timbri raccolti',
  },
  nodes: {
    1: {
      text: [
        'Il grifone è lungo tre metri e dieci, e sostiene di essere lungo tre metri e quaranta. Il modulo B-12 non prevede contestazioni.',
      ],
      choices: [
        { text: 'Scrivi tre e dieci', goto: 2 },
        { text: 'Scrivi tre e quaranta, per quieto vivere', goto: 3 },
      ],
    },
    2: {
      text: ['Il grifone legge il modulo da sopra la tua spalla. Segue una discussione di quaranta minuti.'],
      effects: [{ stat: 'moduli', delta: -1 }],
      choices: [{ text: 'Compila un nuovo modulo', goto: 3 }],
    },
    3: {
      ending: { id: 'protocollo', title: 'Protocollato', tone: 'luminoso' },
      text: ['Pratica 4471/B chiusa. Il grifone è soddisfatto. L\'archivio no, ma l\'archivio non è mai soddisfatto.'],
    },
  },
}
