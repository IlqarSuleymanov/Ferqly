/* ═══════════════════════════════════════════════════════════
   FARQLY NOIR — content you will edit
   ───────────────────────────────────────────────────────────
   ADD A WATCH
     1. Put the photo in   public/images/noir/   (e.g. model-04.jpg)
     2. Add one line to the `watches` list below.

   ADD A NEW COLLECTION (later, when watches become different types)
     Add another { id, name, watches: [...] } block to COLLECTIONS.
     As soon as there are 2+ collections, a small menu appears
     above the grid automatically. Nothing else to change.

   No photo yet? The page shows a dark placeholder instead.
═══════════════════════════════════════════════════════════ */

export const WA_NUM  = '055 856 61 47'
export const IG_LINK = 'https://www.instagram.com/farqlybrand/'
export const TT_LINK = 'https://www.tiktok.com/@farqlybrand'

export const waLink = (message: string) =>
  `https://wa.me/994558566147?text=${encodeURIComponent(message)}`

/* Optional big photos. Drop a file with this exact name into public/images/noir/
   and it appears automatically. Until then the page stays dark and clean. */
export const IMAGES = {
  hero:   '/images/noir/hero.jpg',     // wide, cinematic, watch as the hero
  detail: '/images/noir/detail.jpg',   // macro: engraving / dial / bracelet
}

export interface Watch {
  id: string
  name: string
  image: string      // path under public/
}

export interface Collection {
  id: string
  name: string
  watches: Watch[]
}

export const COLLECTIONS: Collection[] = [
  {
    id: 'all',
    name: 'Bütün modellər',
    watches: [
      // Placeholder names — rename when the real models are ready.
      { id: 'model-01', name: 'Model 01', image: '/images/noir/model-01.jpg' },
      { id: 'model-02', name: 'Model 02', image: '/images/noir/model-02.jpg' },
      { id: 'model-03', name: 'Model 03', image: '/images/noir/model-03.jpg' },
    ],
  },
]
