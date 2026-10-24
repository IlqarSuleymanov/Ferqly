import { createContext, useContext, useSyncExternalStore } from 'react'

/* ──────────────────────────────────────────────────────────
   Tiny router (no extra dependency).
   The site has only a few pages, so we just watch the URL.
   To add a page later: add a path check below + a route in main.tsx.
────────────────────────────────────────────────────────── */

function subscribe(cb: () => void) {
  window.addEventListener('popstate', cb)
  return () => window.removeEventListener('popstate', cb)
}

export const usePath = () =>
  useSyncExternalStore(subscribe, () => window.location.pathname, () => '/')

export const isNoirPath = (p: string) => p === '/noir' || p.startsWith('/noir/')

/* The NOIR page is a separate chunk: it is downloaded only when someone
   visits /noir (or hovers the link to it), never with the main site. */
export const loadNoir = () => import('./noir/NoirPage')

/* ── transition context (provider lives in Transition.tsx) ── */
export type GoFn = (to: string, label?: string) => void
export const TransitionCtx = createContext<GoFn>(() => {})
export const useGo = () => useContext(TransitionCtx)
