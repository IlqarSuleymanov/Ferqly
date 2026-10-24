import { useState } from 'react'

/** Photo that never breaks the layout: if the file is missing it shows a
 *  quiet dark placeholder (or nothing at all when `quiet`). */
export function Photo({
  src, alt, label = 'Foto tezliklə', quiet = false, eager = false, className = '',
}: {
  src?: string; alt: string; label?: string; quiet?: boolean; eager?: boolean; className?: string
}) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
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
