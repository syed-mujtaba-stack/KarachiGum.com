import { cookies } from 'next/headers'

const ADMIN_COOKIE_NAME = 'kgi_admin_token'
const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@karachigum.com'
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export interface AdminSession {
  email: string
  authenticated: boolean
  role: 'admin'
}

// Global runtime store — in-memory only (works for Vercel serverless warm instances)
// Credentials are persisted to Neon DB (via upsertAdmin) which is the source of truth.
declare global {
  var __kgi_admin_creds: { email: string; password_hash: string } | undefined
}

// Helper to get persisted runtime credentials (in-memory warm cache)
function getRuntimeCredentials(): { email: string; password_hash: string } | null {
  if (globalThis.__kgi_admin_creds) {
    return globalThis.__kgi_admin_creds
  }
  return null
}

// Helper to update runtime credentials (in-memory cache only — DB is source of truth)
export function updateRuntimeAdminCredentials(email: string, password: string): void {
  const cleanEmail = email.toLowerCase().trim()
  globalThis.__kgi_admin_creds = { email: cleanEmail, password_hash: password }
}

// Generate simple secure session token
export function generateAdminToken(email: string): string {
  const secret = process.env.ADMIN_SECRET || 'kgi-secret-admin-key-2026'
  const payload = JSON.stringify({ email: email.toLowerCase().trim(), role: 'admin', timestamp: Date.now() })
  return Buffer.from(`${payload}::${secret}`).toString('base64')
}

// Verify session token
export function verifyAdminToken(token: string | undefined): AdminSession | null {
  if (!token) return null

  try {
    const secret = process.env.ADMIN_SECRET || 'kgi-secret-admin-key-2026'
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const [payloadStr, tokenSecret] = decoded.split('::')

    if (tokenSecret !== secret) return null

    const payload = JSON.parse(payloadStr)
    if (payload.role === 'admin' && payload.email) {
      return {
        email: payload.email,
        authenticated: true,
        role: 'admin'
      }
    }
  } catch {
    return null
  }

  return null
}

// Validate email and password — checks in-memory cache, then env defaults.
// Primary source of truth is Neon DB (checked in login route via verifyAdminCredentialsInDb).
export function validateAdminCredentials(emailInput: string, passwordInput: string): boolean {
  const cleanEmail = emailInput.toLowerCase().trim()
  
  // 1. Check in-memory warm cache (populated after a password change within same instance)
  const runtimeCreds = getRuntimeCredentials()
  if (runtimeCreds) {
    return cleanEmail === runtimeCreds.email.toLowerCase().trim() && passwordInput === runtimeCreds.password_hash
  }

  // 2. Fallback to env default credentials
  const validEmail = (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).toLowerCase().trim()
  const validPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD

  return cleanEmail === validEmail && passwordInput === validPassword
}

export { ADMIN_COOKIE_NAME, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD }
