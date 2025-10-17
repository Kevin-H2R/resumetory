'use client'
import { createContext, useContext } from 'react'
import { useSupabaseUser } from '@/hooks/useSupabaseUser'

const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useSupabaseUser()
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}