import { useEffect, useRef, useState } from 'react'
import { currentStep, currentNode, visibleChoices } from '../engine/playthrough.js'
import { describe } from '../engine/conditions.js'
import { CharacterSheet } from '../components/CharacterSheet.jsx'
import { IconBack, IconPerson, IconSettings, IconUndo, IconArrow, IconLock } from '../components/Icons.jsx'

export function Reader({ book, run, onChoose, onBack, onLeave, onSettings }) {
  const [schedaAperta, setSchedaAperta] = useState(false)
  const step = currentStep(run)
  const node = currentNode(book, run)
  const scelte = visibleChoices(book, run)
  const unaSolaStrada = scelte.length === 1 && scelte[0].available
  const testa = useRef(null)
  const pageRef = useRef(null)
  const topbarRef = useRef(null)
  const readerBarRef = useRef(null)
  const scrollTimeoutRef = useRef(null)
  const readerBarTimeoutRef = useRef(null)
  const isMobileRef = useRef(false)

  // Wrapper con animazione pageOut prima di ogni cambio paragrafo
  const scegli = (scelta) => {
    const el = pageRef.current
    if (el && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.setAttribute('data-transitioning', 'out')
      setTimeout(() => {
        el.removeAttribute('data-transitioning')
        onChoose(scelta)
      }, 250)
    } else {
      onChoose(scelta)
    }
  }

  const tornaIndietro = () => {
    const el = pageRef.current
    if (el && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.setAttribute('data-transitioning', 'out')
      setTimeout(() => {
        el.removeAttribute('data-transitioning')
        onBack()
      }, 250)
    } else {
      onBack()
    }
  }

  // Scroll listener per topbar e reader-bar morph
  useEffect(() => {
    // Rileva mobile al mount
    isMobileRef.current = window.innerWidth <= 640

    const updateTopbar = () => {
      if (!topbarRef.current) return
      const isScrolling = window.scrollY > 0
      topbarRef.current.setAttribute('data-visible', isScrolling ? 'true' : 'false')

      // Debounce di 3s per topbar
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      if (isScrolling && !isMobileRef.current) {
        scrollTimeoutRef.current = setTimeout(() => {
          if (topbarRef.current && window.scrollY > 0) {
            topbarRef.current.setAttribute('data-visible', 'dim')
          }
        }, 3000)
      }
    }

    const updateReaderBar = () => {
      if (!readerBarRef.current) return
      // Reader bar visibile quando ci sono scelte o quando scrollato
      const hasChoices = scelte.length > 0
      readerBarRef.current.setAttribute('data-visible', hasChoices ? 'true' : 'false')

      // Debounce di 2s per reader-bar
      if (readerBarTimeoutRef.current) clearTimeout(readerBarTimeoutRef.current)
      if (hasChoices && !isMobileRef.current) {
        readerBarTimeoutRef.current = setTimeout(() => {
          if (readerBarRef.current) {
            readerBarRef.current.setAttribute('data-visible', 'false')
          }
        }, 2000)
      }
    }

    const handleScroll = () => {
      updateTopbar()
    }

    const handleMouseMove = () => {
      // Topbar visibile al mousemove (desktop only)
      if (!isMobileRef.current && topbarRef.current) {
        topbarRef.current.setAttribute('data-visible', 'true')
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
        scrollTimeoutRef.current = setTimeout(() => {
          if (topbarRef.current && window.scrollY > 0) {
            topbarRef.current.setAttribute('data-visible', 'dim')
          }
        }, 3000)
      }
    }

    const handleChoiceClick = () => {
      // Reader-bar sempre visibile quando si clicca una scelta
      if (readerBarRef.current) {
        readerBarRef.current.setAttribute('data-visible', 'true')
        if (readerBarTimeoutRef.current) clearTimeout(readerBarTimeoutRef.current)
        readerBarTimeoutRef.current = setTimeout(() => {
          if (readerBarRef.current && !isMobileRef.current) {
            readerBarRef.current.setAttribute('data-visible', 'false')
          }
        }, 4000)
      }
    }

    // Setup iniziale
    updateTopbar()
    updateReaderBar()

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('readerchoice', handleChoiceClick)

    // Resize listener per mobile detection
    const handleResize = () => {
      isMobileRef.current = window.innerWidth <= 640
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('readerchoice', handleChoiceClick)
      window.removeEventListener('resize', handleResize)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      if (readerBarTimeoutRef.current) clearTimeout(readerBarTimeoutRef.current)
    }
  }, [scelte.length])

  // A ogni paragrafo il fuoco torna in cima e il titolo della pagina cambia:
  // chi usa uno screen reader deve capire di essere altrove.
  useEffect(() => {
    document.title = `Paragrafo ${step.nodeId} — ${book.title}`
    testa.current?.focus()
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Riattiva pageIn rimuovendo e riapplicando l'animazione
    const el = pageRef.current
    if (el && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.animation = 'none'
      void el.offsetHeight
      el.style.animation = ''
    }

    // Reader-bar visibile al cambio di paragrafo
    if (readerBarRef.current) {
      readerBarRef.current.setAttribute('data-visible', 'true')
      if (readerBarTimeoutRef.current) clearTimeout(readerBarTimeoutRef.current)
    }

    // Progress bar
    const startNode = book.setup.startNode || 1
    const totalNodes = book.setup.totalNodes || 1
    const progressPercent = ((step.nodeId - startNode) / (totalNodes - startNode)) * 100
    document.documentElement.style.setProperty('--progress-percent', `${Math.max(0, Math.min(100, progressPercent))}%`)
  }, [step.nodeId, run.steps.length, book.title, book.setup])

  const puoTornare = run.steps.length > 1

  return (
    <>
      <header className="topbar topbar--reader" ref={topbarRef} data-visible="true">
        <div className="wrap topbar__inner">
          <button className="icon-btn" onClick={onLeave} aria-label="Esci dalla lettura e salva">
            <IconBack />
          </button>
          <span className="topbar__title">{book.title}</span>
          <button
            className="icon-btn"
            onClick={onSettings}
            aria-label="Impostazioni di lettura"
          >
            <IconSettings />
          </button>
        </div>
      </header>

      <div className="reader">
        <main className="reader__page" id="contenuto" ref={pageRef}>
          <h1
            className="reader__number"
            tabIndex={-1}
            ref={testa}
            aria-live="polite"
          >
            Paragrafo {step.nodeId}
          </h1>

          <div className={`prose${step.nodeId === book.setup.startNode ? ' prose--opening' : ''}`}>
            {node.text.map((paragrafo, i) => (
              <p key={i}>{paragrafo}</p>
            ))}
          </div>

          {step.log.length > 0 && (
            <div className="effects" role="status">
              {step.log.map((voce, i) => (
                <span
                  key={i}
                  className={`effect effect--${voce.kind}${voce.muted ? ' effect--muted' : ''}`}
                  title={voce.detail}
                >
                  {voce.text}
                </span>
              ))}
            </div>
          )}

          {/* La soglia si annuncia qui, dopo il testo e l'effetto che l'hanno
              causata: è il punto in cui il lettore capisce cosa è successo. */}
          {step.forced && (
            <p className="auto-jump" role="status">
              {step.forced.reason} Il racconto prende da solo un'altra strada.
            </p>
          )}

          {scelte.length > 0 && (
            <div className="choices">
              {/* Con una sola strada l'etichetta ripeterebbe il bottone. */}
              <p
                className={`choices__label${unaSolaStrada ? ' visually-hidden' : ''}`}
                id="etichetta-scelte"
              >
                {unaSolaStrada ? 'Prosegui' : 'Cosa fai?'}
              </p>
              <div role="group" aria-labelledby="etichetta-scelte" style={{ display: 'grid', gap: 'var(--s-3)' }}>
                {scelte.map((scelta, i) => (
                  <Choice key={i} scelta={scelta} indice={i} book={book} onChoose={scegli} />
                ))}
              </div>
            </div>
          )}
        </main>

        <div className="reader-bar" ref={readerBarRef} data-visible="true">
          <div className="reader-bar__inner">
            <button
              className="icon-btn"
              onClick={() => {
                tornaIndietro()
                window.dispatchEvent(new Event('readerchoice'))
              }}
              disabled={!puoTornare}
              aria-label="Torna alla scelta precedente"
            >
              <IconUndo />
            </button>

            {(book.setup.stats ?? []).map((stat) => {
              const valore = step.state.stats[stat.id] ?? 0
              const basso = stat.threshold !== undefined && valore <= stat.threshold + 1
              return (
                <span className={`stat-pill${basso ? ' stat-pill--low' : ''}`} key={stat.id}>
                  {stat.label} <strong>{valore}</strong>
                </span>
              )
            })}

            {step.state.words.length > 0 && (
              <button
                className="words-pill"
                onClick={() => setSchedaAperta(true)}
                aria-label={`${step.state.words.length} parole raccolte — apri la scheda`}
                title={step.state.words.join(', ')}
              >
                <span className="words-pill__dot" />
                {step.state.words.length}
              </button>
            )}

            <span className="spacer" />

            <button
              className="icon-btn"
              onClick={() => setSchedaAperta(true)}
              aria-label="Apri la scheda personaggio"
              aria-haspopup="dialog"
            >
              <IconPerson />
            </button>
          </div>
        </div>
      </div>

      {schedaAperta && (
        <CharacterSheet book={book} state={step.state} onClose={() => setSchedaAperta(false)} />
      )}
    </>
  )
}

/**
 * Una scelta non disponibile resta visibile con il motivo, perché il testo
 * originale la nomina esplicitamente ("se hai la parola FIONDA..."):
 * nasconderla renderebbe incomprensibile il paragrafo.
 */
function Choice({ scelta, indice, book, onChoose }) {
  const idMotivo = `motivo-${indice}`

  if (!scelta.available) {
    const requisiti = describe(scelta.if, book)
    return (
      <button className="choice choice--locked" disabled aria-describedby={idMotivo}>
        <IconLock width={16} height={16} style={{ flex: 'none' }} />
        <span>
          {scelta.text}
          <span className="choice__requirement" id={idMotivo}>
            {requisiti.length ? `Ti serve: ${requisiti.join(', ')}` : 'Non disponibile'}
          </span>
        </span>
      </button>
    )
  }

  return (
    <button className="choice" onClick={() => {
      onChoose(scelta)
      // Dispatch custom event per reader-bar
      window.dispatchEvent(new Event('readerchoice'))
    }}>
      <span>{scelta.text}</span>
      <IconArrow className="choice__arrow" width={18} height={18} />
    </button>
  )
}
