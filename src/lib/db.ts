import { neon, neonConfig } from '@neondatabase/serverless'

// Disable WebSocket requirement for simple HTTP queries
neonConfig.fetchConnectionCache = true

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL
  if (!databaseUrl) {
    return null
  }
  try {
    return neon(databaseUrl)
  } catch (error) {
    console.warn("Neon DB connection initialization failed:", error)
    return null
  }
}

// Verify or query admin user in Neon DB
export async function verifyAdminCredentialsInDb(email: string): Promise<{ id: string; email: string; password_hash: string } | null> {
  const sql = getDb()
  if (!sql) {
    return null
  }

  const cleanEmail = email.toLowerCase().trim()

  try {
    // Ensure admins table exists
    await sql`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `

    // Query admin user
    const result = await sql`
      SELECT id, email, password_hash FROM admins WHERE LOWER(email) = ${cleanEmail} LIMIT 1;
    `

    if (result && result.length > 0) {
      const row = result[0] as any
      return {
        id: String(row.id),
        email: row.email,
        password_hash: row.password_hash
      }
    }
  } catch (error) {
    console.warn("Error querying Neon DB admins table:", error)
  }

  return null
}

// Get admin profile info (email, created_at)
export async function getAdminProfile(email: string): Promise<{ id: string; email: string; created_at: string } | null> {
  const sql = getDb()
  if (!sql) return null

  const cleanEmail = email.toLowerCase().trim()

  try {
    const result = await sql`
      SELECT id, email, created_at FROM admins WHERE LOWER(email) = ${cleanEmail} LIMIT 1;
    `
    if (result && result.length > 0) {
      const row = result[0] as any
      return { id: String(row.id), email: row.email, created_at: row.created_at }
    }
  } catch (error) {
    console.warn('Error fetching admin profile:', error)
  }
  return null
}

// Upsert admin (insert if not exists, update if exists)
export async function upsertAdmin(email: string, passwordHash: string): Promise<boolean> {
  const sql = getDb()
  if (!sql) return false

  const cleanEmail = email.toLowerCase().trim()

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `
    await sql`
      INSERT INTO admins (email, password_hash)
      VALUES (${cleanEmail}, ${passwordHash})
      ON CONFLICT (email) DO UPDATE SET password_hash = ${passwordHash};
    `
    return true
  } catch (error) {
    console.warn('Error upserting admin:', error)
    return false
  }
}

// Update admin email
export async function updateAdminEmail(currentEmail: string, newEmail: string): Promise<boolean> {
  const sql = getDb()
  if (!sql) return false

  const cleanCurrent = currentEmail.toLowerCase().trim()
  const cleanNew = newEmail.toLowerCase().trim()

  try {
    await sql`
      UPDATE admins SET email = ${cleanNew} WHERE LOWER(email) = ${cleanCurrent};
    `
    return true
  } catch (error) {
    console.warn('Error updating admin email:', error)
    return false
  }
}
