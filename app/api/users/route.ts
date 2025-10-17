import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

export async function POST(req: Request) {
  const { userId, email } = await req.json()

  if (!userId || !email) {
    return NextResponse.json({ error: 'Missing userId or email' }, { status: 400 })
  }

  try {
    const user = await prisma.user.upsert({
      where: { userId },
      update: {},
      create: { userId, email },
    })
    return NextResponse.json(user)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 })
  }
}