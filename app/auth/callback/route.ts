import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  // Optional: you could trigger user sync or just redirect
  console.log("WEOGIHWEGOIHWEGOIUWEHGIOWUH")
  const url = new URL(req.url)
  const next = url.searchParams.get('next') || '/dashboard'
  return NextResponse.redirect(new URL(next, req.url))
}