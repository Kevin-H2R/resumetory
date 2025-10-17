// hooks/useSupabaseUser.ts
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

export function useSupabaseUser() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getInitialUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getInitialUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return user
}