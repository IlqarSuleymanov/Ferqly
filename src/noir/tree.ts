import { CATALOGUE, type Node } from './collection'

/* A position in the tree is a list of indexes, e.g. [0, 2, 1] =
   first top-level node → its 3rd child → that one's 2nd child. */
export type Path = number[]

/** The nodes from the top down to `path` (stops early if the data changed). */
export function chainOf(path: Path): Node[] {
  const out: Node[] = []
  let level: Node[] = CATALOGUE
  for (const i of path) {
    const n = level[i]
    if (!n) break
    out.push(n)
    level = n.children ?? []
  }
  return out
}

export const samePath = (a: Path, b: Path) => a.length === b.length && a.every((v, i) => v === b[i])
export const isPrefix  = (a: Path, b: Path) => a.length <= b.length && a.every((v, i) => v === b[i])

/** Every node marked  bestSeller: true,  with its position. */
export function bestSellers(): { node: Node; path: Path }[] {
  const out: { node: Node; path: Path }[] = []
  const walk = (nodes: Node[], base: Path) =>
    nodes.forEach((n, i) => {
      const path = [...base, i]
      if (n.bestSeller) out.push({ node: n, path })
      if (n.children) walk(n.children, path)
    })
  walk(CATALOGUE, [])
  return out
}

export const pad2 = (n: number) => String(n).padStart(2, '0')
