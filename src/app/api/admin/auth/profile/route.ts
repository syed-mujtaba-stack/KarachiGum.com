import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import {
  verifyAdminToken,
  generateAdminToken,
  ADMIN_COOKIE_NAME,
  validateAdminCredentials,
  updateRuntimeAdminCredentials,
} from '@/lib/auth'
import {
  verifyAdminCredentialsInDb,
  updateAdminEmail,
  upsertAdmin,
} from '@/lib/db'

// GET — return current profile info
export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
    const session = verifyAdminToken(token)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ email: session.email, role: session.role })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to get profile' }, { status: 500 })
  }
}

// PUT — update email and/or password
export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
    const session = verifyAdminToken(token)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { currentPassword, newEmail, newPassword, confirmPassword } = body

    if (!currentPassword) {
      return NextResponse.json({ error: 'Current password is required to make changes.' }, { status: 400 })
    }

    // ── Verify current password ──────────────────────────────────────
    let isValid = false

    // 1. Check against Neon DB if connected
    try {
      const dbAdmin = await verifyAdminCredentialsInDb(session.email)
      if (dbAdmin) {
        isValid = dbAdmin.password_hash === currentPassword
      }
    } catch {
      // fallthrough
    }

    // 2. Fallback to runtime / env credentials
    if (!isValid) {
      isValid = validateAdminCredentials(session.email, currentPassword)
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 403 })
    }

    let currentEmail = session.email
    const changes: string[] = []

    // ── Update email ─────────────────────────────────────────────────
    if (newEmail && newEmail.trim() && newEmail.trim().toLowerCase() !== currentEmail.toLowerCase()) {
      const trimmedEmail = newEmail.trim().toLowerCase()
      await updateAdminEmail(currentEmail, trimmedEmail)
      currentEmail = trimmedEmail
      changes.push('email')
    }

    // ── Update password ──────────────────────────────────────────────
    const finalPassword = newPassword || currentPassword
    if (newPassword) {
      if (newPassword.length < 6) {
        return NextResponse.json({ error: 'New password must be at least 6 characters.' }, { status: 400 })
      }
      if (newPassword !== confirmPassword) {
        return NextResponse.json({ error: 'New passwords do not match.' }, { status: 400 })
      }
      changes.push('password')
    }

    if (changes.length === 0) {
      return NextResponse.json({ error: 'No changes provided.' }, { status: 400 })
    }

    // Always update runtime credentials & Neon DB so that credentials persist in all environments
    updateRuntimeAdminCredentials(currentEmail, finalPassword)
    await upsertAdmin(currentEmail, finalPassword)

    // Re-issue session cookie with (possibly updated) email
    const newToken = generateAdminToken(currentEmail)
    cookieStore.set(ADMIN_COOKIE_NAME, newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return NextResponse.json({
      success: true,
      message: `Successfully updated: ${changes.join(' and ')}.`,
      email: currentEmail,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Profile update failed.' }, { status: 500 })
  }
}
