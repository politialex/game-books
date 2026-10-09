import { useEffect, useRef } from 'react'
import { IconClose } from './Icons.jsx'

/**
 * Foglio modale: pannello dal basso su telefono, finestra centrata da tablet.
 * Trattiene il fuoco, si chiude con Esc e con il tocco sullo sfondo.
 */
export function Sheet({ title, onClose, children }) {
  const panel = useRef(null)
  const restoreTo = useRef(null)

  useEffect(() => {
    restoreTo.current = document.activeElement
    panel.current?.querySelector('button, [href], input, select, textarea')?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const focusable = panel.current?.querySelectorAll(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      restoreTo.current?.focus?.()
    }
  }, [onClose])

  return (
    <div className="sheet-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label={title} ref={panel}>
        <div className="sheet__grab" />
        <div className="sheet__head">
          <h2 className="sheet__title">{title}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Chiudi">
            <IconClose />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
