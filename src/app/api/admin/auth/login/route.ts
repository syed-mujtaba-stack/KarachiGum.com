import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { validateAdminCredentials, generateAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth'
import { verifyAdminCredentialsInDb } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 })
    }

    const cleanEmail = email.toLowerCase().trim()
    let isValid = false
    let dbChecked = false

    // 1. First try verifying credentials in Neon DB if connected
    try {
      const dbAdmin = await verifyAdminCredentialsInDb(cleanEmail)
      if (dbAdmin) {
        dbChecked = true
        isValid = dbAdmin.password_hash === password
      }
    } catch (err) {
      console.warn("Neon DB auth check error:", err)
    }

    // 2. Fallback to env Admin credentials ONLY if no DB record exists for this admin
    if (!dbChecked) {
      isValid = validateAdminCredentials(cleanEmail, password)
    }

    if (!isValid) {
      return NextResponse.json({ error: "Invalid admin email or password." }, { status: 401 })
    }

    // Generate token and set HTTP-only cookie
    const token = generateAdminToken(cleanEmail)
    const cookieStore = await cookies()
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    })

    return NextResponse.json({ success: true, message: "Logged in successfully", email: cleanEmail })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Authentication failed" }, { status: 500 })
  }
}
