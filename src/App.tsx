import { useState, useEffect, useRef } from 'react'
import './App.css'

const WA = 'https://wa.me/994558566147'

const WAIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)
const IGIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)
const TTIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.67a8.18 8.18 0 004.78 1.52V6.71a4.85 4.85 0 01-1.01-.02z"/>
  </svg>
)

/* ══════════════════════════════════════
   INTRO  — only logo (no brand text)
══════════════════════════════════════ */
function Intro({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="intro" onClick={onEnter}>
      <div className="intro-grid" aria-hidden="true">
        {[0,1,2,3,4,5].map(i => (
          <div className="intro-grid-line" key={i} style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
      </div>
      <div className="intro-rule-h top" aria-hidden="true" />
      <div className="intro-rule-h bottom" aria-hidden="true" />
      <div className="intro-orn tl"><span className="oh" /><span className="ov" /></div>
      <div className="intro-orn tr"><span className="oh" /><span className="ov" /></div>
      <div className="intro-orn bl"><span className="oh" /><span className="ov" /></div>
      <div className="intro-orn br"><span className="oh" /><span className="ov" /></div>

      <div className="intro-content">
        {/* ONLY logo — no text */}
        <div className="intro-logo-wrap">
          <img src="/images/logo.png" alt="FARQLY" className="intro-logo-img" />
        </div>
        <p className="intro-tagline">premium aksesuar</p>
        <button className="enter-btn" onClick={e => { e.stopPropagation(); onEnter() }}>
          Sayta keçid etmək üçün tıklayın
        </button>
      </div>

      <p className="intro-footer-note">2026 · Baku · Azerbaijan</p>
    </div>
  )
}

/* ══════════════════════════════════════
   NAVBAR  — no logo, no "Yalnız Bir Dəfə"
══════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* plain text brand — no logo image */}
      <button className="nav-brand" onClick={() => go('hero')}>FARQLY</button>

      <ul className={`nav-links ${open ? 'open' : ''}`}>
        <li><button onClick={() => go('kolleksiya')}>Kolleksiya</button></li>
        {/* "Yalnız Bir Dəfə" removed */}
        <li><button onClick={() => go('haqqimizda')}>Haqqımızda</button></li>
        <li><button onClick={() => go('elaqe')}>Əlaqə</button></li>
      </ul>

      <a href={WA} target="_blank" rel="noreferrer" className="nav-cta">
        <WAIcon /> Sifariş Et
      </a>
      <button className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen(v => !v)}>
        <span /><span /><span />
      </button>
    </nav>
  )
}

