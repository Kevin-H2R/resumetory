'use client'

import { supabase } from '@/lib/supabase/client'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
    else setMessage('Logged in!')
    setLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage(error.message)
    else setMessage('Check your email to confirm your account!')
    setLoading(false)
  }

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      },
    })
    if (error) console.error('Google sign-in error:', error.message)
  }

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl font-bold mb-6">Login / Register</h1>
      <form className="flex flex-col gap-4 w-80">
        <input
          className="border p-2 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="bg-green-600 text-white py-2 rounded"
          onClick={handleLogin}
          disabled={loading}
        >
          Log In
        </button>
        <button
          className="border border-green-600 text-green-600 py-2 rounded"
          onClick={handleRegister}
          disabled={loading}
        >
          Register
        </button>
      </form>

      <button
        onClick={signInWithGoogle}
        className="flex items-center justify-center gap-2 border border-gray-300 rounded px-4 py-2 hover:bg-gray-50"
      >
        <img src="/google.svg" alt="Google logo" className="w-5 h-5" />
        Sign in with Google
      </button>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  )
}