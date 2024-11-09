import { drizzle } from 'drizzle-orm/neon-http'
import {neon } from '@neondatabase/serverless';


const sql = neon(process.env.NEXT_PUBLIC_DB_URL!)
export const db = drizzle(sql)
