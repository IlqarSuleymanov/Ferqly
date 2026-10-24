import { useState } from 'react'
import { Lockup } from '../Lockup'
import { LOGO } from './collection'

/** The FARQLY NOIR logo.
 *  If  public/images/noir/logo.png  exists it is used, otherwise the
 *  standard FARQLY logo + "NOIR" lettering is shown instead. */
export function NoirLogo({ className = '' }: { className?: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) return <Lockup className={`lockup--tight ${className}`} />
  return (
    <img
      src={LOGO}
      alt="FARQLY NOIR"
      className={`noir-logo-img ${className}`}
      onError={() => setFailed(true)}
    />
  )
}
