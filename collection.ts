/* ═══════════════════════════════════════════════════════════
   FARQLY NOIR — the file you edit to change the content
   ───────────────────────────────────────────────────────────
   The collection menu has 3 sections:  Saatlar · Modellər · Dizaynlar
   Each section holds a list of items. Every item has:
        name   → the title shown under the photo
        image  → path of the photo (inside the  public  folder)

   ADD AN ITEM
     1. Put the photo in the matching folder, for example
          public/images/noir/saatlar/saat-05.jpg
          public/images/noir/modeller/model-05.jpg
          public/images/noir/dizaynlar/dizayn-05.jpg
     2. Add ONE line to that section below:
          { id: 'saat-05', name: 'Real ad', image: '/images/noir/saatlar/saat-05.jpg' },
        (the id must be unique; the name is what customers see)

   REMOVE / RENAME   → delete or edit the line.
   REORDER           → move the line up or down.
   No photo yet?     → a dark "Foto tezliklə" placeholder is shown.
   Any number of items works: the row scrolls sideways.
═══════════════════════════════════════════════════════════ */

export const WA_NUM  = '055 856 61 47'
export const IG_LINK = 'https://www.instagram.com/farqlynoir?srtk=aXQzeWJweHd6YzEw'
export const TT_LINK = 'https://www.tiktok.com/@farqlynoir'

export const waLink = (message: string) =>
  `https://wa.me/994558566147?text=${encodeURIComponent(message)}`

/* Big photos (optional). Put a file with exactly this name in public/images/noir/ */
export const IMAGES = {
  hero:   '/images/noir/hero.jpg',     // wide, cinematic, the watch as the hero
  detail: '/images/noir/detail.jpg',   // close-up: engraving / dial / bracelet
}

export interface Item {
  id: string
  name: string
  image: string
}

export interface Category {
  id: string
  title: string      // the word in the menu
  items: Item[]
}

export const CATEGORIES: Category[] = [
  {
    id: 'saatlar',
    title: 'Saatlar',
    items: [
      // Placeholder names — replace with the real ones
      { id: 'saat-01', name: 'Saat 01', image: '/images/noir/saatlar/saat-01.jpg' },
      { id: 'saat-02', name: 'Saat 02', image: '/images/noir/saatlar/saat-02.jpg' },
      { id: 'saat-03', name: 'Saat 03', image: '/images/noir/saatlar/saat-03.jpg' },
      { id: 'saat-04', name: 'Saat 04', image: '/images/noir/saatlar/saat-04.jpg' },
    ],
  },
  {
    id: 'modeller',
    title: 'Modellər',
    items: [
      { id: 'model-01', name: 'Model 01', image: '/images/noir/modeller/model-01.jpg' },
      { id: 'model-02', name: 'Model 02', image: '/images/noir/modeller/model-02.jpg' },
      { id: 'model-03', name: 'Model 03', image: '/images/noir/modeller/model-03.jpg' },
      { id: 'model-04', name: 'Model 04', image: '/images/noir/modeller/model-04.jpg' },
    ],
  },
  {
    id: 'dizaynlar',
    title: 'Dizaynlar',
    items: [
      { id: 'dizayn-01', name: 'Dizayn 01', image: '/images/noir/dizaynlar/dizayn-01.jpg' },
      { id: 'dizayn-02', name: 'Dizayn 02', image: '/images/noir/dizaynlar/dizayn-02.jpg' },
      { id: 'dizayn-03', name: 'Dizayn 03', image: '/images/noir/dizaynlar/dizayn-03.jpg' },
      { id: 'dizayn-04', name: 'Dizayn 04', image: '/images/noir/dizaynlar/dizayn-04.jpg' },
    ],
  },
]
