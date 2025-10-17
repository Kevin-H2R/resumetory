'use client'

import Link from 'next/link'
import LogoutButton from './LogoutButton'
import { Bebas_Neue } from 'next/font/google'
import { useAuth } from '@/context/AuthContext'

const bebas = Bebas_Neue({
    weight: '400'
})

export default function Navbar() {
  const auth = useAuth()
  return (
    <nav className="flex justify-between items-center p-4 sm:pl-15 md:pl-25 lg:pl-35 shadow">
      <Link href="/" className="font-bold text-lg">Zen-sume</Link>
      <div className="flex gap-4 items-center">
        {auth.user ? (
          <>
            <Link href="/profile">Profile</Link>
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