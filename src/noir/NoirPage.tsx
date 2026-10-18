import { useEffect, useRef, useState } from 'react'
import '@fontsource/archivo/600.css'
import '@fontsource/archivo/800.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import './noir.css'
import { TLink } from '../Transition'
import { COLLECTIONS, IG_LINK, IMAGES, TT_LINK, WA_NUM, waLink, type Watch } from './collection'

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
        <p className="noir-label noir-rise" style={{ animationDelay: '0.4s' }}>FARQLY NOIR · Saatlar</p>
        <h1 className="noir-h1 noir-rise" style={{ animationDelay: '0.55s' }}>
          Zaman heç kimi gözləmir.
        </h1>
        <p className="noir-lead noir-rise" style={{ animationDelay: '0.8s' }}>
          İntizam, səbr və fərdilik üzərində qurulmuş saat kolleksiyası.
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
        <h2 className="noir-h2" data-reveal>Səssiz çalış. Nəticələrin danışsın.</h2>
        <p className="noir-body" data-reveal>
          FARQLY NOIR vaxta hörmət edən, səs-küydən uzaq durub öz yolunu quran kişilər üçün yaranıb.
          Saat burada yalnız zamanı göstərmir — seçimi, duruşu və hədəfi tamamlayır.
        </p>
      </div>
    </section>
  )
}

/* ─── DETAIL (engraving) ─── */
function Detail() {
  return (
    <section className="noir-detail">
      <div className="noir-detail-img" data-reveal>
        <Photo src={IMAGES.detail} alt="Saatın qravürası — yaxın plan" label="Detal fotosu tezliklə" />
      </div>
      <div className="noir-detail-text">
        <p className="noir-label" data-reveal>Detal</p>
        <h2 className="noir-h2 noir-h2--sm" data-reveal>Fərdiliyin imzası.</h2>
        <p className="noir-body" data-reveal>
          Seçilmiş modellərdə lazer qravürası brendin imzasının bir hissəsidir:
          kiçik, dəqiq və yalnız diqqətlə baxanın görəcəyi detallar.
        </p>
      </div>
    </section>
  )
}

/* ─── COLLECTION ─── */
function Card({ w, index }: { w: Watch; index: number }) {
  const msg = `Salam! FARQLY NOIR — ${w.name} haqqında məlumat almaq istəyirəm.`
  return (
    <article className="noir-card" data-reveal>
      <div className="noir-card-img">
        <Photo src={w.image} alt={w.name} />
      </div>
      <div className="noir-card-meta">
        <span className="noir-card-no">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="noir-card-name">{w.name}</h3>
        <a className="noir-card-cta" href={waLink(msg)} target="_blank" rel="noreferrer">
          Sifariş et <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  )
}

function Kolleksiya({ rootRef }: { rootRef: React.RefObject<HTMLDivElement | null> }) {
  const [active, setActive] = useState(COLLECTIONS[0].id)
  const current = COLLECTIONS.find(c => c.id === active) ?? COLLECTIONS[0]

  /* cards that appear after switching collection also fade in */
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const els = root.querySelectorAll('.noir-grid [data-reveal]:not(.in)')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      })
    }, { threshold: 0.12 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [active, rootRef])

  return (
    <section id="noir-kolleksiya" className="noir-collection">
      <div className="noir-collection-head">
        <div>
          <p className="noir-label" data-reveal>Kolleksiya</p>
          <h2 className="noir-h2 noir-h2--sm" data-reveal>Hər model — ayrı bir duruş.</h2>
        </div>

        {COLLECTIONS.length > 1 && (
          <div className="noir-tabs" role="tablist">
            {COLLECTIONS.map(c => (
              <button
                key={c.id}
                role="tab"
                aria-selected={c.id === active}
                className={c.id === active ? 'on' : ''}
                onClick={() => setActive(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="noir-grid" key={current.id}>
        {current.watches.map((w, i) => <Card key={w.id} w={w} index={i} />)}
      </div>
    </section>
  )
}

/* ─── CLOSING + FOOTER ─── */
function Closing() {
  return (
    <section id="noir-sifaris" className="noir-closing">
      <h2 className="noir-h1 noir-h1--closing" data-reveal>Öz izini yarat.</h2>
      <p className="noir-body noir-body--center" data-reveal>
        Sifariş və suallar üçün bizimlə WhatsApp vasitəsilə əlaqə saxla.
      </p>
      <a
        className="noir-btn"
        data-reveal
        href={waLink('Salam! FARQLY NOIR saatları haqqında məlumat almaq istəyirəm.')}
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp ilə yaz
      </a>
    </section>
  )
}

function Footer() {
  return (
    <footer className="noir-footer">
      <div className="noir-footer-grid">
        <div>
          <p className="noir-footer-brand">FARQLY <span>NOIR</span></p>
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
        <Kolleksiya rootRef={rootRef} />
        <Closing />
      </main>
      <Footer />
    </div>
  )
}
