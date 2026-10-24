import { useCallback, useRef, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react'
import { TransitionCtx, isNoirPath, loadNoir, useGo, type GoFn } from './router'
import './curtain.css'

/* How long the black curtain takes to close / open (ms). Keep in sync with curtain.css */
const COVER_MS  = 650
const REVEAL_MS = 900

type Phase = 'idle' | 'cover' | 'reveal'

/* ══════════════════════════════════════════
   Wraps the whole app. Owns the black curtain
   that smoothly connects FARQLY ⇄ FARQLY NOIR.
══════════════════════════════════════════ */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [label, setLabel] = useState('')
  const busy = useRef(false)

  const go: GoFn = useCallback((to, text = '') => {
    if (busy.current || to === window.location.pathname) return

    const open = () => {
      window.history.pushState({}, '', to)
      window.dispatchEvent(new PopStateEvent('popstate'))
    }

    /* people who asked their device for less motion: switch instantly */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      open()
      return
    }

    busy.current = true
    setLabel(text)
    setPhase('cover')

    /* download the next page while the curtain is closing */
    const ready = isNoirPath(to) ? loadNoir().catch(() => {}) : Promise.resolve()
    const minWait = new Promise(r => setTimeout(r, COVER_MS))

    Promise.all([ready, minWait]).then(() => {
      open()
      setPhase('reveal')
      setTimeout(() => {
        setPhase('idle')
        busy.current = false
      }, REVEAL_MS)
    })
  }, [])

  return (
    <TransitionCtx.Provider value={go}>
      {children}
      <div className="curtain" data-phase={phase} aria-hidden="true">
        <span className="curtain-label">{label}</span>
      </div>
    </TransitionCtx.Provider>
  )
}

/* ══════════════════════════════════════════
   A normal link that plays the transition.
   (Ctrl/Cmd-click still opens a new tab.)
══════════════════════════════════════════ */
type TLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string
  label?: string
}

export function TLink({ to, label, onClick, onMouseEnter, onFocus, children, ...rest }: TLinkProps) {
  const go = useGo()

  const prefetch = () => { if (isNoirPath(to)) loadNoir().catch(() => {}) }

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    go(to, label)
  }

  return (
    <a
      {...rest}
      href={to}
      onClick={handleClick}
      onMouseEnter={e => { prefetch(); onMouseEnter?.(e) }}
      onFocus={e => { prefetch(); onFocus?.(e) }}
    >
      {children}
    </a>
  )
}