/* ══════════════════════════════════════
   HERO — logo only (no FARQLY text)
══════════════════════════════════════ */
function Hero() {
  const vRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const fn = () => {
      if (vRef.current && window.scrollY < window.innerHeight)
        vRef.current.style.transform = `translateY(${window.scrollY * 0.28}px)`
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <section id="hero" className="hero snap-section">
      <video ref={vRef} className="hero-video" autoPlay muted playsInline loop>
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero-veil" />

      <div className="hero-content animate-hero">
        {/* Big logo only — no text heading */}
        <div className="hero-logo-wrap">
          <img src="/images/logo.png" alt="FARQLY" className="hero-logo-img" />
        </div>
        <p className="hero-tagline">Adi olma, fərqli ol.</p>
        <div className="hero-btns">
          {/* ghost style — outline, not filled */}
          <button
            className="btn-ghost"
            onClick={() => document.getElementById('kolleksiya')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Kolleksiyaya bax
          </button>
          <a href={WA} target="_blank" rel="noreferrer" className="btn-ghost">
            <WAIcon /> Sifariş Et
          </a>
        </div>
      </div>

      <div className="scroll-hint">
        <span>Aşağı</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   YALNIZ BİR DƏFƏ — video TOP, texts BOTTOM
   3-column layout like screenshot
══════════════════════════════════════ */
function YalnizBirDefe() {
  const ref = useRef<HTMLElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVis(true)
    }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="yalniz-bir-defe" className="ring-section snap-section" ref={ref}>

      {/* ── TOP: full-width video ── */}
      <div className="ring-video-top">
        <video autoPlay muted playsInline loop className="ring-video">
          <source src="/videos/ring.mp4" type="video/mp4" />
        </video>
        <div className="ring-video-veil" />
        <div className="ring-subtitle-overlay">
          <p className={`ring-subtitle ${vis ? 'fade-up' : ''}`}>
            BU ÜZÜK ADİ AKSESUAR DEYİL.<br />
            O, BİR DƏFƏ ALINAN SEÇİM SİMVOLUDUR.
          </p>
        </div>
      </div>

      {/* ── BOTTOM: 3-column info ── */}
      <div className={`ring-info-bottom ${vis ? 'fade-up-delay' : ''}`}>

        {/* col 1 — rules */}
        <div className="ring-col rules-col">
          {[
            ['01', 'YALNIZ BİR DƏFƏ ƏLDƏ OLUNUR'],
            ['02', 'ALICINİN ŞƏXSİYYƏT VƏSİQƏSİ İLƏ ALINIR'],
            ['03', 'İKİNCİ DƏFƏ EYNİ ŞƏXSƏ SATILMIR'],
          ].map(([n, t]) => (
            <div className="ring-rule" key={n}>
              <span className="rr-num">{n}</span>
              <span className="rr-text">{t}</span>
            </div>
          ))}
          <p className="ring-note">
            Bu qayda üzüyün mənasını qorumaq üçündür — yəni bu, sadəcə
            hədiyyə yox, şüurlu bir seçimdir.
          </p>
        </div>

        {/* col 2 — includes */}
        <div className="ring-col includes-col">
          <h4 className="col-heading">Qiymətə daxildir</h4>
          <ul className="includes-list">
            <li>Tək seçim konseptli üzük</li>
            <li>Xüsusi müqavilə sənədi</li>
            <li>Premium qablaşdırma</li>
            <li>Çatdırılma</li>
          </ul>
        </div>

        {/* col 3 — contract + order */}
        <div className="ring-col order-col">
          <p className="contract-text">
            Müqavilə simvolik sənəddir. Bu, hüquqi yox, mənəvi
            dəyəri olan bir xatirədir.
          </p>
          <a href={WA} target="_blank" rel="noreferrer" className="btn-ghost btn-order">
            <WAIcon /> SİFARİŞ ET
          </a>
        </div>

      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   KOLLEKSİYA
══════════════════════════════════════ */
const PRODUCTS = [
  { badge: 'Eksklüziv', badgeClass: '',      name: 'Yalnız Bir Dəfə Alınan Üzük', sub: 'Tək seçim simvolu', delay: 0 },
  { badge: 'Populyar',  badgeClass: '',      name: 'Stress Üzükləri',              sub: 'Paslanmayan Metal', delay: 120 },
  { badge: 'Yeni',      badgeClass: 'white', name: 'Kəpənək Boyunbağı',            sub: 'Gümüş · Fosfor',   delay: 240 },
]

function ProductCard({ p }: { p: typeof PRODUCTS[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setVis(true), p.delay)
    }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [p.delay])

  return (
    <div className={`product-card ${vis ? 'visible' : ''}`} ref={ref}>
      <div className={`p-badge ${p.badgeClass}`}>{p.badge}</div>
      <div className="p-img-wrap">
        <div className="p-img-placeholder">
          <div className="p-ring-icon" />
          <span>— şəkil yüklənəcək —</span>
        </div>
      </div>
      <div className="p-info">
        <h3 className="p-name">{p.name}</h3>
        <p className="p-sub">{p.sub}</p>
        <a href={WA} target="_blank" rel="noreferrer" className="p-wa">WhatsApp ilə sifariş →</a>
      </div>
    </div>
  )
}

function Kolleksiya() {
  return (
    <section id="kolleksiya" className="kolleksiya-section snap-section">
      <div className="section-header">
        <span className="section-label">— Kolleksiya —</span>
        <h2>Məhsullarımız</h2>
        <div className="header-line" />
      </div>
      <div className="products-grid">
        {PRODUCTS.map(p => <ProductCard key={p.name} p={p} />)}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   HAQQIMIZDA
══════════════════════════════════════ */
function Haqqimizda() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.12 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="haqqimizda" className="about-section snap-section">
      <div className={`about-container ${vis ? 'visible' : ''}`} ref={ref}>
        <div className="about-text">
          <span className="section-label">— Haqqımızda —</span>
          <h2>Biz Kimik?</h2>
          <p>FARQLY — hər bir sifarişin arxasında bir hekayə olduğuna inanan premium aksesuar brendidir. Biz aksesuar satmırıq, <em>xatirə yaradırıq.</em></p>
          <p>Hər məhsul diqqətlə seçilir, premium keyfiyyətlə hazırlanır və yalnız onlayn çatdırılma ilə əldə edilir.</p>
          <div className="stats">
            {[['2+','İldir sizinlə'],['2500+','Müştəri'],['1×','Tək Seçim']].map(([n,l]) => (
              <div className="stat" key={l}>
                <span className="stat-num">{n}</span>
                <span className="stat-label">{l}</span>
              </div>
            ))}
          </div>
          <div className="social-links">
            <a href="https://www.instagram.com/farqlybrand/" target="_blank" rel="noreferrer" className="social-link">
              <IGIcon /> @farqlybrand
            </a>
            <a href="https://www.tiktok.com/@ferqly" target="_blank" rel="noreferrer" className="social-link">
              <TTIcon /> @ferqly
            </a>
          </div>
        </div>
        <div className="about-deco">
          <div className="deco-ring r1" />
          <div className="deco-ring r2" />
          <div className="deco-ring r3" />
          <img src="/images/logo.png" alt="" className="deco-logo" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   FOOTER
══════════════════════════════════════ */
function Footer() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <footer id="elaqe" className="snap-section">
      <div className="footer-cta">
        <p className="footer-cta-label">Sifariş vermək üçün</p>
        <h2>WhatsApp ilə əlaqə saxla</h2>
        <a href={WA} target="_blank" rel="noreferrer" className="btn-ghost btn-large">
          <WAIcon /> Sifariş Et — 055 856 61 47
        </a>
      </div>
      <div className="footer-bar">
        <div className="footer-brand">
          <img src="/images/logo.png" alt="FARQLY" className="footer-logo-img" />
          <span className="footer-logo-text">FARQLY</span>
          <p>Adi olma, fərqli ol.</p>
        </div>
        <nav className="footer-nav">
          <h4>NAVİQASİYA</h4>
          <button onClick={() => go('kolleksiya')}>Kolleksiya</button>
          <button onClick={() => go('yalniz-bir-defe')}>Yalnız Bir Dəfə Alınan Üzük</button>
          <button onClick={() => go('haqqimizda')}>Haqqımızda</button>
        </nav>
        <div className="footer-contact">
          <h4>ƏLAQƏ</h4>
          <p className="footer-phone">055 856 61 47</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/farqlybrand/" target="_blank" rel="noreferrer" className="social-link">
              <IGIcon /> Instagram
            </a>
            <a href="https://www.tiktok.com/@ferqly" target="_blank" rel="noreferrer" className="social-link">
              <TTIcon /> TikTok
            </a>
          </div>
        </div>
      </div>
      <div className="footer-copy">
        <p>© 2026 FARQLY. Bütün hüquqlar qorunur.</p>
        <p>Yalnız onlayn · Yalnız çatdırılma</p>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════
   APP ROOT
══════════════════════════════════════ */
export default function App() {
  const [entered, setEntered] = useState(false)
  const [exiting, setExiting] = useState(false)

  const handleEnter = () => {
    setExiting(true)
    setTimeout(() => setEntered(true), 780)
  }

  return (
    <>
      {!entered && (
        <div className={exiting ? 'intro-exit' : ''}>
          <Intro onEnter={handleEnter} />
        </div>
      )}
      {entered && (
        <div className="main-site site-enter">
          <Navbar />
          <div className="scroll-container">
            <Hero />
            <YalnizBirDefe />
            <Kolleksiya />
            <Haqqimizda />
            <Footer />
          </div>
        </div>
      )}
    </>
  )
}
