'use client'

import { supabase } from '@/lib/supabase/client'

export default function LogoutButton() {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <button
      onClick={handleLogout}
      className="border px-4 py-2 rounded text-white bg-red-400 border-red-500 hover:bg-red-300"
    >
      Logout
    </button>
  )
}