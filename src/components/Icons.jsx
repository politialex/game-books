/** Icone a tratto, 1.6px, coerenti tra loro. Sempre decorative: il nome accessibile sta sul controllo. */

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

export const IconBack = (p) => (
  <svg {...base} {...p}>
    <path d="M15 19l-7-7 7-7" />
  </svg>
)

export const IconArrow = (p) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const IconUndo = (p) => (
  <svg {...base} {...p}>
    <path d="M9 14L4 9l5-5" />
    <path d="M4 9h10a6 6 0 010 12h-3" />
  </svg>
)

export const IconPerson = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 20a7.5 7.5 0 0115 0" />
  </svg>
)

export const IconSettings = (p) => (
  <svg {...base} {...p}>
    <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
    <circle cx="16" cy="7" r="2" />
    <circle cx="10" cy="17" r="2" />
  </svg>
)

export const IconClose = (p) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export const IconLock = (p) => (
  <svg {...base} {...p}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
    <path d="M8.5 10.5V7.5a3.5 3.5 0 017 0v3" />
  </svg>
)

export const IconCheck = (p) => (
  <svg {...base} {...p}>
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
)

export const IconBook = (p) => (
  <svg {...base} {...p}>
    <path d="M4 5.5A2.5 2.5 0 016.5 3H19v15H6.5A2.5 2.5 0 004 20.5z" />
    <path d="M4 18.5V5.5" />
  </svg>
)

/* ---- Motivi di copertina: astratti, nessuna illustrazione finta ---- */

const motifBase = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

const motifs = {
  quercia: (
    <>
      <path d="M24 42V22" />
      <path d="M24 28l-7-6M24 25l7-6" />
      <path d="M14 20a6 6 0 01.6-11A8 8 0 0124 5a8 8 0 019.4 4 6 6 0 01.6 11z" />
    </>
  ),
  torre: (
    <>
      <path d="M15 42V11l9-5 9 5v31z" />
      <path d="M19 16h10M19 23h10M19 30h10" />
    </>
  ),
  onde: (
    <>
      <path d="M6 18c4.5-4 7.5-4 12 0s7.5 4 12 0 7.5-4 12 0" />
      <path d="M6 27c4.5-4 7.5-4 12 0s7.5 4 12 0 7.5-4 12 0" />
      <path d="M6 36c4.5-4 7.5-4 12 0s7.5 4 12 0 7.5-4 12 0" />
    </>
  ),
  timbro: (
    <>
      <circle cx="24" cy="20" r="11" />
      <path d="M18 20l4.5 4.5L31 16" />
      <path d="M9 38h30" />
    </>
  ),
  cometa: (
    <>
      <circle cx="31" cy="17" r="6" />
      <path d="M26 22L8 40M24 18L10 26M29 25L20 38" />
    </>
  ),
}

export function CoverMotif({ motif, className }) {
  return (
    <svg {...motifBase} className={className}>
      {motifs[motif] ?? motifs.quercia}
    </svg>
  )
}
