/**
 * "Il Sogno Profondo" — 72 paragrafi, 3 finali.
 *
 * Trascrizione del PDF dell'autore. Il testo è riportato fedelmente,
 * comprese le irregolarità di accento dell'originale.
 *
 * ATTENZIONE: contenuto di terzi. L'autore non ha ancora dato il consenso
 * alla pubblicazione. Questo file resta locale, a uso di prototipo.
 */

import { nodiParte2 } from './sogno-profondo-parte2.js'

export const sognoProfondo = {
  id: 'sogno-profondo',
  title: 'Il Sogno Profondo',
  author: 'Autore da confermare',
  year: null,
  tagline: 'Un orsetto di pezza contro la Creatura Della Notte.',
  blurb:
    "Max vive in un orfanotrofio dei primi del '900, da qualche parte in Europa. Ha quattordici anni, un angioma sul volto che gli adulti evitano di guardare, e un orsacchiotto che non lo lascia mai. Stanotte scoprirà cosa si nasconde davvero sotto i letti dei suoi fratelli.",
  tags: ['Avventura', 'Fiaba oscura', 'Primi del Novecento'],
  length: 72,
  endingsCount: 3,
  cover: { palette: ['#2a3b4d', '#6d8a9c'], motif: 'quercia' },
  rights: { status: 'da-verificare', note: "Serve il consenso dell'autore prima di qualsiasi pubblicazione." },

  setup: {
    startNode: 1,
    intro: [
      'Il Sogno Profondo è un racconto interattivo.',
      'Durante la lettura ti sarà chiesto di compiere delle scelte. Segui le indicazioni al termine dei paragrafi per proseguire la storia. Se ci sono diverse opzioni, scegli quella che preferisci intraprendere.',
      'Le tue scelte influenzeranno lo svolgersi del racconto.',
      'Il racconto dispone di tre finali. Riuscirai ad ottenere il finale più bello per il coraggioso Max?',
    ],
    character: {
      name: 'Max',
      subtitle: 'Maxwell',
      backgroundTitle: 'Il Tuo Passato ed il tuo Carattere',
      background: [
        "La Infermiera dell'orfanotrofio in cui ti trovi, ti ha raccontato di averti trovato lei stessa sotto La Quercia del giardino. Era dicembre e nevicava forte, ma le fronde dell'albero ti hanno in qualche modo protetto dalla neve e l'Orsacchiotto che avevi con te, ti ha tenuto al caldo. Senza di loro non ce l'avresti mai fatta.",
        'Sono ormai passati 14 anni e non sei mai stato adottato, anche a causa di una vistosa Angioma ben visibile sul tuo volto, una grossa macchia cremisi che molti adulti evitano di guardare.',
        "Ora che sei il bambino piú vecchio dell'orfanotrofio, ti senti in dovere di aiutare, come puoi, i bambini piú piccoli in modo che almeno loro possano trovare una Mamma ed un Papá. Questo tuo senso di protezione per gli altri però ti ha sempre impedito di cercare per te una famiglia.",
      ],
    },
    traitGroups: [
      {
        id: 'pregio',
        label: 'Il Tuo Pregio',
        help: 'Scegline uno solo',
        options: [
          { id: 'forte', label: 'Forte', description: 'Sarai robusto e prestante ed in grado di colpire con vigore i tuoi nemici.' },
          { id: 'agile', label: 'Agile', description: 'Sarai leggero, in grado di correre velocemente e schivare gli attacchi verso di te.' },
          { id: 'leale', label: 'Leale', description: 'Sarai di natura amichevole, gentile ed Empatica.' },
        ],
      },
      {
        id: 'paura',
        label: 'Una Tua Paura',
        help: 'Scegline una sola',
        options: [
          { id: 'insetti', label: 'Paura degli Insetti', description: 'Tremerai di terrore alla loro vista.' },
          { id: 'vertigini', label: 'Soffri di Vertigini', description: 'Ti sentirai male tutte le volte che dovrai avere a che fare con una grande altezza.' },
        ],
      },
    ],
    stats: [
      {
        id: 'determinazione',
        label: 'Determinazione',
        value: 2,
        min: 0,
        description: 'La tua forza di volontà nel proseguire l\'avventura.',
        threshold: 0,
        thresholdGoto: 32,
        thresholdReason: 'La tua Determinazione è arrivata a zero.',
      },
    ],
    wordsLabel: "Parole d'Ordine",
    wordsHelp: 'Le parole che raccogli lungo la strada. Alcuni bivi si aprono solo se le possiedi.',
  },

  nodes: {
    1: {
      text: [
        'Il pallido sole di ottobre filtra tra il fogliame della vecchia quercia, fino ad accarezzarti il viso.',
        "Tu ed i tuoi numerosi fratelli siete appena usciti dalla porta dell'orfanotrofio, pronti ad affrontare una nuova mattinata di incontri con i potenziali genitori.",
        'Questa mattina ben dieci adulti sono giá disposti in riga, pronti ad esaminarvi mentre giocate all\'aria aperta.',
        'Sistemi la targhetta sul petto in modo che si possa leggere bene il tuo nome ed inizi a controllare come se la stanno cavando i tuoi fratelli, quando un uomo vestito con un elegante cappotto nero ti si avvicina. Ha un viso pallido ed allungato, due baffi sottili ed un cappello a cilindro di gran moda. «Giovinotto, lei mi sembra fin troppo un ragazzo e ben poco un bambino. Cosa ci fa ancora in questa struttura?»',
      ],
      choices: [
        { text: "Trovi il tempo per rispondere all'Uomo", goto: 9 },
        { text: 'Lo ignori e vai a soccorrere un fratello in difficoltà', goto: 5 },
      ],
    },

    2: {
      text: [
        'Con un guizzo degno di un uccello rapace, riesci a toccare la spalla di Pierre e di Penny. Inutili risultano le lamentele di entrambi: li hai presi onestamente. Ma é proprio in quel momento che il piccolo Tommy inizia a correre verso la quercia! Se la tocca libererà tutti!',
        'Correte tutti e tre a perdifiato verso il bambino. Tu per acciuffarlo. Gli altri due per ostacolarti!',
        'Infine riesci ad acciuffare il piccolo, portando a casa la vittoria!',
      ],
      choices: [{ text: 'Goditi il resto della serata con i tuoi fratelli', goto: 40 }],
    },

    3: {
      text: [
        'Rientrate in due file ordinate, La Infermiera vi conduce nei bagni in modo farvi lavare le mani ed il viso. In seguito andate nel refettorio per la cena. In qualità di "bambino grande" è tuo dovere portare i piatti caldi a tavola. Ultimato il tuo compito, ma non prima di esserti servito una generosa porzione di purea, crostini e fagioli, ti siedi a mangiare assieme ai tuoi fratelli.',
        'Dopo qualche cucchiaiata del pasto caldo, la tua attenzione si sposta su Jacky, un ragazzo con quasi un anno in meno di te. Anche lui, come te, non viene mai scelto dai genitori, ma a differenza tua non sembra preoccuparsene.',
        "Jacky stá approfittando del fatto che La Infermiera non é presente nella sala, per alzare la voce verso sei bambini piccoli. «Voglio che mi consegnate il pupazzo. Rivoglio il MIO polipo. Non mi ripeterò di nuovo. Uno...DUE....»",
      ],
      choices: [
        { text: 'Preferisci finire il tuo pasto', goto: 21 },
        { text: 'Intervieni nella conversazione', goto: 47 },
      ],
    },

    4: {
      text: [
        'Afferrato Tommy, ti allontani il più velocemente possibile, dirigendoti alla quercia. Ma quando stai per tirare un sospiro di sollievo, il piccolo Tommy inizia a piangere.',
        "Ti posizioni in ginocchio davanti a lui, per capire cosa c'è che non va: Noti che il suo calzone é diventato bagnato.",
        'Un poco imbarazzato, lo accompagni dalla Infermiera.',
      ],
      effects: [{ word: 'BAMBINO' }],
      choices: [
        { text: "Se hai la parola d'ordine ADULTO", goto: 35, if: { word: 'ADULTO' }, showLocked: true },
        { text: "Magari nell'aiutare Penny sarai piu fortunato?", goto: 39 },
      ],
    },

    5: {
      text: [
        "Lesto come una Lepre, ti allontani dall'uomo e ti dirigi verso Pierre che nel frattempo è scoppiato in lacrime davanti ad una potenziale mamma. Il motivo? La porta del capanno degli attrezzi si è aperta da sola!",
        '«Il mostro... il mostro.... la Creatura Della Notte che vive nel buio sotto ai letti. Mi ha seguito fino a qui!!!» Commenta in lacrime Pierre. Afferri la sua piccola mano e lo porti dinnanzi al capanno spalancandone la porta e provi a spiegargli che non c\'è nessun mostro.',
        "«Ma è la creatura dell'ombra Max. Se vede la luce scappa via. Ecco perché ora non c'è. Ma tornerà stasera e mi mangerà i piedi...» Ridi alle parole del piccolo e ti appresti a chiudere la porta del capanno con il catenaccio. Se La Infermiera dovesse trovarla aperta, sarebbero guai! Porti Pierre sotto alla grande quercia e lo fai sedere tra le sue radici. La tranquillità di quel posto rinfranca presto lo spirito del bambino.",
        'Nel frattempo noti che sia il piccolo Tommy sia Penny si trovano in difficoltà!',
      ],
      choices: [
        { text: "Controlli Tommy che circondato da adulti, saltella da un piede all'altro disperato", goto: 67 },
        { text: 'Controlli Penny che è immobile davanti ad un signore', goto: 39 },
      ],
    },

    6: {
      text: [
        'Giunto dal piccolo Tommy, scopri che assieme a lui si sono nascosti anche Penny e Pierre! Che colpo di fortuna!',
      ],
      choices: [
        { text: 'Se vuoi dargli un vantaggio', goto: 12 },
        { text: 'Se vuoi prenderli subito', goto: 2 },
      ],
    },

    7: {
      text: [
        "«Jakie non c'é bisogno di fare così. Il pupazzo é tuo, ma é evidente che per questa notte è piú importante che lo tengano loro. Li aiuterà a dormire, e se dormono, non ti sveglieranno con le loro urla.»",
        '«Si ma... serve a me.» balbetta arrabbiato Jackie.',
        'Una bambina si alza dalla sedia e chiede «Anche tu hai paura della creatura della notte?»',
        'Jakie diventa tutto paonazzo in viso e vi fissa male.',
      ],
      effects: [{ stat: 'determinazione', delta: 1 }],
      choices: [
        { text: 'Se vuoi chiedere di piú sulla Creatura Della Notte', goto: 10 },
        { text: 'Se ritieni chiusa la questione', goto: 17 },
      ],
    },

    8: {
      text: [
        'Ti affianchi al cerchio di donne, salutandole educatamente, le signore ricambiano il tuo saluto, ma quando ti guardano in faccia, come fanno sempre gli adulti, iniziano ad allontanarsi da te, facendoti stare male.',
        "Perché gli adulti hanno quella reazione ogni volta che ti guardano in faccia? Cerchi di non perderti d'animo ed esclami a gran voce: «Signore future mamme, sapete? Il piccolo Tommy sa giá parlare, sa giocare da solo e sa anche contare! Quanto fa due più due Tommy?» Ti volti verso Tommy e di nascosto gli mostri quattro dita. Il piccolino peró ha ben altri problemi. Una grossa macchia di pipì si stá allargando sul suo calzone. Le donne, disgustate dallo spettacolo si allontanano. La Infermiera accorre subito e prende Tommy in braccio, pronta a riportarlo all'interno.",
      ],
      effects: [{ stat: 'determinazione', delta: -1 }, { word: 'BAMBINO' }],
      choices: [
        { text: "Se hai la parola d'ordine ADULTO", goto: 35, if: { word: 'ADULTO' }, showLocked: true },
        { text: 'Magari nell\'aiutare Penny sarai più fortunato?', goto: 39 },
      ],
    },

    9: {
      text: [
        'Schiarisci la voce e con un tono educato ed impostato rispondi: «Oh! Salve Signore. In effetti risiedo in questa struttura ormai da ben 14 inverni. Mi scusi, purtroppo, come fratello maggiore, adesso devo aiutare i miei fratelli che sono in difficoltà, non ho tempo di cercarmi una famiglia mia.»',
        "L'uomo con i baffi a manubrio rimane di stucco difronte alla tua dichiarazione.",
      ],
      effects: [{ stat: 'determinazione', delta: 1 }, { word: 'MANUBRIO' }],
      choices: [{ text: 'Prosegui', goto: 5 }],
    },

    10: {
      text: [
        '«Se non lo conosci e perché non ti ha mai fatto visita.» commenta tristemente Jakye. Inaspettatamente, un bambino del tavolo si unisce al discorso:',
        '«É brutto. Ti legge nella testa! Scopre le tue paure e te le manda contro.» Jakye lo zittisce con un brusco gesto.',
        '«Considerati fortunato se non l\'hai mai incontrato. Quando andiamo a letto, lui striscia tra le ombre, con i suoi tentacoli di oscurità ti tira i piedi e con i suoi artigli tenta di dilaniarti le carni. Assume la forma di ciò che più hai paura. Adora affondare i suoi denti alla pancia! E quando lo fa senti freddo. Le viscere ti si contorcono fino a non farti respirare. Ed é cosí ogni notte. Fino a che non trova le paure di qualcun altro con cui cibarsi.» Tutti i presenti si ammutoliscono all\'istante. Un alone di paura vi avvolge, tanto da rendere l\'ambiente del refettorio meno luminoso. Ad un tratto la porta della stanza si apre di colpo e tutti quanti gemete e urlate dallo spavento. Spaventata, La Infermiera grida anch\'essa, mentre con la mano sorregge il pomello della porta. Dopo una bella ramanzina, la donna vi obbliga a finire rapidamente il pasto.',
      ],
      choices: [{ text: 'Finisci il tuo Pasto', goto: 17 }],
    },

    11: {
      text: [
        "Con una finta ritrai il braccio in tempo e colpisci la creatura all'altezza della sua pancia di pezza nera. Approfittando della lentezza del tuo avversario, schivi un paio di suoi attacchi prima di riuscire a contrattaccare.",
      ],
      choices: [
        { text: 'Se vuoi provare a colpirlo ancora', goto: 70 },
        { text: 'Se preferisci provare ad afferrarlo', goto: 27 },
      ],
    },

    12: {
      text: [
        'Appena Penny e Pierre iniziano a correre, fai finta di inciampare. Vedendo i due amici correre, anche il piccolo Tommy inizia a sgambettare. La scena ti scalda il cuore e ti mette di buon umore. Riprendi a rincorrerli, riuscendoli a toccare uno dopo l\'altro!',
      ],
      effects: [{ stat: 'determinazione', delta: 1 }],
      choices: [{ text: 'Goditi il resto della serata con i tuoi fratelli', goto: 40 }],
    },

    13: {
      text: [
        'Corri veloce come il vento verso la porta del capanno. Ad un tratto ti volti, vedi la mano-ombra che ti afferra il piede e tira verso di se! Sbatti il sedere contro il terreno e vieni trascinato lontano dal capanno strisciando a terra con la schiena.',
        "Improvvisamente, vieni tirato verso il basso, in una buca nel terreno. Giunto sul fondo della fossa, la mano lascia la presa. Rimettendoti in piedi, noti che parte dell'imbottitura di cui sei composto é ormai andata perduta.",
      ],
      effects: [{ stat: 'determinazione', delta: -1 }],
      choices: [{ text: 'Esplora il Tunnel', goto: 49 }],
    },

    14: {
      text: [
        'Noti che al piccolo Tommy scappa la pipì. Immediatamente ti ricordi che a lui capita spesso di farsela addosso nonostante sia ormai grandicello.',
      ],
      choices: [
        { text: 'Se vuoi portare via il piccolo Tommy', goto: 25 },
        { text: 'Se vuoi aiutarlo a trovare una Mamma', goto: 8 },
      ],
    },

    15: {
      text: [
        'Dovrai anche affrontare la Creatura Della Notte, ma non sei mica costretto a dover combattere tutte le battaglie!',
        "Le zanne dell'aracnide stanno per chiudersi attorno alla tua testa di pezza, ma ti abbassi di scatto e svelto come un coniglio fuggi ai piedi della quercia!",
        'Appena sei certo di non essere inseguito dal ragno, ti incammini verso il capanno.',
      ],
      choices: [{ text: 'Prosegui verso il capanno', goto: 48 }],
    },

    16: {
      text: [
        'La Cosa si avvicina a te sempre più veloce. Sempre più veloce... e una nebbia di oscurità ancora più scura e nera ti avvolge. Inizi a sentire freddo e pensi: «Perché sto facendo l\'eroe? Non devo andare a caccia di mostri. Devo aiutare i miei fratelli a cercare famiglia, non a combattere mostri immaginari. Non devo evadere con la fantasia.. Devo aiutare loro e forse, dimenticare la speranza di essere adottato.»',
      ],
      effects: [
        {
          stat: 'determinazione',
          delta: -4,
          overrides: [{ if: { trait: 'forte' }, delta: -2 }],
        },
      ],
      choices: [
        { text: 'Se possiedi almeno un punto determinazione prosegui', goto: 33, if: { stat: 'determinazione', gte: 1 }, showLocked: true },
      ],
    },

    17: {
      text: [
        'Torni a concentrarti sul tuo piatto, ed anche se si é parzialmente freddato, lo finisci con piacere.',
        'Una volta terminata la cena, La Infermiera come sempre vi porta nuovamente ai bagni ed infine nelle rispettive camere. La tua camerata é al primo piano ed assieme a te ci sono il piccolo Tommy, Penny, Pierre, ed altri bambini.',
        'Dopo aver indossato il pigiama, accarezzi il tuo inseparabile orsacchiotto con tenerezza e nostalgia.',
        'Rivolgi lo sguardo verso la finestra, dove la quercia è ben visibile in tutta la sua maestosità. Se te ne andassi, chi si prenderebbe cura dei tuoi fratelli?',
        'Vieni riportato alla realtà dal pianto sommesso del piccolo Tommy. Ti avvicini a lui per scoprire le ragioni del suo pianto: ha paura che la Creatura Della Notte esca da sotto il letto e lo morda, o peggio, gli faccia bagnare di nuovo il letto! Ti inginocchi davanti ad ogni letto, ed aiutandoti con una candela, dimostri a tutti i bambini che non ci sono mostri. Infine sistemi un piccolo specchio vicino alla finestra: in questo modo la luce della luna illuminerà tutto il pavimento e i mostri non potranno arrivare. Rassicurato il piccolo ti chiede di raccontargli una storia. Ti siedi al bordo del suo letto ed inizi a raccontargli della quercia, di come si é presa cura di te e di tutti i bambini lì presenti, nel corso degli anni. Gli racconti di come ti abbia protetto dalla neve, di come abbia insegnato a Jane a cantare ospitando una famigliola di Ghiandaie e di come le sue radici abbiano fatto inciampare un ladro che voleva intrufolarsi di notte per rubare le donazioni.',
        'Tra un racconto e l\'altro tutti quanti i bambini cadono in un sonno profondo. Mentre rimbocchi le coperte al piccolo Tommy, mezzo addormentato ti domanda:',
        '«E se la Creatura Della Notte non l\'hai trovata pecché ora non c\'è, e tra qualche ora tonna qui?»',
        '«Ci sono io qui a proteggerti piccolo. La creatura della notte la sconfiggerò io!»',
        '«E se invece attacca te? Chi ti aiuta?»',
        'A questa domanda non sai propriamente come rispondere, ma fortunatamente il bambino si è già addormentato.',
        'La candela ormai è quasi al termine della sua vita, torni nel tuo letto e con mille e piú pensieri in testa, ti addormenti abbracciato all\'orsacchiotto.',
      ],
      choices: [{ text: 'Sogna', goto: 30 }],
    },

    18: {
      text: [
        "Porti il piccolo Tommy all'interno della struttura.",
        'Il piccolino corre a perdifiato nella stanza dei vasini. Dopo poco esce dal bagno con un sorrisone sul volto. Gli sorridi di ricambio e ricevi come premio un grande abbraccio.',
        '«Gacie Max».',
      ],
      effects: [{ stat: 'determinazione', delta: 2 }, { word: 'BAMBINO' }],
      choices: [
        { text: "Se hai la parola d'ordine ADULTO", goto: 35, if: { word: 'ADULTO' }, showLocked: true },
        { text: 'Sarai altrettanto bravo ad aiutare Penny?', goto: 39 },
      ],
    },

    19: {
      text: [
        'Realizzi che essendo fatto di peluche, la caduta non può ferirti! Prendi una rincorsa, chiudi gli occhi e salti!',
        'In un attimo, raggiungi sano e salvo il fondo del fosso.',
        "Dopo un salto del genere l'altezza non ti fa piú timore!",
      ],
      effects: [{ stat: 'determinazione', delta: 1 }],
      choices: [{ text: 'Esplora il tunnel', goto: 49 }],
    },

    20: {
      text: [
        'Ti volti verso il capanno e decidi di profittare della situazione per correre più velocemente che puoi!',
      ],
      choices: [
        {
          text: 'Se sei AGILE o se hai la parola Pallonetto oppure Aiuto',
          goto: 64,
          if: { any: [{ trait: 'agile' }, { word: ['PALLONETTO', 'AIUTO'] }] },
          showLocked: true,
        },
        { text: 'Altrimenti scappi al meglio delle tue capacità', goto: 13 },
      ],
    },

    21: {
      text: [
        '«...TRE!!!» Jacky si avvicina impettito ai due bambini che stanno tenendo in braccio il pupazzo del polipo. Afferra violentemente il gioco, e lo strappa via dalle mani dei bambini. Tutti i bambini del tavolo iniziano a piangere per la tensione e per lo spavento, ma Jacky li ignora ed a grandi passi si dirige rabbioso verso il tuo tavolo. Si siede su una sedia vuota, ed inizia accuratamente ad esaminare il polipo di pezza.',
        '«Se me lo hanno rovinato, rovino loro Max. Te lo giuro. Gli farò piú paura della Creatura della Notte. Li spaventerò cosí tanto che bagneranno i letti.»',
      ],
      choices: [
        { text: 'Preferisci finire il tuo pasto in silenzio', goto: 17 },
        { text: 'Se vuoi chiedere di piú sulla Creatura Della Notte', goto: 10 },
      ],
    },

    22: {
      text: [
        "«Un... due... treeeee STELLA!!» Gridi alle spalle dell'uomo, che fa un enorme balzo spaventato. «Signore, si é mosso! Significa che ha perso! Guardi Penny! Lei si che é brava! É la miglior statuina di tutto il cortile! Lei signore é eliminato. Deve andare da quella parte! Qui stiamo giocando!!!»",
        'Dopo che l\'uomo é stato allontanato Penny torna a respirare.',
        'La ragazzina ti confessa di avere il terrore di parlare con gli adulti. «Inoltre... vorrei diventare brava quanto te ad aiutare gli altri! Sei il nostro Eroe!»',
      ],
      effects: [{ stat: 'determinazione', delta: 1 }, { word: 'ADULTO' }],
      choices: [
        { text: "Se hai la parola d'ordine BAMBINO", goto: 35, if: { word: 'BAMBINO' }, showLocked: true },
        { text: 'Altrimenti corri da Tommy che saltella ancora più disperatamente', goto: 4 },
      ],
    },

    23: {
      text: [
        'Approfitti del fatto che a terra vicino a voi ci sia un piccolo specchio di vetro e ci lanci il tuo avversario contro, ma succede qualcosa di inaspettato. La creatura, invece di sbatterci contro, lo attraversa come se fosse acqua, sparendo senza lasciar traccia. Titubante ti avvicini alla superficie riflettente dello specchio ed il tuo piccolo cuoricino ha un sussulto. Sei tu la Creatura Della Notte! La tua pelliccia è nera, ed i tuoi occhietti bottone sono bianchi ed inespressivi.',
        "Sul tuo volto, un' orrida macchia rossa.",
      ],
      effects: [{ stat: 'determinazione', delta: -2 }],
      choices: [
        { text: 'Se sei ancora almeno 1 punto Determinazione prosegui', goto: 53, if: { stat: 'determinazione', gte: 1 }, showLocked: true },
      ],
    },

    24: {
      text: [
        'Colpisci con un calcio la mano-ombra, spingendola a qualche centimetro da te, fuori dalla luce del lampione.',
        'La mano-ombra a quanto pare sembra riprendersi dallo stordimento ed allunga le sue dita verso di te!',
        'La luce del lampione sembra rallentare il suo attacco!',
      ],
      choices: [{ text: 'Questa é la tua occasione per scappare!', goto: 20 }],
    },

    25: {
      text: [
        'Ti affianchi al cerchio di donne e saluti educatamente le signore, che inizialmente ricambiano educatamente il tuo saluto. Poi, ti guardano in faccia e come fanno spesso gli adulti, iniziano ad allontanarsi un poco da te, facendoti stare male. Perché gli adulti hanno quella reazione ogni volta che ti guardano in faccia? Approfitti del loro timore ed afferri la mano del piccolo Tommy.',
      ],
      choices: [
        { text: 'Lo porti ai piedi della quercia', goto: 4 },
        { text: "Lo porti all'interno", goto: 18 },
      ],
    },

    26: {
      text: [
        'Ti avvicini di soppiatto al cespuglio e con un movimento repentino discosti le foglie..',
      ],
      choices: [
        { text: 'Se hai Paura Degli Insetti prosegui subito al', goto: 38, if: { trait: 'insetti' }, showLocked: true },
        { text: 'Altrimenti continua a giocare', goto: 54, if: { not: { trait: 'insetti' } } },
      ],
    },

    27: {
      text: [
        'Afferri il tuo avversario per le spalle, impedendogli di muovere le sue braccia di pezza.',
        "La creatura inizia a dimenarsi emettendo un verso basso e straziante. Uno dei suoi tentacoli di oscurità però si sta allungando ed é pronto a colpirti!",
      ],
      choices: [
        { text: 'Se sei LEALE', goto: 53, if: { trait: 'leale' }, showLocked: true },
        { text: 'Se vuoi lanciare la creatura contro lo specchio', goto: 23 },
        { text: 'Se vuoi prima provare ad indebolirla con altri colpi', goto: 70 },
      ],
    },

    28: {
      text: [
        'Con uno dei tentacoli sposta una pesante scatola di legno, rivelando una scala che porta ad un tunnel sotterraneo.',
        '«Prego... se devi andare dalla Creatura.... da questa parte!» Titubante ti avvii verso la scala.',
        "Mentre scendi le scale, Ky-Jac il polipo di pezza fa scoccare uno dei suoi tentacoli, colpendo la tua coda pelosa. Dopo di ché, fa scivolare la pesante scatola di legno al suo posto, sbarrandoti l'entrata.",
      ],
      choices: [{ text: 'Esplora il Tunnel', goto: 49 }],
    },

    29: {
      text: [
        "Afferri per mano una bambina che passava di li per caso e ti avvicini con lei alle spalle dell'uomo. «Signore, questa bambina chiede di lei!» L'uomo si volta, dando tutta la sua attenzione alla bambina. Mentre tu, trascini via Penny, che, appena allontanata, torna a respirare.",
        "La ragazzina ti confessa di avere il terrore di parlare con gli adulti. «Però... vorrei venire adottata un giorno, proprio come tutti gli altri.» aggiunge, mentre osservate, con un poco di malinconia nel cuore, l'uomo e la bambina parlare giocosamente. Chissà quando succederà anche a voi di vivere una scena simile.",
      ],
      effects: [{ word: 'ADULTO' }],
      choices: [
        { text: "Se hai la parola d'ordine BAMBINO", goto: 35, if: { word: 'BAMBINO' }, showLocked: true },
        { text: 'Altrimenti corri da Tommy che saltella ancora più disperato', goto: 4 },
      ],
    },

    30: {
      text: [
        'Ti desti dal tuo profondo sonno e ti metti a sedere. Ti senti intorpidito, come se avessi le dita delle mani e dei piedi mezze addormentate. Dopo ben tre sbadigli uno dietro l\'altro, trovi le forze per aprire gli occhi. Quello che vedi attorno a te ti rende alquanto confuso: Sei seduto sull\'erba del giardino, ai piedi di un enorme e rigogliosa quercia. Tutto é buio, eccetto per la sottile striscia di prato illuminato dalla luce del lampione. Alzi le mani per sfregarti gli occhi, per cancellare questo strano sogno, ma nel farlo ti rendi conto di un fatto ancora piú assurdo! Le tue sono mani da orsetto di pezza! Anzi! Tu sei un orsetto di pezza!!',
        '«Non avere timore, Max.» una voce gentile e dolce ti echeggia nella testa. Ha un tono rassicurante, ma avverti un certo potere in essa.',
        "Cercando la fonte di quella voce, il tuo sguardo vaga e si posa sui cespugli, sulle finestre dell'orfanotrofio e sul capanno degli attrezzi ed infine guardi l'immensa quercia sopra di te. É circondata da un confortevole alone dorato.",
        '«Si Max. Sono qua. Sono al tuo fianco e sempre lo sarò. Ho ascoltato la preghiera silenziosa del tuo cuore e voglio darti una mano ad esaudirla, se me lo permetterai.»',
        'Incredulo rimani senza parole. Come fa sapere cosa desideri?',
        '«Il tuo animo vuole proteggere a tutti i costi i tuoi fratelli. Ma il tuo cuore cela anche un altro desiderio.»',
      ],
      choices: [
        { text: 'Se vuoi chiedere come sconfiggere la Creatura Della Notte', goto: 41 },
        { text: 'Se vuoi indagare sul desiderio del tuo cuore', goto: 51 },
      ],
    },

    31: {
      text: [
        'Un enorme polipo di Pezza con una cicatrice sulla guancia, sbuca fuori da una stretta fenditura, e si avvicina a te con passo ondeggiante. «E tu chi sei? Chi ti ha dato il permesso di entrare nel mio nascondiglio?! Trema di fronte a me! Sono Ky-Jac! Il terrore di tutti i piccoli pupazzi!!!»',
      ],
      choices: [
        { text: "Chiedi Scusa e chiedi dove è l'uscita", goto: 34 },
        { text: 'Provi a tenergli testa', goto: 68 },
        { text: 'Ti Presenti', goto: 42 },
      ],
    },

    32: {
      ending: { id: 'guerra', title: 'Il fronte', tone: 'amaro' },
      text: [
        "Ti svegli di colpo dall'incubo, in un lenzuolo bagnato di sudore. Sei nella tua camerata, circondato dai tuoi fratelli, le tue mani sono quelle di un normale ragazzo della tua etá. Ti alzi e vai a controllare il piccolo Tommy. Bagnato. Con pazienza lo svegli e gli cambi le coperte ed il pigiama...",
        'I giorni passano e diventano settimane e poi mesi.',
        'Nessun bambino parla piú Della Creatura Della Notte, e tu ben presto dimentichi il tuo strano ed assurdo incubo.',
        "Giorno dopo giorno, il tuo unico obbiettivo é provare ad occuparti dei tuoi fratelli. Ma credi di non essere mai abbastanza bravo. Una mattina di aprile giunge all'orfanotrofio una macchina nera senza tettuccio. Sopra di essa uomini vestiti tutti uguali: L'esercito! Parlano con La Infermiera e con Il Direttore. Dopo un paio di ore stai facendo le valigie. Tu e Jackie, in qualità di quindicenni, siete richiesti al fronte. I tuoi fratelli piangono per tutta la mattina, soprattutto il piccolo Tommy. Con parole dolci li conforti e gli dici addio.",
        'La macchina si allontana, verso la guerra, con te a bordo.',
        'Il tuo ultimo pensiero va ai tuoi fratelli. Hai sacrificato la possibilità di trovarti una famiglia tentando di darne una a loro. Ci sarai riuscito? Purtroppo questo non lo potrai mai sapere.',
      ],
    },

    33: {
      text: [
        "La sensazione di freddo emanata dall'oscurità quasi ti paralizza, ma riesci a tornare in te! Meglio non affrontare un ombra nel buio! Ti giri e corri nella direzione opposta!",
        'Arrivi, affannato, alla fine del tunnel e raggiungi una piccola porticina azzurra. Il mostro è quasi alle tue spalle. Con una spallata apri la porta e ti rendi conto di essere nella tua stanza! Ci sono i letti, le cassapanche ed anche i tuoi fratelli che dormono. Ti volti verso la porticina e vedi fuoriuscire da essa una tentacolare nebbia oscura. Appena varcata la soglia, la nebbia sembra compattarsi ed assume una forma fisica simile a quella di un oscuro ed enorme orsetto di peluche, ma con un enorme ed orribile macchia rossa ed irregolare sul viso. Oscuri tentacoli fuoriescono dalla sua schiena schioccando nell\'aria. La Creatura inizia a far vagare il suo vacuo sguardo nella stanza, soppesando quale bambino infastidire.',
      ],
      choices: [
        { text: 'Attiri la sua attenzione', goto: 63 },
        { text: 'Lo attacchi Corpo a Corpo', goto: 37 },
        { text: 'Lo attacchi sulla Distanza', goto: 58 },
      ],
    },

    34: {
      text: [
        'Dopo che hai elargito le tue scuse il Polipo di pezza si innalza sui suoi tentacoli in modo da apparire più alto di te.',
        '«Bene! Finalmente un pupazzo che conosce le buone maniere e non fugge come un infante. E ora... esci dalla mia tana.»',
        'Con uno dei tentacoli sposta una pesante scatola di legno, rivelando una scala che porta ad un tunnel sotterraneo.',
        '«Prego... da questa parte!» Ti indica Ky-Jac.',
        "Titubante ti avvii verso la scala. Mentre scendi le scale, Ky-Jac fa scoccare uno dei suoi tentacoli, colpendo la tua corta coda pelosa. Dopo di ché, fa scivolare la pesante scatola di legno al suo posto, sbarrandoti l'entrata.",
      ],
      effects: [{ stat: 'determinazione', delta: -1, if: { not: { trait: 'leale' } } }],
      choices: [{ text: 'Esplora il Tunnel', goto: 49 }],
    },

    35: {
      text: [
        'Dopo aver aiutato come potevi i tuoi fratelli decidi che é arrivato anche per te il momento di svagarti. Vai anche tu fino alla quercia, lontano dagli adulti, chiacchieri allegramente con gli altri bambini e ti chiedono se vuoi giocare con loro.',
      ],
      choices: [
        { text: 'Se preferisci guardare i tuoi fratelli giocare fino a sera', goto: 3 },
        { text: 'Se vuoi fare con loro dei giochi semplici', goto: 50 },
        {
          text: 'Se sei AGILE o FORTE e vuoi scegliere dei giochi impegnativi',
          goto: 44,
          if: { trait: ['agile', 'forte'] },
          showLocked: true,
        },
      ],
    },

    36: {
      text: [
        "Vicino ai tuoi piedini da orsetto, c'é una pietruzza dalla forma irregolare. La raccogli con l'intento di usarla come arma. La soppesi un paio di volte e la lanci contro il ragno. Centri l'aracnide proprio in mezzo ai suoi numerosi occhi! Il tuo avversario retrocede, rifugiandosi sulla sua ragnatela. Soddisfatto della vittoria, ti avii per la tua strada.",
        'Dopo qualche minuto di camminata, raggiungi una fossa a forma di quadrato scavata nel terreno! Deve essere il passaggio di cui parlava la quercia!!! La luce della luna penetra fino al fondo, rivelando una caduta di ben cinque o sei metri!',
      ],
      choices: [
        { text: 'Se Soffri di Vertigini prosegui subito al', goto: 66, if: { trait: 'vertigini' }, showLocked: true },
        { text: "Se vuoi buttarti nel fosso nonostante l'altezza ed il buio", goto: 19 },
        { text: 'Se preferisci tornare sui tuoi passi e passare dal capanno', goto: 48 },
      ],
    },

    ...nodiParte2,
  },
}
