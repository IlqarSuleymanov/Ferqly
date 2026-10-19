import { useCallback, useEffect, useRef, useState } from 'react'
import '@fontsource/archivo/600.css'
import '@fontsource/archivo/800.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import './noir.css'
import { TLink } from '../Transition'
import { Lockup } from '../Lockup'
import { CATEGORIES, IG_LINK, IMAGES, TT_LINK, WA_NUM, waLink, type Item } from './collection'

/* ─── small helpers ─── */

/** Photo that never breaks the layout: if the file is missing it shows a
 *  quiet dark placeholder (or nothing at all when `quiet`). */
function Photo({
  src, alt, label = 'Foto tezliklə', quiet = false, eager = false, className = '',
}: {
  src: string; alt: string; label?: string; quiet?: boolean; eager?: boolean; className?: string
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    if (quiet) return null
    return (
      <div className={`noir-ph ${className}`} role="img" aria-label={alt}>
        <span className="noir-ph-ring" />
        <span className="noir-ph-label">{label}</span>
      </div>
    )
  }
  return (
    <img
      className={`noir-photo ${className}`}
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

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
          <Lockup className="lockup--tight noir-lockup" />
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

/* ─── DETAIL (laser designs) ─── */
function Detail() {
  return (
    <section className="noir-detail">
      <div className="noir-detail-img" data-reveal>
        <Photo src={IMAGES.detail} alt="Lazer dizaynı — yaxın plan" label="Detal fotosu tezliklə" />
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
      </div>
    </section>
  )
}

/* ─── COLLECTION MENU ─── */
function Card({ item, index }: { item: Item; index: number }) {
  const msg = `Salam! FARQLY NOIR — ${item.name} haqqında məlumat almaq istəyirəm.`
  return (
    <article className="noir-card" style={{ ['--i' as string]: index }}>
      <div className="noir-card-img">
        <Photo src={item.image} alt={item.name} />
      </div>
      <div className="noir-card-meta">
        <span className="noir-card-no">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="noir-card-name">{item.name}</h3>
        <a className="noir-card-cta" href={waLink(msg)} target="_blank" rel="noreferrer">
          Sifariş et <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  )
}

function Kolleksiya() {
  const [active, setActive] = useState(0)
  const [edge, setEdge] = useState({ start: true, end: false })
  const railRef = useRef<HTMLDivElement>(null)
  const cat = CATEGORIES[active]

  const update = useCallback(() => {
    const el = railRef.current
    if (!el) return
    setEdge({
      start: el.scrollLeft < 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    })
  }, [])

  /* every time another menu item is opened: back to the first photo */
  useEffect(() => {
    railRef.current?.scrollTo({ left: 0 })
    update()
  }, [active, update])

  useEffect(() => {
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  const slide = (dir: 1 | -1) => {
    const el = railRef.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: 'smooth' })
  }

  return (
    <section id="noir-kolleksiya" className="noir-collection">
      <div className="noir-collection-grid" data-reveal>
        <div className="noir-menu" role="tablist" aria-label="Kolleksiya">
          {CATEGORIES.map((c, i) => (
            <button
              key={c.id}
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={i === active}
              aria-controls="noir-panel"
              className={`noir-menu-btn ${i === active ? 'on' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="noir-menu-no">{String(i + 1).padStart(2, '0')}</span>
              <span className="noir-menu-title">{c.title}</span>
              <span className="noir-menu-count">{String(c.items.length).padStart(2, '0')}</span>
            </button>
          ))}
        </div>

        <div className="noir-panel" id="noir-panel" role="tabpanel" aria-labelledby={`tab-${cat.id}`}>
          <div className="noir-rail" ref={railRef} onScroll={update} key={cat.id}>
            {cat.items.length === 0 && <p className="noir-empty">Tezliklə əlavə olunacaq.</p>}
            {cat.items.map((it, i) => <Card key={it.id} item={it} index={i} />)}
          </div>

          <div className="noir-rail-ctrl">
            <button onClick={() => slide(-1)} disabled={edge.start} aria-label="Əvvəlki">←</button>
            <button onClick={() => slide(1)} disabled={edge.end} aria-label="Sonrakı">→</button>
          </div>
        </div>
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
          <Lockup className="lockup--tight noir-footer-lockup" />
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
        <Detail />
        <Kolleksiya />
        <Closing />
      </main>
      <Footer />
    </div>
  )
}
