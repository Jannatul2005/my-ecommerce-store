// src/app/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/login') // or '/store' if using dummy auto-login
  }, [])

  return <div className="p-4">Redirecting...</div>
}
