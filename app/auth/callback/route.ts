import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { upsertUser } from '@/lib/supabase/insertUser'

export async function GET(req: Request) {
  const requestUrl = new URL(req.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const result = await supabase.auth.exchangeCodeForSession(code)
    if (result.data.user && result.data.user.email) {
      console.log("WEPGIOJWEPGOIJWEGPIWEJ")
      await upsertUser({userId: result.data.user?.id, email: result.data.user?.email})
    }
  }

  const next = requestUrl.searchParams.get('next') || '/dashboard'
  return NextResponse.redirect(new URL(next, requestUrl.origin))
}