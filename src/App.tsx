import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ─── constants ─── */
const WA_LINK  = 'https://wa.me/994558566147'
const WA_NUM   = '055 856 61 47'
const IG_LINK  = 'https://www.instagram.com/farqlybrand/'
const TT_LINK  = 'https://www.tiktok.com/@farqlybrand'

/* ─── icons ─── */
const WAIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)
const IGIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)
const TTIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.67a8.18 8.18 0 004.78 1.52V6.71a4.85 4.85 0 01-1.01-.02z"/>
  </svg>
)

/* ══════════════════════════════════════════
   INTRO  — black screen, logo, click to enter
══════════════════════════════════════════ */
function Intro({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="intro" onClick={onEnter}>
      <div className="intro-logo-wrap">
        <img src="/images/main-logo.png" alt="FARQLY" className="intro-logo" />
      </div>

      <button
        className="intro-cta"
        onClick={e => { e.stopPropagation(); onEnter() }}
      >
        Sayta keçid etmək üçün tıklayın
      </button>

      <p className="intro-loc">2026 &nbsp;·&nbsp; Baku &nbsp;·&nbsp; Azerbaijan</p>
    </div>
  )
}

/* ══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
function Navbar({ activeSection }: { activeSection: number }) {
  const [solid, setSolid]   = useState(false)
  const [menuOpen, setMenu] = useState(false)

  useEffect(() => {
    setSolid(activeSection > 0)
  }, [activeSection])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenu(false)
  }

  return (
    <nav className={`navbar ${solid ? 'navbar--solid' : ''}`}>
      <button className="nav-brand" onClick={() => go('s1')}>FARQLY</button>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><button onClick={() => go('s3')}>Kolleksiya</button></li>
        <li><button onClick={() => go('s4')}>Haqqımızda</button></li>
        <li><button onClick={() => go('s5')}>Əlaqə</button></li>
      </ul>

      <a href={WA_LINK} target="_blank" rel="noreferrer" className="nav-order">
        <WAIcon /> Sifariş Et
      </a>

      <button
        className={`burger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenu(v => !v)}
        aria-label="Menyu"
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}

/* ══════════════════════════════════════════
   SECTION 1 — HERO  (video bg + logo)
══════════════════════════════════════════ */
function S1Hero() {
  return (
    <section id="s1" className="section s1">
      {/* background video */}
      <video className="s1-video" autoPlay muted playsInline loop>
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="s1-veil" />

      {/* centred content */}
      <div className="s1-content">
        <img src="/images/main-logo.png" alt="FARQLY" className="s1-logo" />
        <p className="s1-tagline">Adi olma, Fərqli ol!</p>
        <div className="s1-btns">
          <button
            className="btn-outline"
            onClick={() => document.getElementById('s3')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Kolleksiyaya bax
          </button>
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-outline">
            <WAIcon /> Sifariş Et
          </a>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   SECTION 2 — RING  (text left, video right)
══════════════════════════════════════════ */
function S2Ring() {
  const ref = useRef<HTMLElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVis(true)
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="s2" className="section s2" ref={ref}>

      {/* ── LEFT: text info ── */}
      <div className={`s2-info ${vis ? 'vis' : ''}`}>

        {/* subtitle moved here */}
        <p className={`s2-subtitle ${vis ? 'vis' : ''}`}>
          Bu üzük adi aksesuar deyil.<br />
          O, bir dəfə alınan seçim simvoludur.
        </p>

        {/* col 1 — rules */}
        <div className="s2-col">
          {[
            ['01', 'Yalnız bir dəfə əldə olunur'],
            ['02', 'Alıcının şəxsiyyət vəsiqəsi ilə alınır'],
            ['03', 'İkinci dəfə eyni şəxsə satılmır'],
          ].map(([n, t]) => (
            <div className="s2-rule" key={n}>
              <span className="s2-rnum">{n}</span>
              <span className="s2-rtxt">{t}</span>
            </div>
          ))}
          <p className="s2-note">
            Bu qayda üzüyün mənasını qorumaq üçündür — yəni bu, sadəcə hədiyyə yox, şüurlu bir seçimdir.
          </p>
        </div>

        {/* col 2 — includes */}
        <div className="s2-col">
          <h4 className="s2-col-h">Qiymətə daxildir</h4>
          <ul className="s2-list">
            <li>Tək seçim konseptli üzük</li>
            <li>Xüsusi müqavilə sənədi</li>
            <li>Premium qablaşdırma</li>
            <li>Çatdırılma</li>
          </ul>
        </div>

        {/* col 3 — contract + order */}
        <div className="s2-col">
          <p className="s2-contract">
            Müqavilə simvolik sənəddir. Bu, hüquqi yox, mənəvi dəyəri olan bir xatirədir.
          </p>
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-outline btn-outline--big">
            <WAIcon /> Sifariş Et
          </a>
        </div>

      </div>

      {/* ── RIGHT: video ── */}
      <div className="s2-video-area">
        <video className="s2-video" autoPlay muted playsInline loop>
          <source src="/videos/ring.mp4" type="video/mp4" />
        </video>
        <div className="s2-video-veil" />
      </div>

    </section>
  )
}

/* ══════════════════════════════════════════
   SECTION 3 — KOLLEKSIYA
══════════════════════════════════════════ */
const PRODUCTS = [
  { badge: 'Eksklüziv', name: 'Yalnız Bir Dəfə Alınan Üzük', sub: 'Tək seçim simvolu', delay: 0   },
  { badge: 'Populyar',  name: 'Stress Üzükləri',              sub: 'Paslanmayan Metal', delay: 120 },
  { badge: 'Yeni',      name: 'Kəpənək Boyunbağı',            sub: 'Gümüş · Fosfor',   delay: 240 },
]

function ProductCard({ p }: { p: typeof PRODUCTS[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setVis(true), p.delay)
    }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [p.delay])

  return (
    <div className={`prod-card ${vis ? 'vis' : ''}`} ref={ref}>
      <span className="prod-badge">{p.badge.toUpperCase()}</span>
      <div className="prod-img">
        {/* Replace with <img src="/images/product-X.jpg" alt={p.name} /> when ready */}
        <img
        src={`/images/product-${PRODUCTS.indexOf(p) + 1}.jpeg`}
        alt={p.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>
      </div>
      <div className="prod-body">
        <h3 className="prod-name">{p.name}</h3>
        <p className="prod-sub">{p.sub}</p>
        <a href={WA_LINK} target="_blank" rel="noreferrer" className="prod-wa">
          WhatsApp ilə sifariş →
        </a>
      </div>
    </div>
  )
}

function S3Kolleksiya() {
  return (
    <section id="s3" className="section s3">
      <div className="s3-inner">
        <div className="s-header">
          <span className="s-label">— Kolleksiya —</span>
          <h2 className="s-h2">Məhsullarımız</h2>
          <div className="s-line" />
        </div>
        <div className="prod-grid">
          {PRODUCTS.map(p => <ProductCard key={p.name} p={p} />)}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   SECTION 4 — HAQQIMIZDA
══════════════════════════════════════════ */
function S4Haqqimizda() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="s4" className="section s4">
      <div className={`s4-container ${vis ? 'vis' : ''}`} ref={ref}>

        {/* left text */}
        <div className="s4-text">
          <span className="s-label">— Haqqımızda —</span>
          <h2 className="s-h2">Biz Kimik?</h2>
          <p>
            FARQLY — hər bir sifarişin arxasında bir hekayə olduğuna inanan premium
            aksesuar brendidir. Biz aksesuar satmırıq,{' '}
            <em className="accent">xatirə yaradırıq.</em>
          </p>
          <p>
            Hər məhsul diqqətlə seçilir, premium keyfiyyətlə hazırlanır və yalnız
            onlayn çatdırılma ilə əldə edilir.
          </p>

          <div className="s4-stats">
            {[['2+','İldir sizinlə'],['2500+','Müştəri'],['1×','Tək Seçim']].map(([n,l]) => (
              <div className="s4-stat" key={l}>
                <span className="s4-stat-n">{n}</span>
                <span className="s4-stat-l">{l}</span>
              </div>
            ))}
          </div>

          <div className="s4-socials">
            <a href={IG_LINK} target="_blank" rel="noreferrer" className="btn-social">
              <IGIcon /> @farqlybrand
            </a>
            <a href={TT_LINK} target="_blank" rel="noreferrer" className="btn-social">
              <TTIcon /> @farqlybrand
            </a>
          </div>
        </div>

        {/* right deco */}
        <div className="s4-deco">
          <div className="deco-r r1" />
          <div className="deco-r r2" />
          <div className="deco-r r3" />
          <img src="/images/main-logo.png" alt="" className="deco-logo" aria-hidden />
        </div>

      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   SECTION 5 — FOOTER
══════════════════════════════════════════ */
function S5Footer() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="s5" className="section s5">

      {/* CTA block */}
      <div className="s5-cta">
        <span className="s-label">Sifariş vermək üçün</span>
        <h2 className="s5-cta-h">WhatsApp ilə əlaqə saxla</h2>
        <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-outline btn-outline--big">
          <WAIcon /> Sifariş Et — {WA_NUM}
        </a>
      </div>

      {/* footer bar */}
      <div className="s5-bar">
        <div className="s5-brand">
          <img src="/images/main-logo.png" alt="FARQLY" className="s5-logo-img" />
          <span className="s5-brand-name">FARQLY</span>
          <p className="s5-brand-tag">Adi olma, fərqli ol.</p>
        </div>

        <nav className="s5-nav">
          <h4>Naviqasiya</h4>
          <button onClick={() => go('s3')}>Kolleksiya</button>
          <button onClick={() => go('s2')}>Yalnız Bir Dəfə Alınan Üzük</button>
          <button onClick={() => go('s4')}>Haqqımızda</button>
        </nav>

        <div className="s5-contact">
          <h4>Əlaqə</h4>
          <p className="s5-phone">{WA_NUM}</p>
          <div className="s5-soc">
            <a href={IG_LINK} target="_blank" rel="noreferrer" className="btn-social">
              <IGIcon /> Instagram
            </a>
            <a href={TT_LINK} target="_blank" rel="noreferrer" className="btn-social">
              <TTIcon /> TikTok
            </a>
          </div>
        </div>
      </div>

      {/* copyright */}
      <div className="s5-copy">
        <p>© 2026 FARQLY. Bütün hüquqlar qorunur.</p>
        <p>Yalnız onlayn · Yalnız çatdırılma</p>
      </div>

    </section>
  )
}

/* ══════════════════════════════════════════
   APP ROOT
══════════════════════════════════════════ */
export default function App() {
  const [entered,  setEntered]  = useState(false)
  const [exiting,  setExiting]  = useState(false)
  const [activeS,  setActiveS]  = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  /* track active section for navbar */
  useEffect(() => {
    if (!entered) return
    const ids = ['s1','s2','s3','s4','s5']
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setActiveS(ids.indexOf(e.target.id))
        }
      })
    }, { threshold: 0.5 })

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [entered])

  const handleEnter = () => {
    setExiting(true)
    setTimeout(() => setEntered(true), 700)
  }

  return (
    <>
      {/* ── INTRO ── */}
      {!entered && (
        <div className={exiting ? 'intro-exit' : ''}>
          <Intro onEnter={handleEnter} />
        </div>
      )}

      {/* ── MAIN SITE ── */}
      {entered && (
        <div className="site">
          <Navbar activeSection={activeS} />
          <div className="snap-container" ref={containerRef}>
            <S1Hero />
            <S2Ring />
            <S3Kolleksiya />
            <S4Haqqimizda />
            <S5Footer />
          </div>
        </div>
      )}
    </>
  )
}
