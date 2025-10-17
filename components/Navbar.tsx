// components/Navbar.tsx
import Link from 'next/link'
import LogoutButton from './LogoutButton'
import { createClient } from '@/lib/supabase/server'
import { Bebas_Neue } from 'next/font/google'

const bebas = Bebas_Neue({
    weight: '400'
})

export default async function Navbar() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="flex justify-between items-center p-4 sm:pl-15 md:pl-25 lg:pl-35 shadow">
      <Link href="/" className="font-bold text-lg">Zen-sume</Link>
      <div className="flex gap-4">
        {user ? (
          <>
            <span className="text-gray-700">Hi, {user.email}</span>
            <LogoutButton />
          </>
        ) : (
          <Link
            href="/login"
            className={bebas.className + " border px-4 py-2 rounded text-white bg-green-500 border-green-600 hover:bg-green-400"}
          >
            Generate a resume
          </Link>
        )}
      </div>
    </nav>
  )
}