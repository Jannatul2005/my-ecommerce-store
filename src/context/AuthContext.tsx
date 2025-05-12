'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

type AuthContextType = {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  const login = () => {
    setIsLoggedIn(true)
    router.push('/store')
  }

  const logout = () => {
    setIsLoggedIn(false)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)!
