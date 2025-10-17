import { prisma } from '@/lib/prisma'

export async function upsertUser(user: { userId: string; email: string }) {
  if (!user.email) return

  const existingUser = await prisma.user.findUnique({
    where: { userId: user.userId },
  })

  if (!existingUser) {
    await prisma.user.create({
      data: {
        userId: user.userId,
        email: user.email,
      },
    })
    console.log('✅ New user created:', user.email)
  } else {
    console.log('User already exists:', user.email)
  }
}