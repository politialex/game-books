import { useCallback, useEffect, useState } from 'react'
import { getBook } from './data/index.js'
import {
  caricaLibreria,
  salvaLibreria,
  statoLibro,
  salvaPartita,
  registraFinale,
  abbandonaPartita,
  caricaPreferenze,
  salvaPreferenze,
  applicaPreferenze,
} from './store/library.js'
import { startPlaythrough, choose, goBack, isEnding, serialize, deserialize, currentNode } from './engine/playthrough.js'
import { Library } from './screens/Library.jsx'
import { BookDetail } from './screens/BookDetail.jsx'
import { CharacterCreation } from './screens/CharacterCreation.jsx'
import { Reader } from './screens/Reader.jsx'
import { Ending } from './screens/Ending.jsx'
import { ReaderSettings } from './components/ReaderSettings.jsx'

/**
 * Navigazione a stato, senza router: il tasto "indietro" del browser non deve
 * annullare una scelta della storia. Tornare indietro nel racconto è
 * un'azione esplicita, dentro al lettore.
 */
export function App() {
  const [vista, setVista] = useState({ nome: 'libreria' })
  const [libreria, setLibreria] = useState(caricaLibreria)
  const [preferenze, setPreferenze] = useState(caricaPreferenze)
  const [impostazioniAperte, setImpostazioniAperte] = useState(false)
  const [run, setRun] = useState(null)
  const [bookId, setBookId] = useState(null)

  // Ogni cambio di schermata riparte dall'alto. Il lettore gestisce da sé
  // lo scorrimento tra un paragrafo e l'altro.
  useEffect(() => {
    if (vista.nome !== 'lettura' && vista.nome !== 'finale') {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [vista])

  useEffect(() => applicaPreferenze(preferenze), [preferenze])
  useEffect(() => salvaPreferenze(preferenze), [preferenze])
  useEffect(() => salvaLibreria(libreria), [libreria])

  // Il tema automatico segue il sistema anche se cambia a lettura aperta.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const aggiorna = () => applicaPreferenze(preferenze)
    mq.addEventListener('change', aggiorna)
    return () => mq.removeEventListener('change', aggiorna)
  }, [preferenze])

  const book = bookId ? getBook(bookId) : null

  /** Ogni transizione viene persistita subito: chiudere la scheda non perde nulla. */
  const persisti = useCallback((id, nuovoRun) => {
    setLibreria((lib) => salvaPartita(lib, id, serialize(nuovoRun)))
  }, [])

  const apriLibro = (id) => {
    setBookId(id)
    setVista({ nome: 'libro' })
  }

  const iniziaLettura = (id) => {
    setBookId(id)
    const libro = getBook(id)
    // Un libro senza scelte iniziali parte diretto.
    if ((libro.setup.traitGroups ?? []).length === 0) avvia(id, [])
    else setVista({ nome: 'creazione' })
  }

  const avvia = (id, traits) => {
    const nuovo = startPlaythrough(getBook(id), traits)
    setRun(nuovo)
    setBookId(id)
    persisti(id, nuovo)
    setVista({ nome: 'lettura' })
  }

  const riprendi = (id) => {
    const salvato = statoLibro(libreria, id).corrente
    if (!salvato) return
    setRun(deserialize(salvato))
    setBookId(id)
    setVista({ nome: 'lettura' })
  }

  const ricomincia = (id) => {
    setLibreria((lib) => abbandonaPartita(lib, id))
    iniziaLettura(id)
  }

  const scegli = (scelta) => {
    const nuovo = choose(book, run, scelta)
    setRun(nuovo)

    if (isEnding(book, nuovo)) {
      const finale = currentNode(book, nuovo).ending
      setLibreria((lib) => registraFinale(lib, bookId, finale.id))
      setVista({ nome: 'finale' })
    } else {
      persisti(bookId, nuovo)
    }
  }

  const indietro = () => {
    const nuovo = goBack(run)
    setRun(nuovo)
    persisti(bookId, nuovo)
  }

  const esci = () => setVista({ nome: 'libro' })

  const finaliTrovati = bookId ? statoLibro(libreria, bookId).finali : []

  return (
    <div className="app">
      <a className="skip-link" href="#contenuto">
        Vai al contenuto
      </a>

      {vista.nome === 'libreria' && (
        <Library
          libreria={libreria}
          onOpen={apriLibro}
          onSettings={() => setImpostazioniAperte(true)}
        />
      )}

      {vista.nome === 'libro' && (
        <BookDetail
          bookId={bookId}
          libreria={libreria}
          onBack={() => setVista({ nome: 'libreria' })}
          onStart={iniziaLettura}
          onResume={riprendi}
          onRestart={ricomincia}
        />
      )}

      {vista.nome === 'creazione' && (
        <CharacterCreation
          bookId={bookId}
          onBack={() => setVista({ nome: 'libro' })}
          onBegin={avvia}
        />
      )}

      {vista.nome === 'lettura' && run && (
        <Reader
          book={book}
          run={run}
          onChoose={scegli}
          onBack={indietro}
          onLeave={esci}
          onSettings={() => setImpostazioniAperte(true)}
        />
      )}

      {vista.nome === 'finale' && run && (
        <Ending
          book={book}
          run={run}
          trovati={finaliTrovati}
          onRetry={() => iniziaLettura(bookId)}
          onBookDetail={() => setVista({ nome: 'libro' })}
          onLibrary={() => setVista({ nome: 'libreria' })}
        />
      )}

      {impostazioniAperte && (
        <ReaderSettings
          preferenze={preferenze}
          onChange={setPreferenze}
          onClose={() => setImpostazioniAperte(false)}
        />
      )}
    </div>
  )
}
