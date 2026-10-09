/** "Il Sogno Profondo" — paragrafi 37-72. Vedi sogno-profondo.js. */

export const nodiParte2 = {
  37: {
    text: [
      'Corri contro il tuo nemico e provi a colpirlo con uno dei tuoi pugni di stoffa. La creatura però é già in posizione ed è pronta a colpire il tuo pugno con uno dei suoi.',
    ],
    choices: [
      {
        text: 'Se vuoi colpirlo e sei AGILE o hai la parola VANTAGGIO',
        goto: 11,
        if: { any: [{ trait: 'agile' }, { word: 'VANTAGGIO' }] },
        showLocked: true,
      },
      { text: 'Se sei FORTE ed invece preferisci afferrarlo', goto: 27, if: { trait: 'forte' }, showLocked: true },
      { text: 'Se vuoi provare invece a colpirlo con dei calci', goto: 70 },
    ],
  },

  38: {
    text: [
      'Le foglie rivelano uno spettacolo raccapricciante!',
      'Un enorme Ragno sulla sua tela ti appare a pochi centimetri da tuo naso! Immediatamente inizi ad urlare! Tra tutti gli insetti che potevano spuntar fuori da un cespuglio, proprio un ragno? Il piú brutto di tutti! Ti accorgi di essere seduto per terra solo quando i tuoi amici ti circondano.',
      'Hanno i volti preoccupati e ti stanno trascinando lontano dal cespuglio.',
    ],
    choices: [{ text: 'Riprenditi dallo spavento', goto: 40 }],
  },

  39: {
    text: [
      'Penny é immobile dinnanzi ad un uomo. Nonostante gli stia parlando, la ragazza non muove un muscolo ed a stento respira!',
    ],
    choices: [
      { text: 'Se vuoi fingere che stia giocando alla bella statuina', goto: 22 },
      { text: "Se vuoi distrarre l'uomo presentandogli un altro bambino", goto: 29 },
    ],
  },

  40: {
    text: [
      "Vi buttate sull'erba e respirate a pieni polmoni l'aria fresca della sera. Il lampione del cortile inizia a ronzare e dopo pochi attimi si accende proiettando la sua luce smorta sul cortile. La Infermiera suona il suo campanello e vi richiama a gran voce! É ora di rientrare!",
    ],
    choices: [{ text: 'Prosegui', goto: 3 }],
  },

  41: {
    text: [
      'Con rinnovata sicurezza in te stesso esclami a gran voce: «Come posso sconfiggere la Creatura che assale i miei fratelli!? Voglio proteggerli!» Nonostante tu sia un pupazzo di pezza, a quanto pare puoi parlare!',
      '«Oh Max... il tuo animo protettivo é tornato a quanto vedo. Troverai La Creatura nella sua tana, sottoterra. Per arrivarci hai a tua disposizione due strade. Puoi passare dal giardino, oppure puoi passare per il capanno degli attrezzi.»',
      'Guardi le due strade, entrambe ti sembrano lunghe e perigliose.',
      '«Max. Quando sarai difronte alla Creatura, ti servirà questa... ricordati di usarla! É parte di me.»',
      'Una ghianda cade dalle fronde della quercia, e atterra dolcemente vicino a te.',
      '«Ti auguro buona fortuna Max. Io sono con te.»',
    ],
    choices: [
      { text: 'Se vuoi andare nel cespuglio', goto: 57 },
      { text: 'Se vuoi andare nel capanno', goto: 48 },
    ],
  },

  42: {
    text: [
      '«Scusami se sono entrato nella tua tana Ky-Jac. Io mi chiamo Max, e sono stato incaricato dalla Quercia di sconfiggere la Creatura Della Notte, vero terrore di tutti i bambini»',
    ],
    choices: [
      {
        text: 'Se hai la parola POLIPO oppure se sei LEALE',
        goto: 61,
        if: { any: [{ word: 'POLIPO' }, { trait: 'leale' }] },
        showLocked: true,
      },
      { text: 'Altrimenti', goto: 28 },
    ],
  },

  43: {
    text: [
      'Ti fai coraggio e decidi di combattere questo nuovo nemico! Corri verso di lei pronto a sconfiggerla!',
    ],
    choices: [
      { text: 'Se sei Forte', goto: 60, if: { trait: 'forte' }, showLocked: true },
      { text: 'La colpisci al meglio delle tue possibilità', goto: 24 },
    ],
  },

  44: {
    text: [
      'Come primo gioco decidete di giocare ad Acchiapparella, e quando tocca a te scappare, tutti quanti ti rincorrono. Nessuno riesce a prenderti, ed in questo modo riesci a far divertire tutti.',
    ],
    effects: [{ stat: 'determinazione', delta: 1 }],
    choices: [{ text: 'Passa a giochi più semplici', goto: 50 }],
  },

  45: {
    ending: { id: 'circo', title: 'Il signor Circo', tone: 'agrodolce' },
    text: [
      "Un Pomeriggio, un elegante signore vestito con un appariscente abito rosso e una valigetta al suo fianco, si presenta alla porta dell'orfanotrofio. Parla con La Infermiera e con Il Direttore, che sembrano entrambi contrariati dalla sua presenza all'istituto, ma una volta aperta la valigetta, il Direttore cambia subito atteggiamento.",
      'Dopo un paio di ore stai facendo le valigie. Il signor Circo, stranamente, quando ti guarda in faccia non ha paura, Anzi! Ti Sorride. Ed ha addirittura pagato per portarti via con lui. I tuoi fratelli invece sono molto tristi di doverti salutare.',
      'Mentre la macchina del signor Circo si allontana sobbalzando con te a bordo, il tuo pensiero va proprio a loro, ti marcheranno, ma sai che se la caveranno. La quercia li proteggerà. E tu hai trovato una nuova e numerosa strana famiglia.',
    ],
  },

  46: {
    text: [
      "«Jakie non c'é bisogno di fare cosi. Il pupazzo é tuo ed é giusto che ora te lo restituiscano. Dai bambini... ci avete giocato fino ad adesso. Ora dovete restituirlo... da bravi...» Titubanti, i bambini porgono il pupazzo a Jackie che lo afferra bruscamente.",
      'Torni al tavolo, ed assieme a te viene anche Jacky.',
      '«Grazie per avermi aiutato faccia strana. Se non ci si aiuta tra di noi... Ti sono riconoscente. Che rabbia peró! Solo perché sono più piccoli devono avere tutto. I giochi migliori, il cibo migliore... i genitori...» Nel lamentarsi il ragazzo si tocca la brutta cicatrice sul suo volto.',
      'Poi, si riscuote ed inizia ad esaminare il pupazzo.',
      '«Se me lo hanno rovinato, rovino loro Max. Te lo giuro. Gli farò più paura della Creatura Della Notte. Li spaventerò così tanto che bagneranno i loro letti.»',
    ],
    effects: [{ word: 'POLIPO' }],
    choices: [
      { text: 'Preferisci finire il tuo pasto in silenzio', goto: 17 },
      { text: 'Se vuoi chiedere di piú sulla Creatura Della Notte', goto: 10 },
    ],
  },

  47: {
    text: [
      'Ti avvicini a Jacky ed appoggi una mano sulla sua spalla.',
      '«Jacky. Lascia quel polipo ai più piccoli per favore.»',
      'Il ragazzo ti rivolge uno sguardo infuriato:',
      '«Max... non metterti in mezzo. Il polipo é mio. Era nella culla con me quando sono arrivato e quindi mi appartiene. Tu hai il tuo orsacchiotto. Io ho il polpo. E loro me lo hanno rubato. Voglio solo ció che é mio.» Una bambina tremante esclama: «Ma noi ne abbiamo bisogno. Se no non possiamo dormire la notte!»',
      '«Dove ero rimasto?! Restituitemi il polipo! UNO.... DUE.....»',
    ],
    choices: [
      { text: 'Se dai ragione a Jacky', goto: 46 },
      { text: 'Se dai ragione ai bambini', goto: 7 },
      { text: 'Se preferisci che se la sbrighino da soli', goto: 21 },
    ],
  },

  48: {
    text: [
      'Ti incammini titubante verso il capanno.',
      'Guardandoti intorno, in effetti, questa strada si rivela molto esposta. La Creatura Della Notte potrebbe vederti arrivare!!!',
    ],
    choices: [
      { text: 'Se vuoi proseguire nascosto nelle ombre', goto: 62 },
      { text: 'Se vuoi passare sotto alla luce del lampione', goto: 69 },
    ],
  },

  49: {
    text: [
      'Ti osservi attorno, e scopri di essere in un lungo e stretto corridoio al buio. Le pareti in terra battuta sono coperte da radici e sassolini.',
      'Stai cercando di ambientarti, quando all\'improvviso senti provenire da dietro di te degli strani rumori. Sembrano dei cigolii... sembrano dei passi di un insetto gigante. Ossa che si spostano e toccano altre ossa. Una mandibola che scatta! Un gorgoglio di gola soffocato dal catarro. Quella Cosa... si sta avvicinando a te! Quella cosa... ti ha quasi raggiunto!',
    ],
    choices: [
      { text: 'Provi ad affrontarla', goto: 16 },
      { text: 'Scappi nella direzione opposta', goto: 33 },
    ],
  },

  50: {
    text: [
      'Come ultimo gioco del pomeriggio optate per il Nascondino. Ovviamente tocca a te contare.',
      '«Dieci. Nove. Otto. Otto... Otto! Tommy vai a nasconderti! Sette. Sei. Cinque-Quattro-Tre, due, UNO! Stò Arrivando!!!» Ti giri e ti guardi attorno: Un Ramo di uno dei cespugli sembra essersi mosso! Dall\' altro lato del giardino noti invece che il piccolo Tommy tenta di nascondersi, senza troppo successo, dietro ad un enorme copertone da trattore.',
    ],
    choices: [
      { text: 'Se vuoi andare da Tommy', goto: 6 },
      { text: 'Se vuoi controllare nel cespuglio', goto: 26 },
    ],
  },

  51: {
    text: [
      "Il desiderio che si cela nel tuo cuore? Quale mai potrebbe essere..? Da quando sei all'orfanotrofio, hai sempre voluto aiutare gli altri bambini a trovare una famiglia, perché nessuno voleva te a causa del tuo viso. Inizi dunque a tastare il tuo semplice volto di pezza con le “zampe” da orsetto.",
      "Un improvvisa idea ti coglie! Se sei diventato il tuo orsetto, vuol dire che sei diventato un forte guerriero proprio come lui! Il tuo orsetto ti ha sempre protetto e non ha mai avuto paura!",
    ],
    effects: [{ stat: 'determinazione', delta: 1 }],
    choices: [{ text: 'Con coraggio chiedi come sconfiggere la Creatura Della Notte', goto: 41 }],
  },

  52: {
    text: [
      'Ti posizioni tra la mano ed il lampione, in modo da proteggerla dalla luce con il tuo corpo.',
      "La mano, protetta dalla tua ombra, si ritrae lentamente nel buio della notte. Dopo qualche secondo, la vedi fare un gesto di ringraziamento e correre via. Ti dirigi all'interno del capanno e riesci ad entrarvi approfittando dello spazio tra due assi di legno. «Fortunatamente qui dentro, c'è la luce delle candele che può proteggermi!»",
    ],
    choices: [{ text: 'Un dubbio ti coglie... chi ha acceso le candele?', goto: 31 }],
  },

  53: {
    text: [
      'Capisci che i paurosi gemiti della creatura non sono altro che un pianto. I suoi occhi vacui, non sono altro che occhi colmi di tristezza. Un tentacolo di oscurità schiocca minaccioso per aria, ma incurante di tutto, decidi di tramutare la tua rabbia in qualcosa di diverso, allunghi le braccia ed abbracci la Creatura Della Notte, mentre il tentacolo arriva verso di te... ed il suo colpo si rivela un abbraccio. Tu e la creatura, come un unica entità, scoppiate a piangere.',
      "Tra un singhiozzo e l'altro riesci ad udire le sue parole:",
      '«PercHé dEvo AVerE qUesTo MaRcHio sUl VoLto! PeRcHé NesSunO Mi vUole???»',
    ],
    effects: [{ word: 'LACRIMA' }],
    choices: [
      {
        text: 'Se hai 2 o meno punti Determinazione: «Dobbiamo aiutare gli altri a trovare una famiglia.»',
        goto: 32,
        if: { stat: 'determinazione', lte: 2 },
      },
      {
        text: 'Se hai 3 o più punti Determinazione: «Anche noi ci meritiamo una famiglia!»',
        goto: 59,
        if: { stat: 'determinazione', gte: 3 },
      },
    ],
  },

  54: {
    text: [
      'Incurante di insetti, lucertole e spine, nel folto delle foglie si nascondono Penny e Pierre! Sembrano veramente scomodi in quella posizione, nonostante il loro sia un bel nascondiglio!',
    ],
    choices: [
      { text: 'Se vuoi dargli un vantaggio', goto: 12 },
      { text: 'Se vuoi prenderli subito', goto: 2 },
    ],
  },

  55: {
    text: [
      'Le gambe da orsetto ti tremano tanto da farti cadere a terra. Il ragno ti si avvicina pian piano con le sue lunghe zampe.',
      'Le sue zanne si aprono e si chiudono ritmicamente ma quando stanno per chiudersi attorno alla tua testa di pezza, ti riprendi dal torpore e corri ai piedi della quercia!',
      "Dopo esserti assicurato di essere al sicuro, ti incammini verso il capanno, chiedendoti se davvero potrai sconfiggere la Creatura Della Notte. «La quercia si é sbagliata. Non posso aiutare nessuno.»",
    ],
    effects: [{ stat: 'determinazione', delta: -2 }],
    choices: [{ text: 'Prosegui verso il capanno', goto: 48 }],
  },

  56: {
    text: [
      "Ti avvicini alla sofferente mano-ombra, con l'intento di aiutarla. La luce del lampione gli sta causando tanto dolore da impedirgli di muoversi correttamente.",
    ],
    choices: [
      { text: 'Se sei LEALE', goto: 52, if: { trait: 'leale' }, showLocked: true },
      {
        text: 'Altrimenti segna nelle note la parola AIUTO e prosegui',
        goto: 24,
        if: { not: { trait: 'leale' } },
        effects: [{ word: 'AIUTO' }],
      },
    ],
  },

  57: {
    text: [
      "Ti avvicini al cespuglio che, per la tua nuova altezza, é un enorme muro vegetale. Con il groppo in gola, ti inoltri nella selva formata dagli arbusti, guidato solo dalla luce piena che filtra tra le foglie. All'improvviso, un enorme ragno, grosso quanto te, appare da dietro un tronco.",
    ],
    choices: [
      { text: 'Se hai Paura degli Insetti prosegui subito al', goto: 55, if: { trait: 'insetti' }, showLocked: true },
      { text: 'Se Preferisci affrontare il Ragno colpendolo con una pietra!', goto: 36 },
      { text: 'Se Preferisci scappare dal Ragno', goto: 15 },
    ],
  },

  58: {
    text: [
      'Ti allontani dalla creatura quel tanto che basta da essere fuori dalla portata dei suoi tentacoli.',
      'Ma quando ti volti verso il tuo nemico, vedi suoi neri tentacoli avvolgere il letto del piccolo Tommy. Anche da quella distanza, puoi avvertire il bambino gemere e lamentarsi nel sonno.',
    ],
    effects: [{ stat: 'determinazione', delta: -1 }],
    choices: [
      { text: 'Se hai come parola FIONDA', goto: 65, if: { word: 'FIONDA' }, showLocked: true },
      { text: 'Altrimenti lancia la tua ghianda!', goto: 71 },
    ],
  },

  59: {
    text: [
      'Una dolce luce aurea inizia a nascere dal vostro cuore e cresce di intensità fino ad avvolgervi totalmente. Dal vostro petto inizia a fuoriuscire un fumo dorato che si intreccia nel cielo stellato della notte.',
      'Ti risvegli nel tuo letto. Il sole ti illumina dolcemente il viso come una carezza. Ti guardi attorno: sei nella tua camerata, circondato dai tuoi fratelli. Le tue mani sono quelle di un normale ragazzo della tua etá. Ti alzi dal letto e vai a controllare il piccolo Tommy. Asciutto! Questo significa che il Mostro della Notte é davvero stato sconfitto! Quel pomeriggio decidi di portare il piccolo Tommy sotto alla quercia. «Ti regalo il mio orsetto Tommy. Così, se mai sarò adottato, lui ti proteggerà. Tienilo sempre al tuo fianco.»',
    ],
    choices: [
      {
        text: 'Se hai la parola MANUBRIO oppure la parola LACRIMA',
        goto: 72,
        if: { word: ['MANUBRIO', 'LACRIMA'] },
      },
      {
        text: 'Altrimenti',
        goto: 45,
        if: { not: { word: ['MANUBRIO', 'LACRIMA'] } },
      },
    ],
  },

  60: {
    text: ['Colpisci con un calcio la mano-ombra, facendola finire qualche metro più in la!'],
    effects: [{ word: 'PALLONETTO' }],
    choices: [{ text: 'Prosegui', goto: 20 }],
  },

  61: {
    text: [
      "Il polipo di pezza inizia a squadrarti dall'alto in basso, come se cercasse di ricordare un sogno lontano ed ormai sfumato.",
      '«Sai cosa ti dico Orsacchiotto? Mi piaci! Ti indicherò l\'uscita e ti farò dono di questa: la mitica Fionda di legno di quercia! Così se fuori da qui incontrerai la Creatura Della Notte, potrai difenderti!» Poi con uno dei tentacoli sposta una pesante scatola di legno, rivelando una scala che porta ad un tunnel sotterraneo. «Prego... da questa parte!» Riconoscente ti avvii verso la scala, mentre Ky-Jac richiude l\'entrata con la scatola.',
    ],
    effects: [{ word: 'FIONDA' }],
    choices: [{ text: 'Esplora il Tunnel', goto: 49 }],
  },

  62: {
    text: [
      'Rimanendo nascosto tra le ombre, cerchi di raggiungere il capanno. Quando ormai sei a pochi passi dalla porta, qualcosa ti afferra il piede di stoffa! Non hai neanche il tempo di realizzare cosa sia, che ti tira via! Sbatti il soffice musetto contro il terreno e vieni trascinato, pancia a terra, lontano dal capanno. Improvvisamente, ti senti trascinare verso il basso, in una buca nel terreno. E quello che ti ha afferrato, lascia la presa. Ti rimetti in piedi, e noti che parte dell\'imbottitura di cui sei composto é andata perduta.',
    ],
    effects: [{ stat: 'determinazione', delta: -2 }],
    choices: [{ text: 'Esplora il Tunnel', goto: 49 }],
  },

  63: {
    text: [
      'Corri in direzione del tuo letto e ti ci arrampichi sopra, sfruttando il lenzuolo. Saltando su di esso, inizi a gridare verso la creatura: «Hey pappamolla! Non ho paura di te! La tua faccia sfigurata non mi fa paura!» L\'essere rivolge il suo sguardo, privo di emozioni, nella tua direzione. Dei tentacoli di oscurità lo sollevano dal suolo e come delle lunghe e molleggiate gambe, lo portano a gran velocità verso di te!',
    ],
    choices: [
      { text: 'Se hai come parola FIONDA', goto: 65, if: { word: 'FIONDA' }, showLocked: true },
      { text: 'Altrimenti lancia la tua Ghianda!', goto: 71 },
    ],
  },

  64: {
    text: [
      "Corri veloce come il vento verso la porta del capanno, senza mai voltarti. Non ne hai bisogno: la mano-ombra é sempre dietro te, la senti camminare con le sue dita sull'erba. Raggiungi la porta del capanno e ti intrufoli all'interno approfittando dello spazio tra due assi di legno. SBAM! La mano-ombra sbatte violentemente contro la porta.",
      "«Fortunatamente qui dentro al capanno, c'è la luce delle candele che può proteggermi!»",
    ],
    choices: [{ text: 'Un dubbio ti coglie... chi ha acceso le candele?', goto: 31 }],
  },

  65: {
    text: [
      'La ghianda, viene scagliata dalla tua fionda, ad una velocità incredibile! Colpisce la Creatura Della Notte in pieno petto, ed il suo corpo inizia a dissolversi in una nube di polvere dorata! Hai vinto! Hai sconfitto la Creatura Della Notte!!!',
      "Ora i bambini dell'orfanotrofio non dovranno piú avere paura!",
    ],
    choices: [{ text: 'Vittoria!', goto: 59 }],
  },

  66: {
    text: [
      "Un senso di vuoto ti inebria la mente, e le tue gambe diventano della stessa consistenza del burro fuso, cadi con il morbido sedere a terra. Il tuo terrore dell'altezza ti ha nuovamente sconfitto.",
      "Come quando a 5 anni, un uomo voleva adottarti nonostante il tuo viso da mostro, ma prima di firmare le carte ti ha preso in braccio e sollevato per aria! Doveva essere un gioco, ma fu una tortura. L'uomo, uno spazzacamino, si rifiutò di adottare un bambino che non poteva aiutarlo nel suo lavoro.",
    ],
    effects: [{ stat: 'determinazione', delta: -1 }],
    choices: [
      { text: 'Se vuoi provare a buttarti nel fosso nonostante la paura', goto: 19 },
      { text: 'Se preferisci cambiare strada e passare dal Capanno', goto: 48 },
    ],
  },

  67: {
    text: [
      "Il piccolo Tommy sembra imbarazzato e saltella frenetico da un piede all'altro, mentre è circondato da signore che lo ricoprono di complimenti e gli pizzicano le adorabili guancette. In effetti i bambini della sua etá sono molto ricercati.",
    ],
    choices: [
      { text: 'Se sei LEALE e vuoi capire cosa succede', goto: 14, if: { trait: 'leale' }, showLocked: true },
      { text: 'Se vuoi aiutarlo a trovare una Mamma', goto: 8 },
      { text: 'Se vuoi portare via il piccolo Tommy', goto: 25 },
    ],
  },

  68: {
    text: [
      "«Dovresti evitare di terrorizzare pupazzi più piccoli. Ci sono già altri esseri pericolosi a questo mondo. Almeno tra di noi dovremmo aiutarci a vicenda.» Gli rispondi per le rime.",
      '«Ma io spavento i piccoli pupazzi proprio per temprarli e per fargli vincere le proprie paure. Se non riescono ad avere la meglio su di me, il mondo, fuori da qui, li farà a pezzi.»',
    ],
    choices: [
      { text: 'Se hai la parola POLIPO', goto: 61, if: { word: 'POLIPO' }, showLocked: true },
      { text: 'Altrimenti Scusati', goto: 34 },
    ],
  },

  69: {
    text: [
      "Hai appena raggiunto la luce del lampione, quando dietro di te odi un lamento disumano. Ti volti e scopri che l'urlo proviene da una mano-ombra che ti stava seguendo, e che ora si contorce dolorante alla luce del lampione!",
    ],
    choices: [
      { text: 'Se vuoi lottare', goto: 43 },
      { text: 'Se vuoi scappare', goto: 20 },
      { text: 'Se vuoi aiutare la mano', goto: 56 },
    ],
  },

  70: {
    text: [
      "Provi a colpire con i tuoi piedi da orsetto il tuo nemico, ma i suoi tentacoli d'ombra parano ogni tuo colpo. Un tentacolo più grande e più veloce riesce a colpirti, facendoti finire a terra.",
    ],
    effects: [
      { stat: 'determinazione', delta: -2, overrides: [{ if: { trait: 'forte' }, delta: -1 }] },
    ],
    choices: [
      { text: 'Lo attacchi Corpo a Corpo', goto: 37 },
      { text: 'Lo attacchi sulla Distanza', goto: 58 },
    ],
  },

  71: {
    text: [
      'Afferri la Ghianda che la Quercia ti ha donato, e la lanci verso il tuo nemico, prendendolo in pieno petto!',
      "L'oscurità che lo circonda svanisce in un lampo dorato, facendolo cadere a terra. Approfittando della situazione, salti giù dal letto per provare ad attaccarlo mentre tenta di rialzarsi.",
    ],
    effects: [{ word: 'VANTAGGIO', once: true }],
    choices: [{ text: 'Raccogli la ghianda ed inizia un combattimento corpo a corpo', goto: 37 }],
  },

  72: {
    ending: { id: 'famiglia', title: 'Il Barone Holland', tone: 'luminoso' },
    text: [
      "Nel tardo pomeriggio, un signore vestito con un elegante cappotto nero entra nel giardino dell'orfanotrofio. L'uomo ha il viso pallido ed allungato, due baffi sottili arricciati sulle gote, e un cappello a cilindro di gran moda. Ti si avvicina in compagnia della Infermiera. «Ciao Max. Ti ricordi di me? Ci siamo incontrati ieri. So che ti prendi cura degli altri bambini qui nella struttura, ma se ti facesse piacere, vorrei prendermi cura io di te. Sembri un ragazzo in gamba e so che saresti un ottimo fratello maggiore per mia figlia Gwen.»",
      'Detto questo, spinge dolcemente in avanti una bambina.',
      "È minuta, ben vestita ed ha il viso parzialmente coperto da una chiama dorata che viene scostata via da una folata di vento improvvisa, rivelando così una brutta bruciatura estesa dal collo fino alla guancia sinistra. I vostri occhi si incrociarono per qualche istante e nacque subito un'intesa...",
      "La vita a casa del Barone Holland è tranquilla e serena. Tu e tua sorella Gwen siete molto affiatati e il segno sui vostri visi per voi inizia a perdere d' importanza e gli sguardi della gente a pesano meno. Finalmente sai cosa significa avere una Famiglia, ma il tuo pensiero va spesso ai tuoi Fratelli dell'orfanotrofio che nel corso del tempo trovarono tutti una nuova Famiglia.",
    ],
  },
}
