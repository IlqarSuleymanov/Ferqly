import { Fragment } from 'react'
import { Photo } from './Photo'
import { CATALOGUE, waLink, type Node } from './collection'
import { chainOf, isPrefix, pad2, samePath, type Path } from './tree'

/* ══════════════════════════════════════════
   LEFT — the tree (opens level by level)
══════════════════════════════════════════ */
function Tree({
  nodes, base, sel, onPick, depth,
}: { nodes: Node[]; base: Path; sel: Path; onPick: (p: Path) => void; depth: number }) {
  return (
    <ul>
      {nodes.map((n, i) => {
        const path = [...base, i]
        const open = isPrefix(path, sel)
        const on = samePath(path, sel)
        const kids = n.children ?? []
        return (
          <li key={i} className={`noir-tree-item d${Math.min(depth, 2)} ${open ? 'open' : ''} ${on ? 'on' : ''}`}>
            <button
              type="button"
              className="noir-tree-btn"
              aria-current={on || undefined}
              aria-expanded={kids.length ? open : undefined}
              onClick={() => onPick(path)}
            >
              <span className="noir-tree-name">{n.name}</span>
              {kids.length > 0 && <span className="noir-tree-count">{pad2(kids.length)}</span>}
            </button>
            {kids.length > 0 && (
              <div className="noir-tree-sub" inert={!open}>
                <Tree nodes={kids} base={path} sel={sel} onPick={onPick} depth={depth + 1} />
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

/* ══════════════════════════════════════════
   RIGHT — where you are:  Saatlar / Model 01 / Dizayn 02
══════════════════════════════════════════ */
function Crumbs({ chain, cur, onPick }: { chain: Node[]; cur: Path; onPick: (p: Path) => void }) {
  return (
    <nav className="noir-crumbs" aria-label="Katalog yolu">
      {chain.map((n, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="noir-crumb-sep" aria-hidden="true">/</span>}
          {i < chain.length - 1
            ? <button type="button" onClick={() => onPick(cur.slice(0, i + 1))}>{n.name}</button>
            : <span aria-current="page">{n.name}</span>}
        </Fragment>
      ))}
    </nav>
  )
}

const orderMessage = (names: string[]) =>
  `Salam! FARQLY NOIR — ${names.join(' / ')} haqqında məlumat almaq istəyirəm.`

/* photos of everything inside the open node */
function Cards({ chain, nodes, base, onPick }: { chain: Node[]; nodes: Node[]; base: Path; onPick: (p: Path) => void }) {
  return (
    <div className="noir-cards">
      {nodes.map((n, i) => {
        const kids = n.children ?? []
        return (
          <article key={i} className="noir-card" style={{ ['--i' as string]: i }}>
            <button type="button" className="noir-card-open" onClick={() => onPick([...base, i])}>
              <div className="noir-card-img"><Photo src={n.image} alt={n.name} /></div>
              <div className="noir-card-meta">
                <span className="noir-card-no">{pad2(i + 1)}</span>
                <h3 className="noir-card-name">{n.name}</h3>
                {kids.length > 0 && <span className="noir-card-count">{pad2(kids.length)}</span>}
              </div>
              {n.note && <p className="noir-card-note">{n.note}</p>}
            </button>
            {kids.length === 0 && (
              <a
                className="noir-card-cta"
                href={waLink(orderMessage([...chain.map(c => c.name), n.name]))}
                target="_blank"
                rel="noreferrer"
              >
                Sifariş et <span aria-hidden="true">→</span>
              </a>
            )}
          </article>
        )
      })}
    </div>
  )
}

/* one finished item: big photo + order button */
function Product({ chain, cur, onPick }: { chain: Node[]; cur: Path; onPick: (p: Path) => void }) {
  const node = chain[chain.length - 1]
  const siblings = chain.length > 1 ? chain[chain.length - 2].children ?? [] : CATALOGUE
  const idx = cur[cur.length - 1]
  const go = (d: number) => onPick([...cur.slice(0, -1), idx + d])

  return (
    <div className="noir-product">
      <div className="noir-product-img"><Photo src={node.image} alt={node.name} /></div>
      <div className="noir-product-info">
        <span className="noir-card-no">{pad2(idx + 1)} / {pad2(siblings.length)}</span>
        <h3 className="noir-product-name">{node.name}</h3>
        {node.note && <p className="noir-body noir-product-note">{node.note}</p>}
        <a
          className="noir-btn"
          href={waLink(orderMessage(chain.map(c => c.name)))}
          target="_blank"
          rel="noreferrer"
        >
          Sifariş et <span aria-hidden="true">→</span>
        </a>
        {siblings.length > 1 && (
          <div className="noir-rail-ctrl">
            <button type="button" onClick={() => go(-1)} disabled={idx === 0} aria-label="Əvvəlki">←</button>
            <button type="button" onClick={() => go(1)} disabled={idx === siblings.length - 1} aria-label="Sonrakı">→</button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   THE CATALOGUE
══════════════════════════════════════════ */
export function Catalogue({ sel, setSel }: { sel: Path; setSel: (p: Path) => void }) {
  const chain = chainOf(sel)
  if (chain.length === 0) return <p className="noir-empty">Tezliklə əlavə olunacaq.</p>

  const cur = sel.slice(0, chain.length)
  const node = chain[chain.length - 1]
  const kids = node.children ?? []

  /* click a node: open it. Click the open one again: close it (go one level up). */
  const pick = (p: Path) => setSel(samePath(p, cur) && p.length > 1 ? p.slice(0, -1) : p)

  return (
    <div className="noir-catalogue">
      <aside className="noir-tree" aria-label="Katalog">
        <Tree nodes={CATALOGUE} base={[]} sel={cur} onPick={pick} depth={0} />
      </aside>

      <div className="noir-viewer" key={cur.join('.')}>
        <Crumbs chain={chain} cur={cur} onPick={setSel} />
        {kids.length > 0
          ? <Cards chain={chain} nodes={kids} base={cur} onPick={setSel} />
          : <Product chain={chain} cur={cur} onPick={setSel} />}
      </div>
    </div>
  )
}
