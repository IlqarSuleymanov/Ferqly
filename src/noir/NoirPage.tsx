import { useEffect, useRef, useState } from 'react'
import '@fontsource/archivo/600.css'
import '@fontsource/archivo/800.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import './noir.css'
import { TLink } from '../Transition'
import { NoirLogo } from './NoirLogo'
import { Photo } from './Photo'
import { Catalogue } from './Catalogue'
import { FAVICON, IG_LINK, IMAGES, TT_LINK, WA_NUM, waLink } from './collection'
import { bestSellers, chainOf, type Path } from './tree'

const scrollToId = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

/* ─── NAV ─── */
function Nav({ solid }: { solid: boolean }) {
  return (
    <header className={`noir-nav ${solid ? 'noir-nav--solid' : ''}`}>
      <button className="noir-brand" onClick={() => scrollToId('noir-top')} aria-label="FARQLY NOIR">
        FARQLY <span>NOIR</span>
      </button>

      <nav className="noir-links" aria-label="Naviqasiya">
        <button onClick={() => scrollToId('noir-kolleksiya')}>Kolleksiya</button>
        <button onClick={() => scrollToId('noir-haqqinda')}>Haqqında</button>
        <button onClick={() => scrollToId('noir-sifaris')}>Sifariş</button>
      </nav>

      <TLink to="/" label="FARQLY" className="noir-back">
        <span aria-hidden="true">←</span> FARQLY
      </TLink>
    </header>
  )
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section id="noir-top" className="noir-hero">
      <Photo src={IMAGES.hero} alt="FARQLY NOIR" quiet eager className="noir-hero-img" />
      <div className="noir-hero-light" />
      <div className="noir-grain" />

      <div className="noir-hero-inner">
        <div className="noir-rise" style={{ animationDelay: '0.4s' }}>
          <NoirLogo className="noir-lockup" />
        </div>
        <h1 className="noir-h1 noir-rise" style={{ animationDelay: '0.55s' }}>
          Zaman heç kimi gözləmir.
        </h1>
        <p className="noir-lead noir-rise" style={{ animationDelay: '0.8s' }}>
          Vaxtının fərqində olanlar üçün.
        </p>
        <button
          className="noir-btn noir-rise"
          style={{ animationDelay: '1s' }}
          onClick={() => scrollToId('noir-kolleksiya')}
        >
          Kolleksiyaya bax <span aria-hidden="true">↓</span>
        </button>
      </div>

      <p className="noir-hero-foot noir-rise" style={{ animationDelay: '1.2s' }}>2026 · Baku</p>
    </section>
  )
}

/* ─── STATEMENT ─── */
function Statement() {
  return (
    <section id="noir-haqqinda" className="noir-statement">
      <p className="noir-label" data-reveal>Haqqında</p>
      <div>
        <h2 className="noir-h2 noir-h2--case" data-reveal>
          Zaman gözləmir.<br />Sən də gözləmə.
        </h2>
        <p className="noir-body noir-body--lg" data-reveal>Hər saniyənin öz dəyəri var.</p>
      </div>
    </section>
  )
}

