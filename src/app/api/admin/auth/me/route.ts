import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value

  const session = verifyAdminToken(token)

  if (session && session.authenticated) {
    return NextResponse.json({ authenticated: true, email: session.email })
  }

  return NextResponse.json({ authenticated: false }, { status: 401 })
}
