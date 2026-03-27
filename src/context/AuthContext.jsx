import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const TEST_ACCOUNTS = [
  {
    email: 'manager@pfe.com',
    password: 'Manager123',
    role: 'manager',
    name: 'Chef de Projet',
  },
  {
    email: 'dev@pfe.com',
    password: 'Dev123',
    role: 'developer',
    name: 'Développeur',
  },
  {
    email: 'client@pfe.com',
    password: 'Client123',
    role: 'client',
    name: 'Client',
  },
]

const STORAGE_KEY = 'sma_auth_user'

function safeParse(json) {
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const saved = safeParse(localStorage.getItem(STORAGE_KEY))
    if (saved?.email && saved?.role) setUser(saved)
  }, [])

  const login = async ({ email, password }) => {
    await new Promise((r) => setTimeout(r, 700))

    const found = TEST_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === String(email).toLowerCase() && a.password === password,
    )

    if (!found) {
      const error = new Error('Email ou mot de passe incorrect.')
      error.code = 'INVALID_CREDENTIALS'
      throw error
    }

    const nextUser = {
      email: found.email,
      role: found.role,
      name: found.name,
      avatarSeed: found.email,
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
    return nextUser
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  const value = useMemo(() => ({ user, login, logout }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé à l’intérieur de AuthProvider')
  return ctx
}

export function roleHomePath(role) {
  if (role === 'manager') return '/dashboard'
  if (role === 'developer') return '/dev-dashboard'
  if (role === 'client') return '/client-dashboard'
  return '/login'
}
