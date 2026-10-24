import { Suspense, lazy } from 'react'
import App from './App.tsx'
import { isNoirPath, loadNoir, usePath } from './router.ts'

/* FARQLY NOIR is downloaded only when someone opens /noir */
const NoirPage = lazy(loadNoir)

export default function Routes() {
  const path = usePath()

  if (isNoirPath(path)) {
    return (
      <Suspense fallback={<div className="route-fallback" />}>
        <NoirPage />
      </Suspense>
    )
  }
  return <App />
}
