/* ═══════════════════════════════════════════════════════════
   FARQLY NOIR — the file you edit to change the content
   ───────────────────────────────────────────────────────────
   The catalogue is a TREE.   Saatlar  →  Modellər  →  Dizaynlar
   Every line below is one "node". A node has:

       name        the title customers see                     (required)
       image       path of its photo, inside the  public  folder   (optional)
       note        one short line under the name                  (optional)
       bestSeller  true → also shown in "best sellers"         (optional)
       children    [ ...more nodes ]  → this node opens a deeper level

   A node WITHOUT children is a finished item: it gets the big
   photo page and the "Sifariş et" (WhatsApp) button.

   ADD A MODEL      → copy one model block, paste it under the others, rename.
   ADD A DESIGN     → add a line inside that model's  children: [ ... ]
   ADD A NEW WATCH TYPE (a whole new branch, e.g. another "Saatlar" group)
                    → add one more block at the top level, next to  Saatlar.
   REMOVE / RENAME / REORDER → delete, edit or move the line.
   Any depth, any number of items.

   PHOTOS: put them in  public/images/noir/...  and write the path.
   Tip — mirror the tree so you can always find them:
       public/images/noir/saatlar/model-01/dizayn-01.jpg
   No photo (yet)? Leave out the image line: a dark placeholder shows.
═══════════════════════════════════════════════════════════ */

export interface Node {
  name: string
  image?: string
  note?: string
  bestSeller?: boolean
  children?: Node[]
}

export const CATALOGUE: Node[] = [
  {
    name: 'Saatlar',
    children: [
      // ── Placeholder names: replace with the real ones ──────────────
      {
        name: 'Model 01',
        image: '/images/noir/saatlar/model-01/model-01.jpg',
        children: [
          { name: 'Dizayn 01', image: '/images/noir/saatlar/model-01/dizayn-01.jpg', bestSeller: true },
          { name: 'Dizayn 02', image: '/images/noir/saatlar/model-01/dizayn-02.jpg' },
          { name: 'Dizayn 03', image: '/images/noir/saatlar/model-01/dizayn-03.jpg' },
        ],
      },
      {
        name: 'Model 02',
        image: '/images/noir/saatlar/model-02/model-02.jpg',
        children: [
          { name: 'Dizayn 01', image: '/images/noir/saatlar/model-02/dizayn-01.jpg', bestSeller: true },
          { name: 'Dizayn 02', image: '/images/noir/saatlar/model-02/dizayn-02.jpg' },
        ],
      },
      {
        name: 'Model 03',
        image: '/images/noir/saatlar/model-03/model-03.jpg',
        children: [
          { name: 'Dizayn 01', image: '/images/noir/saatlar/model-03/dizayn-01.jpg' },
          { name: 'Dizayn 02', image: '/images/noir/saatlar/model-03/dizayn-02.jpg', bestSeller: true },
          { name: 'Dizayn 03', image: '/images/noir/saatlar/model-03/dizayn-03.jpg' },
        ],
      },
    ],
  },
]

/* ───────────── contact + links ───────────── */
export const WA_NUM  = '055 856 61 47'
export const IG_LINK = 'https://www.instagram.com/farqlynoir?srtk=aXQzeWJweHd6YzEw'
export const TT_LINK = 'https://www.tiktok.com/@farqlynoir'

export const waLink = (message: string) =>
  `https://wa.me/994558566147?text=${encodeURIComponent(message)}`

/* ───────────── big photos & logo (all optional) ─────────────
   Put a file with exactly this name in  public/images/noir/
   and it appears automatically. Until then the page stays clean. */
export const IMAGES = {
  hero:   '/images/noir/hero.jpg',      // wide, cinematic, the watch as the hero
  detail: '/images/noir/detail.jpg',    // the photo next to "lazer dizaynları"
}
export const LOGO    = '/images/noir/logo.png'      // FARQLY NOIR logo, PNG with transparent background
export const FAVICON = '/images/noir/favicon.png'   // small square icon for the browser tab (optional)