/* ─── DETAIL (laser designs + best sellers) ─── */
function Detail({ onOpen }: { onOpen: (p: Path) => void }) {
  const best = bestSellers().slice(0, 3)

  return (
    <section className="noir-detail">
      <div className="noir-detail-img" data-reveal>
        <Photo src={IMAGES.detail} alt="Lazer dizaynı — yaxın plan" label="Foto tezliklə" />
      </div>
      <div className="noir-detail-text">
        <h2 className="noir-h2 noir-h2--sm noir-h2--case" data-reveal>
          Saatlarımız xüsusi lazer dizaynları ilə fərqlənir.
        </h2>
        <p className="noir-body" data-reveal>Hər dizayn öz ideyasına əsaslanır.</p>
        <ul className="noir-points" data-reveal>
          <li>Daha premium və minimal.</li>
          <li>Daha təbii.</li>
          <li>Daha mənalı.</li>
        </ul>

        {best.length > 0 && (
          <div className="noir-best" role="group" aria-label="Ən çox satılan modellər" data-reveal>
            {best.map(({ node, path }) => {
              const names = chainOf(path).map(c => c.name)
              const parent = names.length > 1 ? names[names.length - 2] : ''
              return (
                <article key={path.join('.')} className="noir-best-card">
                  <button type="button" className="noir-best-open" onClick={() => onOpen(path)}>
                    <div className="noir-best-img"><Photo src={node.image} alt={node.name} label="Foto" /></div>
                    <span className="noir-best-name">{node.name}</span>
                    {parent && <span className="noir-best-sub">{parent}</span>}
                  </button>
                  <a
                    className="noir-card-cta"
                    href={waLink(`Salam! FARQLY NOIR — ${names.join(' / ')} haqqında məlumat almaq istəyirəm.`)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Sifariş et <span aria-hidden="true">→</span>
                  </a>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

/* ─── COLLECTION (the catalogue) ─── */
function Kolleksiya({ sel, setSel }: { sel: Path; setSel: (p: Path) => void }) {
  return (
    <section id="noir-kolleksiya" className="noir-collection">
      <div data-reveal>
        <Catalogue sel={sel} setSel={setSel} />
      </div>
    </section>
  )
}

/* ─── CLOSING + FOOTER ─── */
function Closing() {
  return (
    <section id="noir-sifaris" className="noir-closing">
      <h2 className="noir-h1 noir-h1--closing" data-reveal>Müştəriyə özəl sifarişlər.</h2>
      <p className="noir-body noir-body--center" data-reveal>
        Sifariş və suallar üçün bizimlə WhatsApp vasitəsilə əlaqə saxla.
      </p>
      <a
        className="noir-btn"
        data-reveal
        href={waLink('Salam! FARQLY NOIR üçün müştəriyə özəl sifariş vermək istəyirəm.')}
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp ilə sifariş
      </a>
    </section>
  )
}

function Footer() {
  return (
    <footer className="noir-footer">
      <div className="noir-footer-grid">
        <div>
          <NoirLogo className="noir-footer-lockup" />
          <p className="noir-footer-tag">Sənin zamanın xüsusidir.</p>
        </div>

        <nav className="noir-footer-col" aria-label="Keçidlər">
          <TLink to="/" label="FARQLY">← FARQLY ana səhifə</TLink>
          <a href={IG_LINK} target="_blank" rel="noreferrer">Instagram</a>
          <a href={TT_LINK} target="_blank" rel="noreferrer">TikTok</a>
        </nav>

        <div className="noir-footer-col">
          <span>Əlaqə</span>
          <a href={waLink('Salam!')} target="_blank" rel="noreferrer">{WA_NUM}</a>
        </div>
      </div>

      <p className="noir-copy">© 2026 FARQLY NOIR. Bütün hüquqlar qorunur.</p>
    </footer>
  )
}

/* ══════════════════════════════════════════
   PAGE  —  https://www.farqlybrand.com/noir
══════════════════════════════════════════ */
export default function NoirPage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [solid, setSolid] = useState(false)
  const [sel, setSel] = useState<Path>([0])      // what is open in the catalogue

  /* a best seller was clicked: open it in the catalogue and scroll there */
  const openInCatalogue = (p: Path) => {
    setSel(p)
    scrollToId('noir-kolleksiya')
  }

  /* NOIR tab icon (only if public/images/noir/favicon.png exists) */
  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (!link) return
    const prev = link.href
    const probe = new Image()
    let cancelled = false
    probe.onload = () => { if (!cancelled) link.href = FAVICON }
    probe.src = FAVICON
    return () => { cancelled = true; link.href = prev }
  }, [])

  /* tab title */
  useEffect(() => {
    const prev = document.title
    document.title = 'FARQLY NOIR — Saatlar'
    return () => { document.title = prev }
  }, [])

  /* gentle fade-in of blocks while scrolling */
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const els = root.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      })
    }, { threshold: 0.15 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="noir" ref={rootRef} onScroll={e => setSolid(e.currentTarget.scrollTop > 40)}>
      <Nav solid={solid} />
      <main>
        <Hero />
        <Statement />
        <Detail onOpen={openInCatalogue} />
        <Kolleksiya sel={sel} setSel={setSel} />
        <Closing />
      </main>
      <Footer />
    </div>
  )
}
