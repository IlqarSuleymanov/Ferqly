import '@fontsource/marcellus/400.css'
import './lockup.css'
import { TLink } from './Transition'

/* ═══════════════════════════════════════════
   FARQLY logo  +  NOIR, side by side.
   • on the main site "NOIR" is a link to /noir  (pass `to`)
   • on the NOIR page it is plain text
   Size is controlled from outside with --lw (logo width).
═══════════════════════════════════════════ */
export function Lockup({ to, className = '' }: { to?: string; className?: string }) {
  return (
    <div className={`lockup ${className}`}>
      <img src="/images/main-logo.png" alt="FARQLY" className="lockup-logo" />
      {to ? (
        <TLink to={to} label="FARQLY NOIR" className="lockup-noir" aria-label="FARQLY NOIR — saatlar">
          NOIR
        </TLink>
      ) : (
        <span className="lockup-noir" aria-label="NOIR">NOIR</span>
      )}
    </div>
  )
}
