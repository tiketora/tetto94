import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

// Single shared pg Pool. If Better Auth or another auth provider is added
// later on this stack, it reuses this same pool — one connection, one
// source of truth, per the project's Neon setup convention.
export const pool = new Pool({ connectionString: process.env.DATABASE_URL })

export const db = drizzle(pool, { schema })
