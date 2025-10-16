// components/Navbar.tsx
import Link from 'next/link'
import LogoutButton from './LogoutButton'
import { createClient } from '@/lib/supabase/server'

export default async function Navbar() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow">
      <Link href="/" className="font-bold text-lg">MyApp</Link>

      <div className="flex gap-4">
        {user ? (
          <>
            <span className="text-gray-700">Hi, {user.email}</span>
            <LogoutButton />
          </>
        ) : (
          <Link
            href="/login"
            className="border px-4 py-2 rounded text-green-700 border-green-600 hover:bg-green-50"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}